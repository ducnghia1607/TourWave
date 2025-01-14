using System;
using Core.Entities;
using Core.Specification;
using Core.Specifications;

namespace Core.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T> GetByIdAsync(int id);
    Task<IReadOnlyList<T>> ListAllAsync();
    Task<T> GetEntityWithSpec(ISpecification<T> spec);
    Task<IReadOnlyList<T>> ListAsyncWithSpec(ISpecification<T> spec);
    Task<TResult?> GetEntityWithSpec<TResult>(ISpecification<T,TResult> spec);
    Task<IReadOnlyList<TResult>> ListAsyncWithSpec<TResult>(ISpecification<T,TResult> spec);
    void Add(T entity);
    void AddRange(List<T> entity);
    void Remove(T entity);
    void Update(T entity);
    bool Exists(int id);
    // Task<bool> SaveAllASync();
    Task<int> CountAsync(ISpecification<T> spec);
    
}
