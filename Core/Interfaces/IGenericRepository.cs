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
    void Add(T entity);
    void Remove(T entity);
    void Update(T entity);
    bool Exists(int id);
    // Task<bool> SaveAllASync();
    Task<int> CountAsync(ISpecification<T> spec);
    
}
