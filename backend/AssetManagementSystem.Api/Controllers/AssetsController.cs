using AssetManagementSystem.Api.Data;
using AssetManagementSystem.Api.Entities;
using AssetManagementSystem.Api.Models;
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

            bool isCategoryValid = Enum.GetValues<AssetCategory>().Any(category => category.ToDisplayString() == request.Category);

            bool isStatusValid = Enum.GetValues<AssetStatus>().Any(status => status.ToDisplayString() == request.Status);

            if (request.AssetName == "")
            {
                return BadRequest();
            }

            if (request.AssetName.Length > 50)
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
                AssetName = request.AssetName.Trim(),
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

    }
}
