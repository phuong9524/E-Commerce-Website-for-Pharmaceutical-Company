using Medicine.Domain.Dto;
using Medicine.Domain.Dto.CartDto;
using Medicine.Domain.Dto.ManagementDto;
using Medicine.Domain.Enums;
using Medicine.Domain.Exceptions;
using Medicine.Domain.Extensions;
using Medicine.Domain.Repository.Interfaces;
using Medicine.Domain.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Medicine.Domain.Services
{
    public class ManagementService : IManagementService
    {
        private readonly IUnitOfWork _db;
        private readonly IColorService _colorService;

        public ManagementService(IUnitOfWork db, IColorService colorService)
        {
            _db = db;
            _colorService = colorService;
        }

        public PaginationDto<CustomerResponseDto> GetCustomers(CustomerRequestDto customerRequestDto)
        {
            var orderStatuses = _db.OrderStatuses.GetAll(true)
                            .GroupBy(os => new { os.OrderId })
                            .Select(os => os.OrderByDescending(os => os.CreatedAt).FirstOrDefault())
                            .ToList();

            var successOrderIds = orderStatuses.Where(os => os.Status == OrderStatuses.Success.ToString())
                                    .Select(os => os.OrderId)
                                    .ToList();

            var cartIds = _db.OrderDetails.GetAll(true)
                            .Where(o => successOrderIds.Contains(o.OrderId))
                            .Select(o => o.CartId).ToList();

            var result = _db.Users.GetAll(true)
                            .Where(u => u.Roles.Count == 0)
                            .Select(u => new CustomerResponseDto
                            {
                                Id = u.Id,
                                Email = u.Email,
                                Address = u.Address,
                                Avatar  = u.Avatar,
                                CreatedAt = (DateTime)u.CreatedAt,
                                FullName = u.FullName,
                                PhoneNumber = u.PhoneNumber,
                                LastLogin = u.LastLogIn,
                                Orders = _db.Orders.GetAll(true)
                                        .Count(o => o.UserId == u.Id),
                                SumMoney = _db.OrderDetails.GetAll(true)
                                            .Where(od => od.Cart.UserId == u.Id)
                                            .Where(od => cartIds.Contains(od.CartId))
                                            .Sum(od => od.Order.MerchandiseSubtotal)
                            })
                            .OrderByDescending(u => u.SumMoney)
                            .Paginate(customerRequestDto.PageIndex, customerRequestDto.PageSize);

            return result;
        }

        public PaginationDto<EmployeeResponseDto> GetEmployees(EmployeesRequestDto employeesRequestDto)
        {
            var result = _db.Users.GetAll(true)
                            .Where(u => u.Roles.Count > 0)
                            .WhereIf(!string.IsNullOrEmpty(employeesRequestDto.Role), u => u.Roles.Any(ur => ur.Role.Contains(employeesRequestDto.Role)))
                            .Select(u => new EmployeeResponseDto
                            {
                                Id = u.Id,
                                Email = u.Email,
                                Address = u.Address,
                                Avatar = u.Avatar,
                                CreatedAt = (DateTime)u.CreatedAt,
                                UserName = u.UserName,
                                FullName = u.FullName,
                                PhoneNumber = u.PhoneNumber,
                                LastLogIn = u.LastLogIn,
                                Roles = u.Roles.Select(ur => ur.Role).ToList()
                            })
                            .Paginate(employeesRequestDto.PageIndex, employeesRequestDto.PageSize);

            return result;
        }

        public SaleResponseDto GetSales(SaleRequestDto saleRequestDto)
        {
            var orderStatuses = _db.OrderStatuses.GetAll(true)
                            .GroupBy(os => new { os.OrderId })
                            .Select(os => os.OrderByDescending(os => os.CreatedAt).FirstOrDefault())
                            .ToList();

            var successOrderIds = orderStatuses.Where(os => os.Status == OrderStatuses.Success.ToString())
                                    .Select(os => os.OrderId)
                                    .ToList();

            var result = _db.OrderDetails.GetAll(true)
                            .Where(od => successOrderIds.Contains(od.OrderId))
                            .Where(od => saleRequestDto.FromDate <= od.CreatedAt && od.CreatedAt <= saleRequestDto.ToDate)
                            .Select(od => new CartResponseDto
                            {
                                Id = od.Id,
                                ProductId = od.Cart.ProductId,
                                ProductName = od.Cart.Product.Name,
                                Quantity = od.Cart.Quantity,
                                Price = od.Cart.Quantity * od.Cart.Product.Price,
                                Images = od.Cart.Product.Images
                            }).Paginate(saleRequestDto.PageIndex, saleRequestDto.PageSize);

            var saleResponse = new SaleResponseDto
            {
                Carts = result,
                CurrentPageSum = result.Items.Sum(r => r.Price),
                AllSum = _db.OrderDetails.GetAll(true)
                            .Where(od => successOrderIds.Contains(od.OrderId))
                            .Sum(od => od.Cart.Quantity * od.Cart.Product.Price)
            };

            return saleResponse;
        }

        public StatisticCustomersResponseDto GetStatisticCustomers()
        {
            DateTime now = DateTime.Now;
            var currentStartDate = new DateTime(now.Year, now.Month, 1);
            var currentEndDate = currentStartDate.AddMonths(1).AddDays(-1);
            var lastMonthStartDate = currentStartDate.AddMonths(-1);
            var lastMonthEndDate = currentStartDate.AddDays(-1);

            var statisticCustomer = _db.Users.GetAll(true)
                                        .Where(u => u.Roles.Count == 0 && !u.IsDeleted);

            var result = new StatisticCustomersResponseDto()
            {
                Customer = new Customer
                {
                    TotalCustomer = statisticCustomer.Count(),
                    TotalCustomerLastMonth = statisticCustomer
                                                .Where(u => currentStartDate <= u.CreatedAt && u.CreatedAt <= currentEndDate)
                                                .Count(),
                    TotalCustomerThisMonth = statisticCustomer
                                                .Where(u => lastMonthStartDate <= u.CreatedAt && u.CreatedAt <= lastMonthEndDate)
                                                .Count(),
                }
            };

            return result;
        }

        public StatisticProductsResponseDto GetStatisticProducts()
        {
            var productSales = _db.Products.GetAll(true).Select(p => p.NumberOfSold).ToList();
            var totalSales = 0;

            foreach ( var productSale in productSales)
            {
                totalSales += productSale;
            }

            var result = new StatisticProductsResponseDto()
                            {
                                Product = new StatisticProduct
                                {
                                    TotalSales = totalSales,
                                    TopProductSales = _db.Products.GetAll(true)
                                                        .OrderByDescending(p => p.NumberOfSold)
                                                            .ThenByDescending(p => p.UpdatedAt)
                                                        .Take(3)
                                                        .Select(p => new TopProductSales
                                                        {
                                                            Id = p.Id,
                                                            NameProduct = p.Name,
                                                            TotalSales = p.NumberOfSold
                                                        }).ToList()
                                }
                            };

            return result;
        }

        public StatisticOrdersResponseDto GetStatisticOrders()
        {
            var orderStatuses = _db.OrderStatuses.GetAll(true)
                            .GroupBy(os => new { os.OrderId })
                            .Select(os => os.OrderByDescending(os => os.CreatedAt).FirstOrDefault())
                            .ToList();

            var successOrderIds = orderStatuses.Where(os => os.Status == OrderStatuses.Success.ToString())
                                    .Select(os => os.OrderId)
                                    .ToList();

            var cartIds = _db.OrderDetails.GetAll(true)
                            .Where(o => successOrderIds.Contains(o.OrderId))
                            .Select(o => o.CartId).ToList();

            DateTime now = DateTime.Now;
            var firstDateThisYear = new DateTime(now.Year, 1, 1);
            var lastDateThisYear = new DateTime(now.Year, 12, 31);
            var firstDateLastYear = new DateTime(now.Year - 1, 1, 1);
            var lastDateLastYear = new DateTime(now.Year - 1, 12, 31);

            // Get months next year
            var firstDateJanNextYear = new DateTime(now.Year + 1, 1, 1);

            // Get months this year
            var firstDateJanThisYear = new DateTime(now.Year, 1, 1);
            var firstDateMarThisYear = new DateTime(now.Year, 3, 1);
            var firstDateFebThisYear = new DateTime(now.Year, 2, 1);
            var firstDateAprThisYear = new DateTime(now.Year, 4, 1);
            var firstDateMayThisYear = new DateTime(now.Year, 5, 1);
            var firstDateJunThisYear = new DateTime(now.Year, 6, 1);
            var firstDateJulThisYear = new DateTime(now.Year, 7, 1);
            var firstDateAugThisYear = new DateTime(now.Year, 8, 1);
            var firstDateSepThisYear = new DateTime(now.Year, 9, 1);
            var firstDateOctThisYear = new DateTime(now.Year, 10, 1);
            var firstDateNovThisYear = new DateTime(now.Year, 11, 1);
            var firstDateDecThisYear = new DateTime(now.Year, 12, 1);

            // Get months last year
            var firstDateJanLastYear = new DateTime(now.Year - 1, 1, 1);
            var firstDateMarLastYear = new DateTime(now.Year - 1, 3, 1);
            var firstDateFebLastYear = new DateTime(now.Year - 1, 2, 1);
            var firstDateAprLastYear = new DateTime(now.Year - 1, 4, 1);
            var firstDateMayLastYear = new DateTime(now.Year - 1, 5, 1);
            var firstDateJunLastYear = new DateTime(now.Year - 1, 6, 1);
            var firstDateJulLastYear = new DateTime(now.Year - 1, 7, 1);
            var firstDateAugLastYear = new DateTime(now.Year - 1, 8, 1);
            var firstDateSepLastYear = new DateTime(now.Year - 1, 9, 1);
            var firstDateOctLastYear = new DateTime(now.Year - 1, 10, 1);
            var firstDateNovLastYear = new DateTime(now.Year - 1, 11, 1);
            var firstDateDecLastYear = new DateTime(now.Year - 1, 12, 1);

            var totalSalesThisYear = _db.Carts.GetAll(true)
                                .Where(c => cartIds.Contains(c.Id))
                                .Where(c => firstDateThisYear <= c.CreatedAt && c.CreatedAt <= lastDateThisYear)
                                    .Include(c => c.Product)
                                .ToList();

            var totalSalesLastYear = _db.Carts.GetAll(true)
                                .Where(c => cartIds.Contains(c.Id))
                                .Where(c => firstDateLastYear <= c.CreatedAt && c.CreatedAt <= lastDateLastYear)
                                    .Include(c => c.Product)
                                .ToList();

            var result = new StatisticOrdersResponseDto
            {
                TotalEmployees = _db.Users.GetAll(true)
                                    .Where(u => u.Roles.Count > 0)
                                    .Count(),

                Order = new StatisticOrdersDto()
                {
                    totalOrderSuccess = orderStatuses.Where(os => os.Status == OrderStatuses.Success.ToString())
                                            .Count(),
                    TotalSum = _db.Carts.GetAll(true)
                                .Where(c => cartIds.Contains(c.Id))
                                .Select(c => c.Quantity * c.Product.Price)
                                .Sum(),
                    ProfitThisYear = new Profit
                    {
                        TotalSum = totalSalesThisYear.Select(x => x.Product.Price * x.Quantity).Sum(),
                        TotalSumEachMonth = new TotalSumEachMonth
                        {
                            Jan = totalSalesThisYear.Where(x => firstDateJanThisYear <= x.CreatedAt && x.CreatedAt <= firstDateFebThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Feb = totalSalesThisYear.Where(x => firstDateFebThisYear <= x.CreatedAt && x.CreatedAt <= firstDateMarThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Mar = totalSalesThisYear.Where(x => firstDateMarThisYear <= x.CreatedAt && x.CreatedAt <= firstDateAprThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Apr = totalSalesThisYear.Where(x => firstDateAprThisYear <= x.CreatedAt && x.CreatedAt <= firstDateMayThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            May = totalSalesThisYear.Where(x => firstDateMayThisYear <= x.CreatedAt && x.CreatedAt <= firstDateJunThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Jun = totalSalesThisYear.Where(x => firstDateJunThisYear <= x.CreatedAt && x.CreatedAt <= firstDateJulThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Jul = totalSalesThisYear.Where(x => firstDateJulThisYear <= x.CreatedAt && x.CreatedAt <= firstDateAugThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Aug = totalSalesThisYear.Where(x => firstDateAugThisYear <= x.CreatedAt && x.CreatedAt <= firstDateSepThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Sep = totalSalesThisYear.Where(x => firstDateSepThisYear <= x.CreatedAt && x.CreatedAt <= firstDateOctThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Oct = totalSalesThisYear.Where(x => firstDateOctThisYear <= x.CreatedAt && x.CreatedAt <= firstDateNovThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Nov = totalSalesThisYear.Where(x => firstDateNovThisYear <= x.CreatedAt && x.CreatedAt <= firstDateDecThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Dec = totalSalesThisYear.Where(x => firstDateDecThisYear <= x.CreatedAt && x.CreatedAt <= firstDateJanNextYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                        }
                    },
                    ProfitLastYear = new Profit
                    {
                        TotalSum = totalSalesLastYear.Select(x => x.Product.Price * x.Quantity).Sum(),
                        TotalSumEachMonth = new TotalSumEachMonth
                        {
                            Jan = totalSalesLastYear.Where(x => firstDateJanLastYear <= x.CreatedAt && x.CreatedAt <= firstDateFebLastYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Feb = totalSalesLastYear.Where(x => firstDateFebLastYear <= x.CreatedAt && x.CreatedAt <= firstDateMarLastYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Mar = totalSalesLastYear.Where(x => firstDateMarLastYear <= x.CreatedAt && x.CreatedAt <= firstDateAprLastYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Apr = totalSalesLastYear.Where(x => firstDateAprLastYear <= x.CreatedAt && x.CreatedAt <= firstDateMayLastYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            May = totalSalesLastYear.Where(x => firstDateMayLastYear <= x.CreatedAt && x.CreatedAt <= firstDateJunLastYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Jun = totalSalesLastYear.Where(x => firstDateJunLastYear <= x.CreatedAt && x.CreatedAt <= firstDateJulLastYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Jul = totalSalesLastYear.Where(x => firstDateJulLastYear <= x.CreatedAt && x.CreatedAt <= firstDateAugLastYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Aug = totalSalesLastYear.Where(x => firstDateAugLastYear <= x.CreatedAt && x.CreatedAt <= firstDateSepLastYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Sep = totalSalesLastYear.Where(x => firstDateSepLastYear <= x.CreatedAt && x.CreatedAt <= firstDateOctLastYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Oct = totalSalesLastYear.Where(x => firstDateOctLastYear <= x.CreatedAt && x.CreatedAt <= firstDateNovLastYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Nov = totalSalesLastYear.Where(x => firstDateNovLastYear <= x.CreatedAt && x.CreatedAt <= firstDateDecLastYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                            Dec = totalSalesLastYear.Where(x => firstDateDecLastYear <= x.CreatedAt && x.CreatedAt <= firstDateJanThisYear)
                                    .Select(x => x.Product.Price * x.Quantity).Sum(),
                        }
                    },
                }
            };

            return result;
        }

        public void ModifyUser(ModifyUserRequestDto modifyUserRequestDto)
        {
            var user = _db.Users.GetAll(true)
                        .Where(u => u.Id == modifyUserRequestDto.Id)
                        .FirstOrDefault();

            if (user != null)
            {
                user.UserName= modifyUserRequestDto.UserName;
                user.FullName = modifyUserRequestDto.FullName;
                user.Email = modifyUserRequestDto.Email;
                user.Password = modifyUserRequestDto.Password;
                user.Address = modifyUserRequestDto.Address;
                user.PhoneNumber = modifyUserRequestDto.PhoneNumber;
                user.Avatar = modifyUserRequestDto.Avatar;

                return;
            }

            throw new NotFoundException($"User is not found with id {modifyUserRequestDto.Id}");
        }
    }
}
