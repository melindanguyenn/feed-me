using System;
using System.Collections.Generic;
using FeedMe.Repository.Models;

namespace FeedMe.Repository.Interfaces
{
    public interface IFavoriteNotesRepository
    {
        List<FavoriteNotesModel> Select(int user_id);
    }
}
