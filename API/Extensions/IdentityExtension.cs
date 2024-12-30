using API.DataHelpers;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Extensions
{ 
    public static class IdentityExtension
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection service, IConfiguration config )
        {
            service.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequireDigit = false;
                opt.Password.RequiredUniqueChars = 0;
                opt.Password.RequiredLength = 6;
            })
            .AddRoles<AppRole>()
            .AddRoleManager<RoleManager<AppRole>>()
            .AddEntityFrameworkStores<TourContext>().AddErrorDescriber<CustomIdentityErrorDescriber>();

            service.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(option =>
            {
                // Gets or sets the parameters used to validate identity tokens.
                option.TokenValidationParameters = new TokenValidationParameters
                {
                    //Gets or sets a boolean to control if the issuer will be validated during token validation.
                    ValidateIssuer = false,
                    //Gets or sets a boolean to control if the lifetime will be validated during token validation.
                    ValidateLifetime = true,
                    // Validate signature
                    ValidateIssuerSigningKey = true,
                    // Gets or sets a boolean to control if the token replay will be validated during token validation.
                    ValidateTokenReplay = false,

                    ValidateAudience = false,
                    //We need to specify the secret key to be used for signature validation.
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"]))

                };
            });

            service.AddAuthorization(
                opt =>
                {
                    opt.AddPolicy("RequiredAdminRole", policy => policy.RequireRole("Admin"));
                    opt.AddPolicy("RequiredModeratorOrAdminRole", policy => policy.RequireRole("Admin", "Moderator"));
                }
            );
            return service;
        }
    }
}
