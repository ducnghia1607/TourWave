using System;

namespace Core.Entities;

public class Review : BaseEntity
{
     public  Tour ?Tour { get; set; }

     public int TourId { get; set; }
     
     public AppUser ?AppUser { get; set; }

     public int AppUserId { get; set; }

     public string ?Description { get; set; }

     public int Rating {get;set;}
    public List<Image>? Images { get; set; } = new();
     public DateTime CreatedAt {get;set;} = DateTime.Now;

}
