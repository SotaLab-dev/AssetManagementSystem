using AssetManagementSystem.Api.Data;
using AssetManagementSystem.Api.Models;
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
    }
}
