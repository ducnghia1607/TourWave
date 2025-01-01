﻿using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace API.Controllers
{

    public class AccountController(ITokenService tokenService, IMapper mapper, UserManager<AppUser> userManager) : BaseApiController
    {

        [HttpPost("register")]  // api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto account)
        {
            if (!await UserExists(account.UserName)) return BadRequest("Tài khoản đã tồn tại trong hệ thống");

            //var user = mapper.Map<RegisterDto,AppUser>(account);
            AppUser user = new AppUser()
            {
                DateOfBirth = null,
                Gender = "",
                FullName = account.FullName,
                UserName = account.UserName.ToLower(),
            };

            var result = await userManager.CreateAsync(user, account.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);
            var resultRole = await userManager.AddToRoleAsync(user, "Member");
            if (!resultRole.Succeeded) return BadRequest(resultRole.Errors);
            return new UserDto
            {
                UserName = user.UserName,
                Token = await tokenService.CreateToken(user),
                PhotoUrl = "",
                Gender = "",
                DateOfBirth = null
            };
        }

        [HttpPost("login")] // api/account/login
        public async Task<ActionResult<UserDto>> Login(LoginDto account)
        {
            var user = await userManager.Users
            .Include(x => x.UserPhoto)
            .SingleOrDefaultAsync(user => user.UserName == account.UserName);

            //     var user = await _userManager.Users
            //  .SingleOrDefaultAsync(user => user.UserName == account.Username);
            // var user = await _userManager.Users.Include(x => x.Photos).FirstOrDefaultAsync(u => u.UserName == account.Username);
            // var user = await _userManager.FindByNameAsync(account.Username);

            if (user == null) return Unauthorized();

            var result = await userManager.CheckPasswordAsync(user, account.Password);
            if (!result) return Unauthorized();

            return new UserDto
            {
                UserName = user.UserName,
                Token = await tokenService.CreateToken(user),
                PhotoUrl = user.UserPhoto != null ?  user.UserPhoto.Url : "",
                Gender = user.Gender,
                DateOfBirth = user.DateOfBirth
            };

        }

        public async Task<bool> UserExists(string username)
        {
            return await userManager.Users.AllAsync(user => user.UserName != username.ToLower());
        }
    }
}
