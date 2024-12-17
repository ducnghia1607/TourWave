using System;
using System.Linq.Expressions;
using Core.Interfaces;

namespace Core.Specification;

public class BaseSpecification<T>(Expression<Func<T, bool>> criteria) : ISpecification<T>
{
    public Expression<Func<T, bool>> Criteria => criteria;

    public Expression<Func<T, object>>? OrderBy {get;private set;}

    public Expression<Func<T, object>>? OrderByDescending {get;private set;}

    public int Skip {get;private set;}

    public int Take {get;private set;}

    public bool IsPagingEnabled {get;private set;}

    protected void AddOrderBy(Expression<Func<T, object>> orderByExpression){
        OrderBy = orderByExpression;
    }
    protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescExpression){
        OrderByDescending = orderByDescExpression;
    }
    protected void ApplyPaging(int skip,int take){
        IsPagingEnabled = true;
        Skip = skip;
        Take = take;
    }
    IQueryable<T> ISpecification<T>.ApplyCriteria(IQueryable<T> query)
    {
               if(Criteria != null){
            query = query.Where(Criteria);
        }
        return query;
    }
}
