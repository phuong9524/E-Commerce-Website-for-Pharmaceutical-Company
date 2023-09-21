using Medicine.Domain.Dto;
using Medicine.Domain.Dto.CartDto;

namespace Medicine.Domain.Services.Interfaces
{
    public interface ICartService
    {
        PaginationDto<CartResponseDto> GetMyCarts(BasePaginationRequestDto paginationRequestDto, ContextDto context);

        Guid AddProduct(CartAddingProductDto cartAddingProduct, ContextDto context);

        Guid ModifyCart(CartModificationDto cartModification, ContextDto context);

        void DeleteCart(Guid cartId, ContextDto context);

        Guid ConfirmCart(CartConfirmDto cartConfirm, ContextDto context);
    }
}
