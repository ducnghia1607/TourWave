using System;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class SpecificationEvaluator<T> where T :BaseEntity
{
    public static IQueryable<T> GetQuery(IQueryable<T> inputQuery, ISpecification<T> spec){
        var query = inputQuery;
        if(spec.Criteria != null){
            query = query.Where(spec.Criteria);
        }
        if(spec.OrderBy != null){
            query = query.OrderBy(spec.OrderBy);
        }
        if(spec.OrderByDescending != null){
            query = query.OrderByDescending(spec.OrderByDescending);
        }
        if(spec.IsPagingEnabled){
            query = query.Skip(spec.Skip).Take(spec.Take);
        }
        if(spec.Includes != null && spec.Includes.Count > 0 ){
            query = spec.Includes.Aggregate(query,(current,next)=>{
                return current.Include(next);
            });
        }
        if(spec.ThenIncludes != null && spec.ThenIncludes.Count > 0 ){
            query = spec.ThenIncludes.Aggregate(query,(current,next)=>{
                return current.Include(next);
            });
        }

        if(spec.Select != null  ){
            query = query.Select(spec.Select).Cast<T>();
        }
        if (spec.IsDistinct)
        {
            query = query.Distinct();
        }
        return query;
        }

    public static IQueryable<TResult> GetQuery<TSpec,TResult>(IQueryable<T> inputQuery, ISpecification<T,TResult> spec)
    {
        var query = inputQuery;
        if (spec.Criteria != null)
        {
            query = query.Where(spec.Criteria);
        }
        if (spec.OrderBy != null)
        {
            query = query.OrderBy(spec.OrderBy);
        }
        if (spec.OrderByDescending != null)
        {
            query = query.OrderByDescending(spec.OrderByDescending);
        }
        if (spec.IsPagingEnabled)
        {
            query = query.Skip(spec.Skip).Take(spec.Take);
        }
        if (spec.Includes != null && spec.Includes.Count > 0)
        {
            query = spec.Includes.Aggregate(query, (current, next) => {
                return current.Include(next);
            });
        }
        if (spec.ThenIncludes != null && spec.ThenIncludes.Count > 0)
        {
            query = spec.ThenIncludes.Aggregate(query, (current, next) => {
                return current.Include(next);
            });
        }

        //if (spec.Select != null)
        //{
        //    query = query.Select(spec.Select).Cast<T>();
        //}

        var selectQuery = query as IQueryable<TResult>;
        if(spec.SelectResult != null)
        {
            selectQuery = query.Select(spec.SelectResult);
        }

        if (spec.IsDistinct)
        {
            selectQuery = selectQuery?.Distinct();
        }

        return selectQuery ?? query.Cast<TResult>();
    }
}

