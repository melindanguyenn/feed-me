using FeedMe.Api.Models;
using FeedMe.Repository.Interfaces;
using FeedMe.Repository.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace FeedMe.API.AuthenticationService
{
    public class AuthenticateService : IAuthenticateService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private static List<Api.Models.UserModel> _users = new List<Api.Models.UserModel>
        {
            new Api.Models.UserModel { Id = 1, Email = "Admin", Role = RoleModel.Admin },
            new Api.Models.UserModel { Id = 2, Email = "Normal",  Role = RoleModel.User } ,
             new Api.Models.UserModel { Id = 3, Email = "string", Role = RoleModel.User }
        };

        private readonly string _secret;
        private readonly IUserRepository _userRepository;
        public AuthenticateService(IConfiguration configuration,IUserRepository userRepository)
        {
            _secret = configuration["AppSettings:Secret"];
            _userRepository = userRepository;
        }


        public Api.Models.UserModel Authenticate(string email, string password)
        {
            var dbUser = _userRepository.Select(new Repository.Models.UserModel() { email = email, password = password });
            if (dbUser == null) { return null; }

            return CreateUserToken(dbUser);
        }

        public Api.Models.UserModel Refreshtoken(int id, Guid refreshToken)
        {
            var user = _userRepository.Select(id); 
            //_users.SingleOrDefault(x => x.Id == id && x.RefreshToken == refreshToken);
            if (user == null) { return null; }

            return CreateUserToken(user);
        }

        private Api.Models.UserModel CreateUserToken(Repository.Models.UserModel dbUser)
        {
            var user = new Api.Models.UserModel()
            {
                Id = dbUser.id,
                Email = dbUser.email,
                Role = RoleModel.User
            };

            var key = Encoding.ASCII.GetBytes(_secret);
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            user.Token = tokenHandler.WriteToken(token);

            //insert RefreshToken into db
            user.RefreshToken = Guid.NewGuid();

            return user;
        }
    }
}
