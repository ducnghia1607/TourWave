using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Interfaces;

public interface ISpecification<T> 
{
     Expression<Func<T,bool>>? Criteria {get;}
     Expression<Func<T,object>>? OrderBy {get;}
     Expression<Func<T,object>>? OrderByDescending {get;}
     int Skip{get;}
     int Take{get;}
     bool IsPagingEnabled{get;}
     IQueryable<T> ApplyCriteria(IQueryable<T> query);
}
