using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using API.DataHelpers;
using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class ToursController(IGenericRepository<Tour> repo, IMapper mapper) : BaseApiController
{

    [HttpGet]

    // public async Task<ActionResult<IReadOnlyList<Tour>>> GetTours(string? departure,string?sort){ : không cần hint vì ko truyền vào 1 object
    // Bởi vì đang truyền vào 1 object nên ApiController sẽ tìm ở trong body do đó phải tạo hint cho ApiController lấy ở QueryStringQueryString
    public async Task<ActionResult<IReadOnlyList<TourDto>>> GetTours([FromQuery]TourSpecParams specParams){
        var spec = new TourSpecification(specParams);
        var items = await repo.ListAsyncWithSpec(spec);
        var count = await repo.CountAsync(spec);
        var data = mapper.Map<IReadOnlyList<Tour>,IReadOnlyList<TourDto>>(items);
       var pagination = new Pagination<TourDto>(specParams.PageIndex,specParams.PageSize,count,data);
       return Ok(pagination);
        // return await CreatePagedResult(repo,spec,specParams.PageIndex,specParams.PageSize);
    }
    // [HttpGet("{id:int}")] // api/tours/2
    // public async Task<ActionResult<Tour>> GetTour(int id){
    //     var tour = await repo.GetByIdAsync(id);
    //     if(tour == null){
    //         return NotFound();
    //     }
    //    return tour;
    // }  
    //[HttpGet("{id:int}")] // api/tours/2
    //public async Task<ActionResult<Tour>> GetTour(int id)
    //{
    //    var spec = new TourDetailWithItineraryandSchedule(id);
    //    var tour = await repo.GetEntityWithSpec(spec);
    //    if (tour == null)
    //    {
    //        return NotFound();
    //    }
    //    return tour;
    //    //    return mapper.Map<Tour,TourDetailDto>(tour);
    //}

    //[HttpGet("{title}")]  // api /users/2
    //public async Task<ActionResult<Tour>> GetTour([FromRoute(Name = "title")]  string name)
    //{
    //    var spec = new TourDetailWithItineraryandSchedule(name);
    //    var tour = await repo.GetEntityWithSpec(spec);
    //    if(tour == null){
    //        return NotFound();
    //    }
    //    return tour;
    //    // return await _uow.UserRepository.GetMemberByUsernameAsync(username);
    //}

    [HttpGet("{keyword}")] // api/tours/2
    //FromRoute] string keyword,
    public async Task<ActionResult<IReadOnlyList<TourDto>>> GetListToursByTitle( [FromQuery] TourSpecParams param)
    {
        var spec = new TourListWithSearchSpecification(param);
        var items = await repo.ListAsyncWithSpec(spec);
        var count = await repo.CountAsync(spec);
        var data = mapper.Map<IReadOnlyList<Tour>, IReadOnlyList<TourDto>>(items);
        var pagination = new Pagination<TourDto>(param.PageIndex, param.PageSize, count, data);
        return Ok(pagination);
    }

    [HttpGet("{title}/{tourCode}")] // api/tours/2
    public async Task<ActionResult<Tour>> GetTourDetailByTitle(string title,string tourCode, [FromQuery]string date)
    {
        var spec = new TourDetailWithitineraryAndScheduleByTitle(title,tourCode,date);
        var tour = await repo.GetEntityWithSpec(spec);
        //if (tour == null)
        //{
        //    return NotFound();
        //}
        return tour;
        //    return mapper.Map<Tour,TourDetailDto>(tour);
    }

    [HttpGet("search-temp")]
        public async Task<ActionResult<TourDto>> GetTourByTitle([FromQuery]string keyword)
    {
        var spec = new TourWithTemporarySearch(keyword);
        var tours = await repo.ListAsyncWithSpec(spec);
        if (tours == null)
        {
            return NotFound();
        }
        var items = mapper.Map<IReadOnlyList<Tour>,IReadOnlyList<TourDto>>(tours);
        return Ok(items);
    }

    [HttpPost]
    public async Task<ActionResult<Tour>> CreateTour(Tour tour){
        repo.Add(tour);
        if(await repo.SaveAllASync()){
            return CreatedAtAction("GetTour",new {id = tour.Id},tour);
        };
        return BadRequest("Problem creating new tour");
    }

    [HttpPut("{id:int}")] // api/
    public async Task<ActionResult> UpdateTour(int id ,Tour tour){
        if(tour.Id != id || !TourExists(id)){
            return BadRequest("Cannot update tour");
        }
        repo.Update(tour);
        if(await repo.SaveAllASync()){
            return NoContent();
        }
        return BadRequest("Problem updating the tour");
    }

        [HttpDelete("{id:int}")] // api/
    public async Task<ActionResult> DeleteTour(int id){
        var tour = await repo.GetByIdAsync(id);
        if(tour == null){
            return NotFound();
        }
        repo.Remove(tour);
        if(await repo.SaveAllASync()){
            return NoContent();
        }
        return BadRequest("Problem deleting the tour");
    }

    public bool TourExists(int id){
        return repo.Exists(id);
    }
    [HttpGet("best-tour")]
    public async Task<ActionResult<IReadOnlyList<TourDto>>> GetBestTourDeal(){
        var spec = new BestTourDealSpecification();
        var items = await repo.ListAsyncWithSpec(spec);
        var data = mapper.Map<IReadOnlyList<Tour>,IReadOnlyList<TourDto>>(items);
        return Ok(data);
    }
    [HttpGet("hot-domestic-tour")]
    public async Task<ActionResult<IReadOnlyList<TourDto>>> GetHotDomesticTours(){
        var spec = new DomesticTourSpecification();
        var items = await repo.ListAsyncWithSpec(spec);
        var data = mapper.Map<IReadOnlyList<Tour>,IReadOnlyList<TourDto>>(items);
        return Ok(data);
    }
    
        [HttpGet("hot-international-tour")]
    public async Task<ActionResult<IReadOnlyList<TourDto>>> GetHotInternaltionalTours(){
        var spec = new InternationalTourSpecfication();
        var items = await repo.ListAsyncWithSpec(spec);
        var data = mapper.Map<IReadOnlyList<Tour>,IReadOnlyList<TourDto>>(items);
        return Ok(data);
    }
}
