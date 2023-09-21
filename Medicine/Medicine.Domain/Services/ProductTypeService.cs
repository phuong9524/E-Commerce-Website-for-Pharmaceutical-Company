using Medicine.Domain.Dto.ProductTypeDto;
using Medicine.Domain.Repository.Interfaces;
using Medicine.Domain.Services.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Medicine.Domain.Services
{
    public class ProductTypeService : IProductTypeService
    {
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _db;

        public ProductTypeService(IConfiguration configuration, IUnitOfWork db)
        {
            _configuration = configuration;
            _db = db;
        }

        public IList<ProductTypeResponseDto> GetProductTypes() 
        { 
            var types = _db.ProductTypes.GetAll(true)
                        .Where(x => !x.IsDeleted)
                        .Select(x => new ProductTypeResponseDto
                        {
                            Id = x.Id,
                            Name = x.Name,
                        })
                        .ToList();

            return types;
        }
    }
}
