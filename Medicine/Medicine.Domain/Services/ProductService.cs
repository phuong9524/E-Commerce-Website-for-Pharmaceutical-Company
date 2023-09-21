using Medicine.DataAccess.Entites;
using Medicine.Domain.Dto;
using Medicine.Domain.Dto.ProductDto;
using Medicine.Domain.Exceptions;
using Medicine.Domain.Extensions;
using Medicine.Domain.Repository.Interfaces;
using Medicine.Domain.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Medicine.Domain.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _db;

        public ProductService(IUnitOfWork db)
        {
            _db = db;
        }

        public Guid CreateProduct(ProductCreateDto createProductDto)
        {
            var product = new Product
            {
                Name = createProductDto.Name,
                Images = createProductDto.Images,
                Price = createProductDto.Price,
                Quantity = createProductDto.Quantity,
                Description = createProductDto.Description,
                TypeId = createProductDto.TypeId,
                UserGuide = createProductDto.UserGuide,
                UserObject = createProductDto.UserObject,
                Use = createProductDto.Use,
                Storage = createProductDto.Storage,
                Materials = createProductDto.Materials,
            };

            _db.Products.Add(product);
            _db.SaveChanges();

            return product.Id;
        }

        public void DeleteProduct(Guid id)
        {
            var product = _db.Products.GetAll()
                            .Where(p => p.Id == id && !p.IsDeleted)
                            .FirstOrDefault();

            if (product != null)
            {
                product.IsDeleted = true;

                var carts = _db.Carts.GetAll()
                                .Where(c => c.ProductId == id && !c.IsPurchased);

                foreach(var cart in carts)
                {
                    cart.IsDeleted = true;
                }

                return;
            }

            throw new NotFoundException($"Product is not found with {id}");
        }

        public ProductDetailDto GetProduct(Guid id)
        {
            var product = _db.Products.GetAll()
                .Include(p => p.Type)
            .Where(p => p.Id == id && !p.IsDeleted)
            .FirstOrDefault();

            if(product == null)
            {
                throw new NotFoundException($"Product is not found with {id}");
            }

            var productDetail = new ProductDetailDto
            {
                Id = product.Id,
                Name = product.Name,
                Quantity = product.Quantity,
                Description = product.Description,
                Price = product.Price,
                Images = product.Images,
                UserGuide = product.UserGuide,
                UserObject = product.UserObject,
                Use = product.Use,
                Storage = product.Storage,
                Materials = product.Materials,
                Type = _db.ProductTypes.GetAll(true)
                            .Where(pt => pt.Id == product.TypeId)
                            .Select(pt => pt.Name)
                            .FirstOrDefault(),
                Views = product.NumberOfViews
            };

            product.NumberOfViews += 1;

            return productDetail;
        }

        public PaginationDto<ProductResponseDto> GetProducts(ProductRequestDto productRequestDto)
        {
            var products = _db.Products.GetAll(true)
                                .Include(p => p.Type)
                            .Where(p => !p.IsDeleted)
                            .WhereIf(!string.IsNullOrEmpty(productRequestDto.Type), p => p.Type.Name.Contains(productRequestDto.Type))
                            .WhereIf(!string.IsNullOrEmpty(productRequestDto.Keyword), p => p.Name.Contains(productRequestDto.Keyword));

            switch (productRequestDto.ProductRequestTypes)
            {
                case Enums.ProductRequestTypes.MostViewed:
                {
                    products = productRequestDto.Sort == Enums.SortTypes.Asc
                                        ? products.OrderBy(p => p.NumberOfViews)
                                                .ThenByDescending(p => p.CreatedAt)
                                        : products.OrderByDescending(p => p.NumberOfViews)
                                                .ThenByDescending(p => p.CreatedAt);
                    break;
                }

                case Enums.ProductRequestTypes.MostBuy:
                {
                    products = productRequestDto.Sort == Enums.SortTypes.Asc
                                        ? products.OrderBy(p => p.NumberOfSold)
                                                .ThenByDescending(p => p.CreatedAt)
                                        : products.OrderByDescending(p => p.NumberOfSold)
                                                .ThenByDescending(p => p.CreatedAt);
                    break;
                }

                case Enums.ProductRequestTypes.Name:
                {
                    products = productRequestDto.Sort == Enums.SortTypes.Asc
                                        ? products.OrderBy(p => p.Name)
                                                .ThenByDescending(p => p.CreatedAt)
                                        : products.OrderByDescending(p => p.Name)
                                                .ThenByDescending(p => p.CreatedAt);
                    break;
                }

                default:
                {
                    products = productRequestDto.Sort == Enums.SortTypes.Asc
                                    ? products.OrderBy(p => p.Name)
                                                .ThenByDescending(p => p.CreatedAt)
                                    : products.OrderByDescending(p => p.Name)
                                                .ThenByDescending(p => p.CreatedAt);
                    break;
                }
            }

            var result = products.Select(p => new ProductResponseDto
            {
                Id = p.Id,
                Name = p.Name,
                Quantity = p.Quantity,
                Description = p.Description,
                Price = p.Price,
                Images = p.Images,
                Type = _db.ProductTypes.GetAll(true)
                            .Where(pt => pt.Id == p.TypeId)
                            .Select(pt => pt.Name)
                            .FirstOrDefault(),
            }).Paginate(productRequestDto.PageIndex, productRequestDto.PageSize);

            return result;
        }

        public Guid UpdateProduct(ProductUpdateDto updateProductDto)
        {
            var product = _db.Products.GetAll()
                .Include(p => p.Type)
            .Where(p => p.Id == updateProductDto.Id)
            .FirstOrDefault();

            var isType = _db.ProductTypes.GetAll(true)
                .Any(pt => pt.Id == updateProductDto.TypeId);

            if (product == null) 
            {
                throw new NotFoundException("This product doesnt exist!");
            }
            if (!isType)
            {
                throw new NotFoundException("This type doesnt exist!");
            }

            product.Id = updateProductDto.Id;
            product.Name = updateProductDto.Name;
            product.Quantity = updateProductDto.Quantity;
            product.Description = updateProductDto.Description;
            product.Price = updateProductDto.Price;
            product.Images = updateProductDto.Images;
            product.TypeId = updateProductDto.TypeId;

            return product.Id;
        }
    }
}
