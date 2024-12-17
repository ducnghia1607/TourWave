using System;
using System.Linq.Expressions;
using Core.Interfaces;

namespace Core.Specification;

public class BaseSpecification<T>(Expression<Func<T, bool>> criteria) : ISpecification<T>
{
    public Expression<Func<T, bool>> Criteria => criteria;

    public Expression<Func<T, object>>? OrderBy {get;private set;}

    public Expression<Func<T, object>>? OrderByDescending {get;private set;}
    public void AddOrderBy(Expression<Func<T, object>> orderByExpression){
        OrderBy = orderByExpression;
    }
    public void AddOrderByDescending(Expression<Func<T, object>> orderByDescExpression){
        OrderByDescending = orderByDescExpression;
    }
}
