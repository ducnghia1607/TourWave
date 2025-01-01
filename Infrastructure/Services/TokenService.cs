using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<AppUser> _userManager;

        public TokenService(IConfiguration config, UserManager<AppUser> userManager)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));
            _userManager = userManager;

        }

        public async Task<string> CreateToken(AppUser user)
        {
            //var claims = new List<Claim>(){
            //new Claim(ClaimTypes.Email,user.Email),
            //new Claim(JwtRegisteredClaimNames.UniqueName,user.UserName),
            //};

            var claims = new List<Claim>(){
                new Claim(JwtRegisteredClaimNames.Sid,user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName,user.UserName),
            };
            // Add role to Claim 
            var roles = await _userManager.GetRolesAsync(user);
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            // Defines the SecurityKey, algorithm and digest for digital signatures.
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            //Contains some information which used to create a security token.
            // Payload 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["Token:Issuer"],
            };
            // creating and validating Json Web Tokens
            var tokenHandle = new JwtSecurityTokenHandler();

            var token = tokenHandle.CreateToken(tokenDescriptor);

            return tokenHandle.WriteToken(token);
        }
    }
}
