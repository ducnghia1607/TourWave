using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Core.Specifications;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ItinerariesController(IUnitOfWork unit,IPhotoService photoService,IMapper mapper) : BaseApiController
    {
        [Authorize]
        [HttpPost("add-new-photo/{tourId:int}/{id:int}")]
        public async Task<ActionResult<ImageDto>> AddNewPhoto(IFormFile file, [FromRoute] int tourId, [FromRoute] int id)
        {
            var spec = new TourDetailWithItineraryandSchedule(tourId);
            var tour = await unit.Repository<Tour>().GetEntityWithSpec(spec);
            var result = photoService.AddImageAsync(file);
            if (result.Result.Error != null) return BadRequest(result.Result.Error.Message);

            var photo = new Image
            {
                Url = result.Result.SecureUrl.AbsoluteUri,
                PublicId = result.Result.PublicId,
            };
            //if (user.Photos.Count == 0) photo.isMain = true;
            // EF tracks that user
            //user.Photos.Add(photo);
            var itinerary = tour.Itineraries.Where(x => x.Id == id).FirstOrDefault();
            if(itinerary != null)
            {
                itinerary.Images.Add(photo);
            }
            if (await unit.Complete())
            {
                var actionName = nameof(AddNewPhoto);
                var createdResource = mapper.Map<ImageDto>(photo); // new created data 
                var routeValues = new { id = tour.Id }; // api/users/{username} link assign to location header
                return CreatedAtAction(actionName, routeValues, createdResource);
            }
            return BadRequest("Adding photo failed");
        }
    }
}
