using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Interfaces;

public interface ISpecification<T> 
{
     Expression<Func<T,bool>>? Criteria {get;}
     Expression<Func<T,object>>? OrderBy {get;}
     Expression<Func<T,object>>? OrderByDescending {get;}
     List<Expression<Func<T,object>>>? Includes{get;}
     List<string>? ThenIncludes{get;}
     Expression<Func<T,object>>? Select {get;}
     int Skip{get;}
     int Take{get;}
     bool IsPagingEnabled{get;}
     bool IsDistinct { get; }
     IQueryable<T> ApplyCriteria(IQueryable<T> query);
}


public interface ISpecification<T,TResult> : ISpecification<T>
{
    Expression<Func<T,TResult>> ? SelectResult { get; }
}
