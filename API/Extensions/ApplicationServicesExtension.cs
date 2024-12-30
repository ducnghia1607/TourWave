using System;
using System.Text.Json.Serialization;
using API.DataHelpers;
using API.Errors;
using AutoMapper;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServicesExtension
{
    public static IServiceCollection AddServices(this IServiceCollection services,IConfiguration config){
        // services.AddControllers();
            services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });
        services.AddDbContext<TourContext>(opt =>{
            opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        });
        //services.AddTransient<ITourRepository,TourRepository>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.AddAutoMapper(typeof(AutoMapperProfile));

        services.AddTransient(typeof(IGenericRepository<>),typeof(GenericRepository<>));
        services.AddScoped<ITokenService, TokenService>();
        services.Configure<ApiBehaviorOptions>(options => {
            options.InvalidModelStateResponseFactory = actionContext => {
            var errors = actionContext.ModelState
                .Where(e => e.Value.Errors.Count > 0)
                .SelectMany(x => x.Value.Errors)
                .Select(x => x.ErrorMessage).ToArray();

                var response = new ApiValidationErrorResponse
                {
                    Errors = errors
                };
                return new BadRequestObjectResult(response);
            };
        });
        // services.AddCors(opt => {
        //     opt.AddPolicy("CorsPolicy",policy => {
        //         policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200","http://localhost:4200");
        //     });
        // });
        return services;
    }
}
