using System;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;
using Core.Interfaces;

namespace Core.Specification;

public class BaseSpecification<T> : ISpecification<T>
{
    
    private readonly Expression<Func<T, bool>> criteria;

    public BaseSpecification(Expression<Func<T, bool>> criteria)
    {
        this.criteria = criteria;
    }

    public BaseSpecification(){
        
    }

    public Expression<Func<T, bool>> Criteria => criteria;

    public Expression<Func<T, object>>? OrderBy {get;private set;}

    public Expression<Func<T, object>>? OrderByDescending {get;private set;}

    public int Skip {get;private set;}

    public int Take {get;private set;}

    public bool IsPagingEnabled {get;private set;}

    public List<Expression<Func<T, object>>>? Includes {get;private set;} = new ();

    public Expression<Func<T, object>>? Select {get;private set;} 
    // public List<Func<IQueryable<T>, Func<T, object>>> NestedIncludes { get; } 
    // = new List<Func<IQueryable<T>, Func<T, object>>>();
        public List<string> ThenIncludes { get;private set; } = new ();
    protected void AddOrderBy(Expression<Func<T, object>> orderByExpression){
        OrderBy = orderByExpression;
    }
    protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescExpression){
        OrderByDescending = orderByDescExpression;
    }
    protected void AddInclude(Expression<Func<T, object>> includeExpression){
        Includes.Add(includeExpression);
    }
    
    protected void AddNestedInclude(string nestedIncludeExpression){
        ThenIncludes.Add(nestedIncludeExpression);
    }
    protected void AddSelect(Expression<Func<T, object>> selectExpression){
        Select = selectExpression;
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
