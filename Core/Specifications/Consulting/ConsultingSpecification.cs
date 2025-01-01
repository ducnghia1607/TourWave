using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ConsultingSpecification : BaseSpecification<Consulting>
    {
        public ConsultingSpecification() : base()
        {
            AddInclude(c => c.Tour);
            AddInclude(c => c.AppUser);
        }
    }
}
