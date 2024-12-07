using System;

namespace Core.Entities;

public class Review : BaseEntity
{
     public required Tour Tour { get; set; }

     public int TourId { get; set; }


}
