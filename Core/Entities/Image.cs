using System;

namespace Core.Entities;

public class Image : BaseEntity
{
    public required string Url { get; set; }

    public string ? PublicId{ get; set; }
    public int TourId { get; set; }
    public  required Tour Tour {get;set;}
}
