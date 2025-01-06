using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ReviewSpecification : BaseSpecification<Review>
    {
        public ReviewSpecification(int tourId) : base(x => x.TourId == tourId)
        {
            AddInclude(x => x.Images);
            AddInclude(x => x.AppUser);
            AddInclude(x => x.Tour);
            AddOrderByDescending(x => x.Rating);
        }

         
    }
}
