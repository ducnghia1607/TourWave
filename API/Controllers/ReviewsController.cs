using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DataHelpers;
using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class ReviewsController(IUnitOfWork unit,IMapper mapper,IPhotoService photoService) : BaseApiController
    {
        [Authorize]
        [HttpPost]
       public async Task<ActionResult<Review>> 
       CreateReview(Review review){
        unit.Repository<Review>().Add(review);
        if(await unit.Complete()) return Ok(review);
        return BadRequest("Failed to add review");
       }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ReviewDto>>> GetAllReviews([FromQuery]int tourId){
            var spec = new ReviewSpecification(tourId);
            var items = await unit.Repository<Review>().ListAsyncWithSpec(spec);
            return Ok(mapper.Map<IReadOnlyList<Review>,IReadOnlyList<ReviewDto>>(items));
        }

        //[HttpGet]
        //public async Task<ActionResult<IReadOnlyList<ReviewDto>>> GetAllReviewsForUser([FromQuery] int userId)
        //{
        //    var spec = new ReviewSpecification(tourId);
        //    var items = await unit.Repository<Review>().ListAsyncWithSpec(spec);
        //    return Ok(mapper.Map<IReadOnlyList<Review>, IReadOnlyList<ReviewDto>>(items));
        //}

        [Authorize]
        [HttpPost("add-review-image/{reviewId}")]
        public async Task<ActionResult<ImageDto>> AddPhotoReview(IFormFile file,[FromRoute]int reviewId)
        {
            var review = await unit.Repository<Review>().GetByIdAsync(reviewId);
            if(review == null) return BadRequest("Failed to add image");
            var result = photoService.AddImageAsync(file);
            if (result.Result.Error != null) return BadRequest(result.Result.Error.Message);

            var photo = new Image
            {
                Url = result.Result.SecureUrl.AbsoluteUri,
                PublicId = result.Result.PublicId,
            };
            review.Images.Add(photo);
            if (await unit.Complete())
            {
                var actionName = nameof(AddPhotoReview);
                var createdResource = mapper.Map<ImageDto>(photo);
                var routeValues = new { id = review.Id }; 
                return CreatedAtAction(actionName, routeValues, createdResource);
            }
            return BadRequest("Adding photo failed");

        }
    }
}