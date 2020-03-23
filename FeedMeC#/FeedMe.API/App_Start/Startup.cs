using FeedMe.API.AuthenticationService;
using FeedMe.API.HttpServices;
using FeedMe.Repository.Dapper;
using FeedMe.Repository.Interfaces;
using FeedMe.Repository.PostgreSQL;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace FeedMe.API
{
    public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers();
			services.AddHttpClient();

			//packages
			services.AddSwaggerDocumentation();
			services.AddJwtAuthentication(Configuration);
			//interfaces and implementation
			ConfigureDependencyInjection(services);
		}
		private void ConfigureDependencyInjection(IServiceCollection services)
		{
			services.AddScoped<IDapperService, NpgSqlService>();
			services.AddScoped<IUserRepository, UserRepository>();
			services.AddScoped<IFavoriteRepository, FavoriteRepository>();

			services.AddHttpClient<IRecipeService, RecipeService>();
			services.AddScoped<IAuthenticateService, AuthenticateService>();

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if(env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();

			app.UseRouting();

			// global cors policy
			app.UseCors(x => x
				.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader());

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});

			app.UseSwaggerDocumentation();
		}
	}
}
