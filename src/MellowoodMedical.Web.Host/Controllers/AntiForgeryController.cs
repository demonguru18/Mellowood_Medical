using Microsoft.AspNetCore.Antiforgery;
using MellowoodMedical.Controllers;

namespace MellowoodMedical.Web.Host.Controllers
{
    public class AntiForgeryController : MellowoodMedicalControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
