using AssetManagementSystem.Api.Data;
using AssetManagementSystem.Api.Entities;
using AssetManagementSystem.Api.Migrations;
using AssetManagementSystem.Api.Models;
using Azure.Core;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssetManagementSystem.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetsController : ControllerBase
    {
        private readonly AppDbContext _assetContext;

        public AssetsController(AppDbContext appDbContext)
        {
            _assetContext = appDbContext;
        }



        private async Task<string> CreateAssetNumber()
        {
            // 1. シーケンスから次の番号を取得
            using var command = _assetContext.Database.GetDbConnection().CreateCommand();
            command.CommandText = "SELECT NEXT VALUE FOR dbo.Seq_AssetNo";

            await _assetContext.Database.OpenConnectionAsync();
            var nextVal = (long)await command.ExecuteScalarAsync();

            // 2. 26桁に揃える（PadLeft は「26桁に揃える」だけ）
            var numberPart = nextVal.ToString().PadLeft(26, '0');

            // 3. 管理番号を生成（合計30桁）
            var assetNo = $"AST-{numberPart}";

            return assetNo;

        }

        // GET /api/assets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetsResponse>>> GetAssetsAsync()
        {

            var assets = await _assetContext.Assets
                                            .AsNoTracking()
                                            .Select(a => new AssetsResponse
                                            {
                                                Id = a.Id,
                                                AssetName = a.AssetName,
                                                Category = a.Category,
                                                Status = a.Status,
                                                ManagementNumber = a.ManagementNumber,
                                                PurchaseDate = a.PurchaseDate,
                                                Remarks = a.Remarks,
                                            })
                                            .ToListAsync();

            return Ok(assets);
        }

        // POST /api/assets
        [HttpPost]
        public async Task<ActionResult<AssetsResponse>> CreateAsset([FromBody] AssetsRequest request)
        {
            var assetName = (request.AssetName ?? "").Trim();

            bool isCategoryValid = Enum.GetValues<AssetCategory>().Any(category => category.ToDisplayString() == request.Category);

            bool isStatusValid = Enum.GetValues<AssetStatus>().Any(status => status.ToDisplayString() == request.Status);


            if (string.IsNullOrWhiteSpace(assetName))
            {
                return BadRequest();
            }

            if (assetName.Length > 50)
            {
                return BadRequest();
            }

            if (!isCategoryValid)
            {
                return BadRequest();
            }

            if (!isStatusValid)
            {
                return BadRequest();
            }


            var managementNo = await CreateAssetNumber();

            var asset = new Asset
            {
                Id = Guid.NewGuid(),
                AssetName = assetName,
                Category = request.Category,
                Status = request.Status,
                ManagementNumber = managementNo,
                PurchaseDate = request.PurchaseDate,
                Remarks = request.Remarks
            };


            _assetContext.Assets.Add(asset);
            await _assetContext.SaveChangesAsync();

            var response = new AssetsResponse
            {
                Id = asset.Id,
                AssetName = asset.AssetName,
                Category = asset.Category,
                Status = asset.Status,
                ManagementNumber = asset.ManagementNumber,
                PurchaseDate = asset.PurchaseDate,
                Remarks = asset.Remarks
            };

            return Created("", response);
        }

        // Get api/asset/${id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AssetsResponse>> GetAssetByIdAsync(Guid Id)
        {
            var assets = await _assetContext.Assets.ToListAsync();

            var ManagementNo = await CreateAssetNumber();

            var asset = assets.FirstOrDefault(a => a.Id == Id);

            if (asset == null)
            {
                return NotFound(new { messaage = "備品がありません" });
            }

            return Ok(new AssetResponse
            {
                AssetName = asset.AssetName,
                Category = asset.Category,
                Status = asset.Status,
                ManagementNumber = ManagementNo,
                PurchaseDate = asset.PurchaseDate,
                Remarks = asset.Remarks
            });

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AssetsResponse>> UpdateAssetAsync(Guid id, [FromBody] AssetsRequest request)
        {
            var asset = await _assetContext.Assets.FirstOrDefaultAsync(a => a.Id == id);

            if (asset == null)
            {
                return NotFound(new { message = "備品がありません" });

            }

            var assetName = (request.AssetName ?? "").Trim();

            var remarks = request.Remarks ?? "";

            bool isCategoryValid = Enum.GetValues<AssetCategory>().Any(category => category.ToDisplayString() == request.Category);

            bool isStatusValid = Enum.GetValues<AssetStatus>().Any(status => status.ToDisplayString() == request.Status);

            if (string.IsNullOrWhiteSpace(assetName))
            {
                return BadRequest();
            }

            if (assetName.Length > 50)
            {
                return BadRequest();
            }

            if (!isCategoryValid)
            {
                return BadRequest();
            }

            if (!isStatusValid)
            {
                return BadRequest();
            }

            if (request.Remarks.Length > 200)
            {
                return BadRequest();
            }

            // 既存の asset を更新
            asset.AssetName = assetName;
            asset.Category = request.Category;
            asset.Status = request.Status;
            asset.PurchaseDate = request.PurchaseDate;
            asset.Remarks = request.Remarks ?? "";

            await _assetContext.SaveChangesAsync();

            var response = new AssetResponse
            {
                Id = asset.Id,
                AssetName = asset.AssetName,
                Category = asset.Category,
                Status = asset.Status,
                ManagementNumber = asset.ManagementNumber,
                PurchaseDate = asset.PurchaseDate,
                Remarks = asset.Remarks
            };

            return Ok(response);

        }
              
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAssetAsync(Guid id)
        {
            var asset = await _assetContext.Assets.FirstOrDefaultAsync(a => a.Id == id);

            if (asset == null)
            {
                return NotFound(new { message = "備品がありません" });
            }

            _assetContext.Assets.Remove(asset);

            await _assetContext.SaveChangesAsync();

            return NoContent();


        }


        [HttpDelete("bulk")]
        public async Task<ActionResult> DeleteAssetsAsync([FromBody] BulkDeleteRequest request)
        {
            if(request == null)
            {
                return BadRequest();
            };

            if(request.Ids.Length == 0)
            {
                return BadRequest();
            };

            var assets = await _assetContext.Assets
                .Where(a => request.Ids.Contains(a.Id))
                .ToListAsync();

            if (assets.Count != request.Ids.Length)
            {
                return NotFound(new { message = "備品がありません" });
            }

            _assetContext.Assets.RemoveRange(assets);

            await _assetContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("bulk")]
        public async Task<ActionResult> UpdateStatusAsync([FromBody] BulkUpdateStatusRequest request)
        {
            if (request == null || request.Ids == null || request.Ids.Length == 0)
            {
                return BadRequest();
            }

            bool isStatusValid = Enum.GetValues<AssetStatus>().Any(status => status.ToDisplayString() == request.Status);

            if (!isStatusValid)
            {
                return BadRequest();
            }

            var assets = await _assetContext.Assets
                .Where(a => request.Ids.Contains(a.Id))
                .ToListAsync();

            if (assets.Count != request.Ids.Length)
            {
                return NotFound(new { message = "備品がありません" });
            }

            foreach (var asset in assets)
            {
                asset.Status = request.Status;
            }

            await _assetContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
