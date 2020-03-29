using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeedMe.Api.Models;
using FeedMe.API.AuthenticationService;
using FeedMe.API.Models;
using FeedMe.Repository.Interfaces;
using FeedMe.Repository.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace FeedMe.API.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        #region Properties and Initialization
        private readonly IUserRepository _userRepository;
        private readonly IAuthenticateService _authenticateService;
        public UserController(IUserRepository userRepository, IAuthenticateService authenticateService)
        {
            _userRepository = userRepository;
            _authenticateService = authenticateService;
        }
        #endregion

        [AllowAnonymous]
        [HttpPost, Route("Login")]
        public IActionResult Login([FromBody]UserDto userDto)
        {
            Api.Models.UserModel user = new Api.Models.UserModel();

            try
            {
                user = _authenticateService.Authenticate(userDto.Email, userDto.Password);
                if (user == null) { return BadRequest(new { message = "Username or password is incorrect" }); }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPut("token/{id}")]
        public IActionResult RefreshToken(int id, [FromBody]Guid refreshToken)
        {
            Api.Models.UserModel user = new Api.Models.UserModel();

            try
            {
                user = _authenticateService.Refreshtoken(id, refreshToken);
                if (user == null) { return BadRequest(new { message = ("Invalid refresh token") }); }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(user);
        }

        [HttpPost, Route("Signup")]
        public IActionResult Create([FromBody]UserDto userDto)
        {
            try
            {
                var user = new Repository.Models.UserModel()
                {
                    email = userDto.Email,
                    password = userDto.Password
                };

                _userRepository.Insert(user);
                return Login(userDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPut("Update/{id}")]
        public IActionResult Update(int id, [FromBody]string password)
        {
            try
            {
                _userRepository.Update(id, password);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _userRepository.Delete(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

    }
}
