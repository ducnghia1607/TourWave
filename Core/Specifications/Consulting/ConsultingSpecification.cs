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
        public ConsultingSpecification(string sort, string order, int page, string date, string search) : base(x => (string.IsNullOrEmpty(date) || DateOnly.FromDateTime(x.CreatedAt) == DateOnly.Parse(date))
        && (string.IsNullOrEmpty(search) || x.FullName.Contains(search) || x.Tour.TourCode.Contains(search)))
        {
            AddInclude(c => c.Tour);
            AddInclude(c => c.AppUser);
            ApplyPaging(10 * (page - 1), 10);
            switch (sort)
            {
                case "CreatedAt":
                    if(order=="desc")
                        AddOrderByDescending(x => x.CreatedAt);
                    else
                    {
                        AddOrderBy(x => x.CreatedAt);
                    }
                    break;
                case "FullName":
                    if (order == "desc")
                        AddOrderByDescending(x => x.FullName);
                    else
                    {
                        AddOrderBy(x => x.FullName);
                    }
                    break;
                case "Status":
                    if (order == "desc")
                        AddOrderByDescending(x => x.Status);
                    else
                    {
                        AddOrderBy(x => x.Status);
                    }
                    break;
                case "TourCode":
                    if (order == "desc")
                        AddOrderByDescending(x => x.Tour.TourCode);
                    else
                    {
                        AddOrderBy(x => x.Tour.TourCode);
                    }
                    break;
                default:
                    AddOrderByDescending(x => x.CreatedAt);
                    break;
                    // AddOrderBy(x => x.Duration);
                    // break;
            }

        }

        public ConsultingSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(c => c.Tour);
            AddInclude(c => c.AppUser);
        }
    }
}
