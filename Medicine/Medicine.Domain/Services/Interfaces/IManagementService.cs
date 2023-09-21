using Medicine.Domain.Dto;
using Medicine.Domain.Dto.ManagementDto;

namespace Medicine.Domain.Services.Interfaces
{
    public interface IManagementService
    {
        PaginationDto<CustomerResponseDto> GetCustomers(CustomerRequestDto customerRequestDto);

        PaginationDto<EmployeeResponseDto> GetEmployees(EmployeesRequestDto employeesRequestDto);

        SaleResponseDto GetSales(SaleRequestDto saleRequestDto);

        StatisticCustomersResponseDto GetStatisticCustomers();

        StatisticProductsResponseDto GetStatisticProducts();

        StatisticOrdersResponseDto GetStatisticOrders();

        void ModifyUser(ModifyUserRequestDto modifyUserRequestDto);
    }
}
