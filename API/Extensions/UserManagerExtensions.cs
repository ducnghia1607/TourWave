using Core.Entities;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindUserByClaimsPrincipal(this UserManager<AppUser> userManager,
       ClaimsPrincipal user)
        {   
            var id = user.FindFirstValue(ClaimTypes.Sid);
            var userName = user.FindFirstValue(ClaimTypes.Name);
            var userName2 = user.FindFirstValue(ClaimTypes.NameIdentifier);
            return await userManager.FindByNameAsync(user.FindFirstValue(ClaimTypes.Name));
        }
    }
}
