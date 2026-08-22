namespace AssetManagementSystem.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //// CORS 設定を追加
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowFrontend", policy =>
            //    {
            //        policy.WithOrigins("http://localhost:5173")
            //              .AllowAnyHeader()
            //              .AllowAnyMethod();
            //    });
            //});

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }



            //app.UseHttpsRedirection();

            app.UseRouting();

            //app.UseCors("AllowFrontend");
            
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
