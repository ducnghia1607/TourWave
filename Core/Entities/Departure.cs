using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Departure : BaseEntity
    {
    public string Name { get; set; }
    public string ?ImageUrl { get; set; }
    public string ?Link { get; set; }
    }
}