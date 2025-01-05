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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

using Tour = Core.Entities.Tour;
public class ToursController(IUnitOfWork unit,IMapper mapper) : BaseApiController
{

    [HttpGet]

    // public async Task<ActionResult<IReadOnlyList<Tour>>> GetTours(string? departure,string?sort){ : không cần hint vì ko truyền vào 1 object
    // Bởi vì đang truyền vào 1 object nên ApiController sẽ tìm ở trong body do đó phải tạo hint cho ApiController lấy ở QueryStringQueryString
    public async Task<ActionResult<IReadOnlyList<TourDto>>> GetTours([FromQuery]TourSpecParams specParams){
        var spec = new TourSpecification(specParams);
        var items = await unit.Repository<Tour>().ListAsyncWithSpec(spec);
        var count = await unit.Repository<Tour>().CountAsync(spec);
        var data = mapper.Map<IReadOnlyList<Tour>,IReadOnlyList<TourDto>>(items);
       var pagination = new Pagination<TourDto>(specParams.PageIndex,specParams.PageSize,count,data);
       return Ok(pagination);
        // return await CreatePagedResult(repo,spec,specParams.PageIndex,specParams.PageSize);
    }
    [Authorize]
    [HttpGet("tour-management")]
     public async Task<ActionResult<IReadOnlyList<TourDto>>> GetToursForManagement([FromQuery]TourSpecParams specParams){
        var spec = new TourSpecification(specParams);
        var items = await unit.Repository<Tour>().ListAsyncWithSpec(spec);
        var count = await unit.Repository<Tour>().CountAsync(spec);
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
    [HttpGet("{id:int}")] // api/tours/2
    public async Task<ActionResult<Tour>> GetTour(int id)
    {
        //var spec = new TourDetailWithItineraryandSchedule(id);
        //var tour = await repo.GetEntityWithSpec(spec);
        var tour = await unit.Repository<Tour>().GetByIdAsync(id);
        if (tour == null)
        {
            return NotFound();
        }
        return tour;
        //    return mapper.Map<Tour,TourDetailDto>(tour);
    }

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
        var items = await  unit.Repository<Tour>().ListAsyncWithSpec(spec);
        var count = await  unit.Repository<Tour>().CountAsync(spec);
        var data = mapper.Map<IReadOnlyList<Tour>, IReadOnlyList<TourDto>>(items);
        var pagination = new Pagination<TourDto>(param.PageIndex, param.PageSize, count, data);
        return Ok(pagination);
    }

    [HttpGet("{title}/{tourCode}")] // api/tours/2
    public async Task<ActionResult<Tour>> GetTourDetailByTitle(string title,string tourCode, [FromQuery]string date)
    {
        var spec = new TourDetailWithitineraryAndScheduleByTitle(title,tourCode,date);
        var tour = await  unit.Repository<Tour>().GetEntityWithSpec(spec);
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
        var tours = await  unit.Repository<Tour>().ListAsyncWithSpec(spec);
        if (tours == null)
        {
            return NotFound();
        }
        var items = mapper.Map<IReadOnlyList<Tour>,IReadOnlyList<TourDto>>(tours);
        return Ok(items);
    }
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Tour>> CreateTour(Tour tour){
        unit.Repository<Tour>().Add(tour);
        if(await unit.Complete()){
            return CreatedAtAction("GetTour",new {id = tour.Id},tour);
        };
        return BadRequest("Problem creating new tour");
    }
    [Authorize]
    [HttpPut("{id:int}")] // api/
    public async Task<ActionResult> UpdateTour(int id ,Tour tour){
        if(tour.Id != id || !TourExists(id)){
            return BadRequest("Cannot update tour");
        }
        unit.Repository<Tour>().Update(tour);
        if(await unit.Complete()){
            return NoContent();
        }
        return BadRequest("Problem updating the tour");
    }

    [Authorize]
        [HttpDelete("{id:int}")] // api/
    public async Task<ActionResult> DeleteTour(int id){
        var tour = await unit.Repository<Tour>().GetByIdAsync(id);
        if(tour == null){
            return NotFound();
        }
        unit.Repository<Tour>().Remove(tour);
        if(await unit.Complete()){
            return NoContent();
        }
        return BadRequest("Problem deleting the tour");
    }

    public bool TourExists(int id){
        return unit.Repository<Tour>().Exists(id);
    }
    [HttpGet("best-tour")]
    public async Task<ActionResult<IReadOnlyList<TourDto>>> GetBestTourDeal(){
        var spec = new BestTourDealSpecification();
        var items = await unit.Repository<Tour>().ListAsyncWithSpec(spec);
        var data = mapper.Map<IReadOnlyList<Tour>,IReadOnlyList<TourDto>>(items);
        return Ok(data);
    }
    [HttpGet("hot-domestic-tour")]
    public async Task<ActionResult<IReadOnlyList<TourDto>>> GetHotDomesticTours(){
        var spec = new DomesticTourSpecification();
        var items = await unit.Repository<Tour>().ListAsyncWithSpec(spec);
        var data = mapper.Map<IReadOnlyList<Tour>,IReadOnlyList<TourDto>>(items);
        return Ok(data);
    }
    
        [HttpGet("hot-international-tour")]
    public async Task<ActionResult<IReadOnlyList<TourDto>>> GetHotInternaltionalTours(){
        var spec = new InternationalTourSpecfication();
        var items = await unit.Repository<Tour>().ListAsyncWithSpec(spec);
        var data = mapper.Map<IReadOnlyList<Tour>,IReadOnlyList<TourDto>>(items);
        return Ok(data);
    }

    [HttpGet("tour-type-hobby")]
    public async Task<ActionResult<IReadOnlyList<TourTypeHobby>>> GetAllTourTypeHobby(){
        var items = await unit.Repository<TourTypeHobby>().ListAllAsync();
        if(items == null) return NotFound();
        return Ok(items);
    }

    [HttpGet("recommend-tour")]
    public async Task<ActionResult<IReadOnlyList<TourToRecommendDto>>> GetAllRecommendTour()
    {
        var spec = new TourRecommendSpecification();
        var items = await  unit.Repository<Tour>().ListAsyncWithSpec(spec);
        if (items == null) return NotFound();
        var data = mapper.Map<IReadOnlyList<Tour>, IReadOnlyList<TourToRecommendDto>>(items);
        var count = await unit.Repository<Tour>().CountAsync(spec);
        //var data = mapper.Map<IReadOnlyList<Tour>, IReadOnlyList<TourDto>>(items);
        var pagination = new Pagination<TourToRecommendDto>(1, 4, count, data);
        return Ok(pagination);
        //return Ok(data);
    }

    [HttpGet("related-tour")]
    public async Task<ActionResult<IReadOnlyList<TourDto>>> GetRelatedTour([FromQuery]string destination, [FromQuery]  string tourCode)
    {
        var spec = new TourRelatedSpecification(destination,tourCode);
        var items = await unit.Repository<Tour>().ListAsyncWithSpec(spec);
        items = items.Take(3).ToList();
        var data = mapper.Map<IReadOnlyList<Tour>, IReadOnlyList<TourDto>>(items);
        return Ok(data);
        //return Ok(data);
    }
}
