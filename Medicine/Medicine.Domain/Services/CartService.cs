using Medicine.DataAccess.Entites;
using Medicine.Domain.Constant;
using Medicine.Domain.Dto;
using Medicine.Domain.Dto.CartDto;
using Medicine.Domain.Dto.ProductDto;
using Medicine.Domain.Enums;
using Medicine.Domain.Exceptions;
using Medicine.Domain.Extensions;
using Medicine.Domain.Repository.Interfaces;
using Medicine.Domain.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Medicine.Domain.Services
{
    public class CartService : ICartService
    {
        private readonly IUnitOfWork _db;

        public CartService(IUnitOfWork db)
        {
            _db = db;
        }

        public PaginationDto<CartResponseDto> GetMyCarts(BasePaginationRequestDto paginationRequestDto, ContextDto context)
        {
            var carts = _db.Carts.GetAll(true)
                .Where(c => !c.IsDeleted && c.UserId == context.UserId && !c.IsPurchased)
                    .Include(c => c.Product)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new CartResponseDto                   
                {
                    Id = c.Id,
                    ProductId = c.ProductId,
                    ProductName = c.Product.Name,
                    Quantity = c.Quantity,
                    Price = c.Quantity * c.Product.Price,
                    Images = c.Product.Images
                }).Paginate(paginationRequestDto.PageIndex, paginationRequestDto.PageSize);

            return carts;
        }

        public Guid ModifyCart(CartModificationDto cartModification, ContextDto context)
        {
            var productQuantity = _db.Products.GetAll(true)
                            .Where(p => p.Id == cartModification.ProductId)
                            .Select(p => p.Quantity)
                            .FirstOrDefault();

            if (productQuantity < cartModification.Quantity)
            {
                throw new ForbiddenException("You can not buy more products than stock");
            }

            var cart = _db.Carts.GetAll().Where(c => !c.IsPurchased && c.Id == cartModification.Id
                            && c.UserId == context.UserId).FirstOrDefault();

            if (cart != null)
            {
                if (productQuantity < cartModification.Quantity)
                {
                    throw new ForbiddenException("You can not buy more products than stock");
                }

                cart.Quantity = cartModification.Quantity;

                return cart.Id;
            }

            throw new NotFoundException("Can not find this product in your cart");
        }

        public Guid AddProduct(CartAddingProductDto cartAddingProduct, ContextDto context)
        {
            var productQuantity = _db.Products.GetAll(true)
                            .Where(p => p.Id == cartAddingProduct.ProductId)
                            .Select(p => p.Quantity)
                            .FirstOrDefault();

            if (productQuantity < cartAddingProduct.Quantity)
            {
                throw new ForbiddenException("You can not buy more products than stock");
            }

            var cart = _db.Carts.GetAll().Where(c => !c.IsPurchased && c.ProductId == cartAddingProduct.ProductId
                            && c.UserId == context.UserId).FirstOrDefault();
            
            if(cart != null)
            {
                if (productQuantity < cart.Quantity + cartAddingProduct.Quantity)
                {
                    throw new ForbiddenException("You can not buy more products than stock");
                }

                cart.Quantity = cartAddingProduct.Quantity;

                return cart.Id;
            }

            var newCart = new Cart
            {
                ProductId = cartAddingProduct.ProductId,
                UserId = context.UserId,
                Quantity = cartAddingProduct.Quantity,
                Description = string.Empty
            };

            _db.Carts.Add(newCart);

            _db.SaveChanges();

            return newCart.Id;
        }

        public void DeleteCart(Guid cartId, ContextDto context)
        {
            var myCart = _db.Carts.GetAll(true)
                            .Where(c => c.Id == cartId 
                                && (c.UserId == context.UserId || context.UserRoles.Contains("Admin")))
                            .FirstOrDefault();

            if (myCart != null)
            { 
                // Check if this/these carts is/are confirmed
                var isOrdered = _db.Carts.GetAll(true)
                            .Any(c => c.Id == cartId && c.IsPurchased);
                if (isOrdered)
                {
                    throw new ForbiddenException("You cant delete this/these carts.");
                }

                _db.Carts.Remove(myCart);
            }
            else
            {
                throw new NotFoundException("We can not find this product in your cart.");
            }
        }

        public Guid ConfirmCart(CartConfirmDto cartConfirm, ContextDto context)
        {
            // Check if this/these cart exist in cart
            foreach(var cartInfo in cartConfirm.CartInfos)
            {
                var isExist = _db.Carts.GetAll(true)
                            .Any(c => cartInfo.Id == c.Id && (c.UserId == context.UserId));
                if (!isExist)
                {
                    throw new NotFoundException("We can not find this/these products in your cart.");
                }
            }

            // Check if quantity is smaller than current stock
            var productsInCart = new List<ProductResponseDto>();

            foreach (var cartInfo in cartConfirm.CartInfos)
            {
                var productIncart = _db.Carts.GetAll(true).Where(c => cartInfo.Id == c.Id
                                && (c.UserId == context.UserId))
                            .Select(c => new ProductResponseDto
                            {
                                Id = c.ProductId,
                                Quantity = c.Quantity
                            }).FirstOrDefault();

                productsInCart.Add(productIncart);
            }

            foreach(var productInCart in productsInCart)
            {
                var isQualified = _db.Products.GetAll(true)
                                    .Any(p => p.Id == productInCart.Id && p.Quantity <= productInCart.Quantity);

                if (isQualified)
                {
                    throw new ForbiddenException("You can not buy more products than stock.");
                }
            }

            // Check if this/these carts is/are confirmed
            foreach (var cartInfo in cartConfirm.CartInfos)
            {
                var cart = _db.Carts.GetAll()
                            .Where(c => cartInfo.Id == c.Id)
                            .FirstOrDefault();
                if (cart.IsPurchased)
                {
                    throw new ForbiddenException("You confirmed this/these carts.");
                }
                cart.IsPurchased = true;
            }

            // Reduce quantity of products in Products table
            foreach (var productInCart in productsInCart)
            {
                var product = _db.Products.GetAll()
                                    .Where(p => p.Id == productInCart.Id)
                                    .FirstOrDefault();

                product.Quantity -= productInCart.Quantity;
            }

            // Add data to Orders table
            var order = new Order
            {
                PaymentMethod = cartConfirm.PaymentMethod,
                MerchandiseSubtotal = cartConfirm.CartInfos.Sum(x => x.Price),
                Description = cartConfirm.Description,
                Destination = cartConfirm.Destination,
                UserId = context.UserId
            };

            _db.Orders.Add(order);

            // Add OrderDetails table
            var orderDetails = new List<OrderDetail>();

            foreach(var cartInfo in cartConfirm.CartInfos)
            {
                orderDetails.Add(new OrderDetail
                {
                    CartId = cartInfo.Id,
                    OrderId = order.Id
                });
            }
            _db.OrderDetails.AddRange(orderDetails);

            // Add status to OrderStatuses table
            var orderStatus = new OrderStatus
            {
                OrderId = order.Id,
                Description = cartConfirm.Description,
                Status = OrderStatuses.PendingForConfirm.ToString()
            };
            _db.OrderStatuses.Add(orderStatus);

            return order.Id;
        }
    }
}
