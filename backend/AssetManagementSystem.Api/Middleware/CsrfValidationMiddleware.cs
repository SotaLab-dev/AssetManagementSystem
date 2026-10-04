namespace AssetManagementSystem.Api.Middleware
{
    public class CsrfValidationMiddleware
    {
        private readonly RequestDelegate _next;

        public CsrfValidationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // CSRF対象のHTTPメソッド
            var csrfMethods = new[] { "POST", "PUT", "DELETE", "PATCH" };

            if (context.Request.Path.StartsWithSegments("/api/auth/login") ||
                context.Request.Path.StartsWithSegments("/api/auth/logout"))
            {
                await _next(context);
                return;
            }

            if (csrfMethods.Contains(context.Request.Method))
            {
                var csrfCookie = context.Request.Cookies["csrf_token"];
                var csrfHeader = context.Request.Headers["X-CSRF-Token"].FirstOrDefault();

                if (string.IsNullOrEmpty(csrfCookie) ||
                    string.IsNullOrEmpty(csrfHeader) ||
                    csrfCookie != csrfHeader)
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    await context.Response.WriteAsync("CSRF validation failed");
                    return;
                }
            }

            await _next(context);
        }
    }
}
