using Microsoft.AspNetCore.Mvc;
using AssetManagementSystem.Api.Models;

namespace AssetManagementSystem.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetsController : ControllerBase
    {
        // GET /api/assets
        [HttpGet]
        public ActionResult<IEnumerable<AssetsResponse>> Get()
        {
            var response = new List<AssetsResponse>
            {
                new AssetsResponse
                {
                  Id = Guid.NewGuid(),
                  AssetName = "ノートPC",
                  Category = "PC",
                  Status = "利用中",
                  ManagementNumber = "MAN001",
                  PurchaseDate = "2023-01-01",
                  Remarks = "備品登録用"
                }
            };

            return Ok(response);
        }
    }
}
