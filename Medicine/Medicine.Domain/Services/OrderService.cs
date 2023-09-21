using Medicine.DataAccess.Entites;
using Medicine.Domain.Constant;
using Medicine.Domain.Dto;
using Medicine.Domain.Dto.CartDto;
using Medicine.Domain.Dto.OrderDto;
using Medicine.Domain.Dto.ProductDto;
using Medicine.Domain.Dto.UserDto;
using Medicine.Domain.Enums;
using Medicine.Domain.Exceptions;
using Medicine.Domain.Extensions;
using Medicine.Domain.Repository.Interfaces;
using Medicine.Domain.Services.Interfaces;
using System;

namespace Medicine.Domain.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _db;
        private readonly IColorService _colorService;

        public OrderService(IUnitOfWork db, IColorService colorService)
        {
            _db = db;
            _colorService = colorService;
        }

        public Guid ConfirmOrder(Guid orderId, ContextDto contextDto)
        {
            var orderStatus = _db.OrderStatuses.GetAll(true)
                            .Where(os => os.OrderId == orderId)
                            .OrderByDescending(os => os.CreatedAt)
                            .FirstOrDefault();

            if (orderStatus.Status == OrderStatuses.PendingForConfirm.ToString())
            {
                var newOrderStatus = new OrderStatus
                {
                    OrderId = orderStatus.OrderId,
                    Description = "Your order is confirmed.",
                    Status = OrderStatuses.PendingForPreparation.ToString()
                };

                _db.OrderStatuses.Add(newOrderStatus);

                return newOrderStatus.Id;
            }
            else
            {
                throw new NotFoundException(string.Format(InvalidConstant.InvalidOrder, orderId.ToString()));
            }
        }

        //public Guid UpdateStatusOrder(Guid orderId, Guid shipperId, ContextDto contextDto)
        //{
        //    var orderStatus = _db.OrderStatuses.GetAll(true)
        //                    .Where(os => os.OrderId == orderId)
        //                    .OrderByDescending(os => os.CreatedAt)
        //                    .FirstOrDefault();

        //    if (orderStatus.Status == OrderStatuses.PendingForPreparation.ToString())
        //    {
        //        var newOrderStatus = new OrderStatus
        //        {
        //            OrderId = orderStatus.OrderId,
        //            Description = "Shipper is checking your orders.",
        //            Status = OrderStatuses.OnChecking.ToString()
        //        };

        //        _db.OrderStatuses.Add(newOrderStatus);

        //        var order = _db.Orders.GetAll().Where(o => o.Id == orderId).FirstOrDefault();
        //        order.ShipperId = shipperId;

        //        return newOrderStatus.Id;
        //    }
        //    else
        //    {
        //        throw new NotFoundException(string.Format(InvalidConstant.InvalidDelivery, orderId.ToString()));
        //    }
        //}

        public OrderDetailResponse GetOrderDetail(Guid id, ContextDto contextDto)
        {
            var cartIds = _db.OrderDetails.GetAll(true)
                                .Where(od => od.OrderId == id)
                                .WhereIf(!contextDto.UserRoles.Contains("Admin"), od => od.Order.UserId == contextDto.UserId)
                                .Select(od => od.CartId);

            var result = _db.Orders.GetAll(true)
                            .Where(o => o.Id == id)
                            .WhereIf(!contextDto.UserRoles.Contains("Admin"), o => o.UserId == contextDto.UserId)
                            .Select(o => new OrderDetailResponse
                            {
                                Id = o.Id,
                                Statuses = _db.OrderStatuses.GetAll(true)
                                    .Where(os => os.OrderId == o.Id)
                                    .OrderByDescending(os => os.CreatedAt)
                                    .Select(os => new OrderStatusResponse
                                    {
                                        Id = os.Id,
                                        Status = _colorService.GetOrderStatusColor(os.Status),
                                        CreatedAt = (DateTime)os.CreatedAt
                                    }).ToList(),
                                Destination = o.Destination,
                                Description = o.Description,
                                User = _db.Users.GetAll(true).Where(u => u.Id == o.UserId)
                                        .Select(u => new UserResponseDto
                                        {
                                            Id = u.Id,
                                            UserName = u.UserName,
                                            FullName = u.FullName,
                                            Avatar = u.Avatar,
                                            Email = u.Email,
                                            PhoneNumber = u.PhoneNumber,
                                        }).FirstOrDefault(),
                                Product = _db.Carts.GetAll(true)
                                            .Where(c => cartIds.Contains(c.Id))
                                            .Select(c => new OrderProduct
                                            {
                                                Id = c.ProductId,
                                                Images= c.Product.Images,
                                                Name= c.Product.Name,
                                                Price = c.Product.Price * c.Quantity,
                                                Quantity = c.Quantity,
                                                CanComment = c.CanComment
                                            }).ToList(),
                                PaymentMethod = o.PaymentMethod,
                                Sum = o.MerchandiseSubtotal
                            }).FirstOrDefault();

            return result;
        }

        public PaginationDto<OrderResponseViewRequestDto> ViewOrders(ViewUserOrdersRequestDto viewUserOrdersRequest, ContextDto contextDto)
        {
            var orders = _db.OrderStatuses.GetAll(true)
                            .GroupBy(os => new { os.OrderId})
                            .Select(os => os.OrderByDescending(os => os.CreatedAt).FirstOrDefault())
                            .ToList();

            var orderIds = viewUserOrdersRequest.Status != OrderStatuses.All
                            ? orders.Where(o => o.Status == viewUserOrdersRequest.Status.ToString())
                                    .Select(o => o.OrderId)
                                    .ToList()
                            : orders.Select(o => o.OrderId)
                                    .ToList();

            var result = _db.Orders.GetAll(true)
                            .Where(o => orderIds.Contains(o.Id))
                            .WhereIf(!contextDto.UserRoles.Contains("Admin"), o => o.UserId == contextDto.UserId)
                            .WhereIf(!(Guid.Empty == viewUserOrdersRequest.OrderId), o => o.Id == viewUserOrdersRequest.OrderId)
                            .OrderByDescending(o => o.CreatedAt)
                            .Select(o => new OrderResponseViewRequestDto
                            {
                                Id = o.Id,
                                Description = o.Description,
                                User = _db.Users.GetAll(true).Where(u => u.Id == o.UserId)
                                        .Select(u => new UserResponseDto
                                        {
                                            Id = u.Id,
                                            UserName = u.UserName,
                                            FullName = u.FullName,
                                            Avatar = u.Avatar,
                                            Email = u.Email,
                                            PhoneNumber = u.PhoneNumber,
                                        }).FirstOrDefault(),
                                Statuses = _db.OrderStatuses.GetAll(true)
                                    .Where(os => os.OrderId == o.Id)
                                    .OrderByDescending(os => os.CreatedAt)
                                    .Select(os => new OrderStatusResponse
                                    {
                                        Id = os.Id,
                                        Status = _colorService.GetOrderStatusColor(os.Status),
                                        CreatedAt = (DateTime)os.CreatedAt
                                    }).ToList(),
                                Sum = o.MerchandiseSubtotal
                            }).Paginate(viewUserOrdersRequest.PageIndex, viewUserOrdersRequest.PageSize);

            for(int i = 0; i < result.Items.Count; i++)
            {
                var productIds = _db.Carts.GetAll(true)
                                    .Where(c => c.OrderDetail.OrderId == result.Items[i].Id)
                                    .Select(c => c.ProductId)
                                    .ToList();

                result.Items[i].Products = _db.Carts.GetAll(true)
                                            .Where(c => productIds.Contains(c.ProductId))
                                            .WhereIf(!contextDto.UserRoles.Contains("Admin"), o => o.UserId == contextDto.UserId)
                                            .Select(c => new ProductResponseDto
                                            {
                                                Id = c.ProductId,
                                                Name = c.Product.Name,
                                                Images = c.Product.Images,
                                                Quantity = c.Quantity,
                                                Price = c.Quantity * c.Product.Price
                                            }).ToList();
            }

            return result;
        }

        public List<string> GetStatuses()
        {
            var result = Enum.GetValues(typeof(OrderStatuses)).Cast<OrderStatuses>().Select(x => x.ToString()).ToList();
            
            return result;
        }

        public Guid UpdateStatusOrder(OrderUpdateStatusRequestDto orderUpdateStatusRequestDto)
        {
            var orderStatus = _db.OrderStatuses.GetAll(true)
                            .Where(os => os.OrderId == orderUpdateStatusRequestDto.Id)
                            .OrderByDescending(os => os.CreatedAt)
                            .FirstOrDefault();

            var id = Guid.Empty;

            if(orderStatus == null)
            {
                throw new NotFoundException($"Order is not found with {orderUpdateStatusRequestDto.Id}");
            }

            switch (orderUpdateStatusRequestDto.OrderStatuses)
            {
                case OrderStatuses.PendingForPreparation:
                {
                    id = UpdatePendingForPreparationStatus(orderStatus);
                    break;
                }

                case OrderStatuses.DeliveredToTransporter:
                {
                    id = UpdateDeliveredToTransporterStatus(orderStatus);
                    break;
                }

                case OrderStatuses.OnDelivering:
                {
                    id = UpdateOnDeliveringStatus(orderStatus);
                    break;
                }

                case OrderStatuses.Sentback:
                {
                    id = UpdateSentbackStatus(orderStatus);
                    break;
                }

                case OrderStatuses.PendingForReturn:
                {
                    id = UpdatePendingForReturnStatus(orderStatus);
                    break;
                }

                case OrderStatuses.Cancel:
                {
                    id = UpdateCancelStatus(orderStatus);
                    break;
                }

                case OrderStatuses.Success:
                {
                    id = UpdateSuccessStatus(orderStatus);

                    var cartIds = _db.Carts.GetAll(true)
                                .Where(c => c.OrderDetail.OrderId == orderUpdateStatusRequestDto.Id)
                                .Select(c => c.Id);

                    foreach (var cartId in cartIds)
                    {
                        var cart = _db.Carts.GetAll()
                                    .Where(c => c.Id == cartId)
                                    .FirstOrDefault();
                        cart.CanComment = true;

                        // Count total of product is sold
                        var product = _db.Products.GetAll()
                                        .Where(p => p.Id == cart.ProductId)
                                        .FirstOrDefault();
                        product.NumberOfSold += cart.Quantity;

                        _db.SaveChanges();
                    }

                    break;
                }

                default:
                {
                    break;
                }
            }

            return id;
        }

        private Guid UpdateSuccessStatus(OrderStatus orderStatus)
        {
            if (orderStatus.Status == OrderStatuses.OnDelivering.ToString())
            {
                var newOrderStatus = new OrderStatus
                {
                    OrderId = orderStatus.OrderId,
                    Description = StatusesConstant.SuccessDescription,
                    Status = OrderStatuses.Success.ToString()
                };

                _db.OrderStatuses.Add(newOrderStatus);

                return newOrderStatus.Id;
            }

            throw new ForbiddenException($"Order's status is not being delivered.");
        }

        private Guid UpdateCancelStatus(OrderStatus orderStatus)
        {
            if (orderStatus.Status == OrderStatuses.PendingForConfirm.ToString())
            {
                var newOrderStatus = new OrderStatus
                {
                    OrderId = orderStatus.OrderId,
                    Description = StatusesConstant.CancelDescription,
                    Status = OrderStatuses.Cancel.ToString()
                };

                _db.OrderStatuses.Add(newOrderStatus);

                // Update quantity of products when cancelling orders
                var carts = _db.Carts.GetAll(true).Where(c => c.OrderDetail.OrderId == orderStatus.OrderId)
                                .Select(c => new CartResponseDto
                                {
                                    ProductId = c.ProductId,
                                    Quantity = c.Quantity,
                                }).ToList();

                foreach (var cart in carts)
                {
                    var product = _db.Products.GetAll().Where(p => p.Id == cart.ProductId).FirstOrDefault();
                    product.Quantity += cart.Quantity;
                }

                return newOrderStatus.Id;
            }

            throw new ForbiddenException($"Order's status is not pending for confirm.");
        }

        private Guid UpdatePendingForReturnStatus(OrderStatus orderStatus)
        {
            if (orderStatus.Status == OrderStatuses.OnDelivering.ToString())
            {
                var newOrderStatus = new OrderStatus
                {
                    OrderId = orderStatus.OrderId,
                    Description = StatusesConstant.PendingForReturnDescription,
                    Status = OrderStatuses.PendingForReturn.ToString()
                };

                _db.OrderStatuses.Add(newOrderStatus);

                return newOrderStatus.Id;
            }

            throw new ForbiddenException($"Order's status is not being delivered.");
        }

        private Guid UpdateSentbackStatus(OrderStatus orderStatus)
        {
            if (orderStatus.Status == OrderStatuses.OnDelivering.ToString())
            {
                var newOrderStatus = new OrderStatus
                {
                    OrderId = orderStatus.OrderId,
                    Description = StatusesConstant.SentBackDescription,
                    Status = OrderStatuses.Sentback.ToString()
                };

                _db.OrderStatuses.Add(newOrderStatus);

                return newOrderStatus.Id;
            }

            throw new ForbiddenException($"Order's status is not being delivered.");
        }

        private Guid UpdateOnDeliveringStatus(OrderStatus orderStatus)
        {
            if (orderStatus.Status == OrderStatuses.DeliveredToTransporter.ToString())
            {
                var newOrderStatus = new OrderStatus
                {
                    OrderId = orderStatus.OrderId,
                    Description = StatusesConstant.OnDeliveringDescription,
                    Status = OrderStatuses.OnDelivering.ToString()
                };

                _db.OrderStatuses.Add(newOrderStatus);

                return newOrderStatus.Id;
            }

            throw new ForbiddenException($"Order's status is not delivered to transporter.");
        }

        private Guid UpdatePendingForPreparationStatus(OrderStatus? orderStatus)
        {
            if (orderStatus.Status == OrderStatuses.PendingForConfirm.ToString())
            {
                var newOrderStatus = new OrderStatus
                {
                    OrderId = orderStatus.OrderId,
                    Description = StatusesConstant.PendingForPreparationDescription,
                    Status = OrderStatuses.PendingForPreparation.ToString()
                };

                _db.OrderStatuses.Add(newOrderStatus);

                return newOrderStatus.Id;
            }

            throw new ForbiddenException($"Order's status is not Pending for confirm.");
        }

        private Guid UpdateDeliveredToTransporterStatus(OrderStatus? orderStatus)
        {
            if (orderStatus.Status == OrderStatuses.PendingForPreparation.ToString())
            {
                var newOrderStatus = new OrderStatus
                {
                    OrderId = orderStatus.OrderId,
                    Description = StatusesConstant.DeliveredToTransporterDescription,
                    Status = OrderStatuses.DeliveredToTransporter.ToString()
                };

                _db.OrderStatuses.Add(newOrderStatus);

                return newOrderStatus.Id;
            }

            throw new ForbiddenException($"Order's status is not Pending for preparation.");
        }

        public Guid CancelOrder(Guid id)
        {
            var orderStatus = _db.OrderStatuses.GetAll(true)
                            .Where(os => os.OrderId == id)
                            .OrderByDescending(os => os.CreatedAt)
                            .FirstOrDefault();

            if (orderStatus != null)
            {
                if (orderStatus.Status == OrderStatuses.PendingForConfirm.ToString())
                {
                    var newOrderStatus = new OrderStatus
                    {
                        OrderId = orderStatus.OrderId,
                        Description = StatusesConstant.CancelDescription,
                        Status = OrderStatuses.Cancel.ToString()
                    };

                    _db.OrderStatuses.Add(newOrderStatus);

                    // Update quantity of products when cancelling orders
                    var carts = _db.Carts.GetAll(true).Where(c => c.OrderDetail.OrderId == id)
                                    .Select(c => new CartResponseDto
                                    {
                                        ProductId = c.ProductId,
                                        Quantity = c.Quantity,
                                    }).ToList();

                    foreach(var cart in carts)
                    {
                        var product = _db.Products.GetAll().Where(p => p.Id == cart.ProductId).FirstOrDefault();
                        product.Quantity += cart.Quantity;
                    }

                    return newOrderStatus.Id;
                }

                throw new ForbiddenException($"Admin confirmed this order with id {id}");
            }

            throw new NotFoundException($"Order not found with id {id}");
        }
    }
}
