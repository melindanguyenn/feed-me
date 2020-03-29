using System;
using System.Collections.Generic;
using FeedMe.Repository.Models;

namespace FeedMe.Repository.Interfaces
{
    public interface IFavoriteRepository
    {
        int Insert(FavoriteModel favorite);
        List<FavoriteModel> Select(int userId);
    }
}
