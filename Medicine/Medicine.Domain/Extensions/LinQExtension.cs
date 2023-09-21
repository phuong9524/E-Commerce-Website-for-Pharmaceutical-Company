using Medicine.Domain.Dto;
using System.Data;
using System.Linq.Expressions;

namespace Medicine.Domain.Extensions
{
    public static class LinQExtension
    {
        public static IQueryable<TSource> WhereIf<TSource>(this IQueryable<TSource> source, bool condition, 
            Expression<Func<TSource, bool>> predicate)
        {
            return condition ? source.Where(predicate) : source;
        }

        public static PaginationDto<TSource> Paginate<TSource>(this IQueryable<TSource> source,
            int pageIndex, int pageSize)
        {
            var (totalCount, totalPages, paginatedSource) = GetPaginatedOption(pageIndex, pageSize, source);

            return BuildPaginationDto(totalCount, totalPages, pageIndex, pageSize, paginatedSource);
        }

        private static (int totalCount, int totalPages, IList<TSource> paginatedSource) GetPaginatedOption<TSource>(int pageIndex, int pageSize, IQueryable<TSource> source)
        {
            var totalCount = source.Count();

            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var paginatedSource = source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            return (totalCount, totalPages, paginatedSource);
        }

        private static PaginationDto<TSource> BuildPaginationDto<TSource>(int totalCount, int totalPages, int pageIndex, 
            int pageSize, IList<TSource> paginatedSource)
        {
            return new PaginationDto<TSource>
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                CurrentPage = pageIndex,
                PageSize = pageSize,
                Items = paginatedSource,
                HasNextPage = pageIndex < totalPages,
                HasPreviousPage = pageIndex > 1
            };
        }
    }
}
