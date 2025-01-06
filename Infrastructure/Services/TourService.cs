using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class TourService(TourContext context) : ITourService
    {
        public async Task<string> GenerateNewTourCode()
        {
            var maxTourCode = await context.Tours
                .Where(x => x.TourCode != null)
                .MaxAsync(x => x.TourCode);

            var maxCode = int.TryParse(maxTourCode, out var parsedCode) ? parsedCode : 0;
            var newCode = maxCode + 1;
            return newCode.ToString("D4"); 
        }

        public async Task<bool> CheckAlreadyReview(int tourId,int userId)
        {
            var user = await context.Users.Include(x => x.Reviews).Where(x => x.Id == userId).FirstOrDefaultAsync();
            if (user.Reviews.Any(x => x.TourId == tourId)) return true;
            return false;

        }
    }
}
