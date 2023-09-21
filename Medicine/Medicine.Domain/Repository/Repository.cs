using Medicine.DataAccess.Context;
using Medicine.Domain.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Medicine.Domain.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly MedicineContext _db;

        internal DbSet<T> dbSet;

        public Repository(MedicineContext db)
        {
            _db = db;
            dbSet = _db.Set<T>();
        }

        public void Add(T entity)
        {
            dbSet.Add(entity);
        }

        public void AddRange(IList<T> entities)
        {
            dbSet.AddRange(entities);
        }

        public T Get(Guid id)
        {
            return dbSet.Find(id);
        }

        public IQueryable<T> GetAll(bool isUntrackEntities)
        {
            IQueryable<T> query = dbSet;

            if (isUntrackEntities)
            {
                query = query.AsNoTracking();
            }

            return query;
        }

        public IQueryable<T> GetAll()
        {
            return GetAll(false);
        }

        public void Remove(T entity)
        {
            dbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            dbSet.RemoveRange(entities);
        }

        public void Update(T entity)
        {
            dbSet.Update(entity);
        }

        public void UpdateRange(IList<T> entities)
        {
            dbSet.UpdateRange(entities);
        }
    }
}
