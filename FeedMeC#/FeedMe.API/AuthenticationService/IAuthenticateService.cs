using FeedMe.Api.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedMe.API.AuthenticationService
{
    public interface IAuthenticateService
    {
        UserModel Authenticate(string username, string password);
        UserModel Refreshtoken(int id, Guid refreshToken);
        string HashPassword(string password);
    }
   
}
