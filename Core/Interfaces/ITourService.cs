using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ITourService
    {
        Task<string> GenerateNewTourCode();
       Task<bool> CheckAlreadyReview(int tourId, int userId);
    }
}
