//using Medicine.Domain.Dto.OrderDto;
//using Medicine.Domain.Dto;
//using Medicine.Domain.Dto.ShipperDto;
//using Medicine.Domain.Extensions;
//using Medicine.Domain.Repository.Interfaces;
//using Medicine.Domain.Services.Interfaces;
//using Medicine.DataAccess.Entites;
//using Medicine.Domain.Constant;
//using Medicine.Domain.Exceptions;
//using Medicine.Domain.Enum;

//namespace Medicine.Domain.Services
//{
//    public class ShipperService : IShipperService
//    {
//        private readonly IUnitOfWork _db;
//        private readonly IColorService _colorService;

//        public ShipperService(IUnitOfWork db, IColorService colorService)
//        {
//            _db = db;
//            _colorService = colorService;
//        }

//        public PaginationDto<OrderResponseViewRequestDto> GetAllOrders(ShipperRequestOrderDto shipperRequestOrderDto)
//        {
//            var result = _db.Orders.GetAll(true)
//                            .Where(o => o.ShipperId == shipperRequestOrderDto.ShipperId)
//                            .Select(o => new OrderResponseViewRequestDto
//                            {
//                                Id = o.Id,
//                                Destination = o.Destination,
//                                Statuses = _db.OrderStatuses.GetAll(true)
//                                    .Where(os => os.OrderId == o.Id)
//                                    .OrderByDescending(os => os.CreatedAt)
//                                    .Select(os => new OrderStatusResponse
//                                    {
//                                        Id = os.Id,
//                                        Status = _colorService.GetOrderStatusColor(os.Status),
//                                        CreatedAt = (DateTime)os.CreatedAt
//                                    }).ToList()
//                            }).Paginate(shipperRequestOrderDto.PageIndex, shipperRequestOrderDto.PageSize);

//            return result;
//        }

//        public PaginationDto<OrderResponseViewRequestDto> GetOrdersByStatus(ShipperRequestOrderDto shipperRequestOrderDto)
//        {
//            var orderStatuses = _db.OrderStatuses.GetAll(true)
//                            .Where(os => os.Order.ShipperId == shipperRequestOrderDto.ShipperId)
//                            .GroupBy(os => new { os.OrderId })
//                            .Select(os => os.OrderByDescending(os => os.CreatedAt).FirstOrDefault())
//                            .ToList();

//            var ordersIds = orderStatuses
//                            .Where(os => os.Status == shipperRequestOrderDto.Status.ToString())
//                            .Select(os => os.OrderId)
//                            .ToList();

//            var result = _db.Orders.GetAll(true)
//                            .Where(o => ordersIds.Contains(o.Id))
//                            .Select(o => new OrderResponseViewRequestDto
//                            {
//                                Id = o.Id,
//                                Destination = o.Destination,
//                                Statuses = _db.OrderStatuses.GetAll(true)
//                                    .Where(os => os.OrderId == o.Id)
//                                    .OrderByDescending(os => os.CreatedAt)
//                                    .Select(os => new OrderStatusResponse
//                                    {
//                                        Id = os.Id,
//                                        Status = _colorService.GetOrderStatusColor(os.Status),
//                                        CreatedAt = (DateTime)os.CreatedAt
//                                    }).ToList()
//                            }).Paginate(shipperRequestOrderDto.PageIndex, shipperRequestOrderDto.PageSize);

//            return result;
//        }

//        public Guid UpdateStatusOrder(UpdateStatusOrderDto updateStatusOrderDto)
//        {
//            var orderStatus = _db.OrderStatuses.GetAll(true)
//                            .Where(os => os.OrderId == updateStatusOrderDto.OrderId)
//                            .OrderByDescending(os => os.CreatedAt)
//                            .FirstOrDefault();

//            if (orderStatus.Status == OrderStatuses.OnChecking.ToString() 
//                && updateStatusOrderDto.Status == OrderStatuses.ConfirmedByShipper)
//            {
//                var newOrderStatus = new OrderStatus
//                {
//                    OrderId = orderStatus.OrderId,
//                    Description = updateStatusOrderDto.Description,
//                    Status = updateStatusOrderDto.Status.ToString()
//                };

//                _db.OrderStatuses.Add(newOrderStatus);

//                return newOrderStatus.Id;
//            }
//            else if (orderStatus.Status == OrderStatuses.ConfirmedByShipper.ToString() 
//                && (updateStatusOrderDto.Status == OrderStatuses.Failed
//                    || updateStatusOrderDto.Status == OrderStatuses.Success))
//            {
//                var newOrderStatus = new OrderStatus
//                {
//                    OrderId = orderStatus.OrderId,
//                    Description = updateStatusOrderDto.Description,
//                    Status = updateStatusOrderDto.Status.ToString()
//                };

//                if (updateStatusOrderDto.Status == OrderStatuses.Success)
//                {
//                    var carts = _db.Carts.GetAll()
//                        .Where(c => c.OrderDetail.OrderId == updateStatusOrderDto.OrderId);

//                    foreach(var cart in carts)
//                    {
//                        cart.CanComment = true;
//                    }
//                }

//                _db.OrderStatuses.Add(newOrderStatus);

//                return newOrderStatus.Id;
//            }
//            else if(orderStatus.Status == OrderStatuses.Failed.ToString() 
//                && (updateStatusOrderDto.Status == OrderStatuses.Sentback 
//                    || updateStatusOrderDto.Status == OrderStatuses.PendingForReturn))
//            {
//                var newOrderStatus = new OrderStatus
//                {
//                    OrderId = orderStatus.OrderId,
//                    Description = updateStatusOrderDto.Description,
//                    Status = updateStatusOrderDto.Status.ToString()
//                };

//                _db.OrderStatuses.Add(newOrderStatus);

//                return newOrderStatus.Id;
//            }
//            else
//            {
//                throw new NotFoundException(string.Format(InvalidConstant.InvalidDelivery, updateStatusOrderDto.OrderId.ToString()));
//            }
//        }
//    }
//}
