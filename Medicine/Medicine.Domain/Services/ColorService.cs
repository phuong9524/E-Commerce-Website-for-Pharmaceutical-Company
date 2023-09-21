using Medicine.Domain.Dto.ColorDto;
using Medicine.Domain.Enums;
using Medicine.Domain.Services.Interfaces;

namespace Medicine.Domain.Services
{
    public class ColorService : IColorService
    {
        public ColorResponseDto GetOrderStatusColor(string status)
        {
            if(status.Equals(OrderStatuses.PendingForConfirm.ToString()))
            {
                return new ColorResponseDto
                {
                    Status = "Pending for confirm"
                };
            }
            else if (status.Equals(OrderStatuses.PendingForPreparation.ToString()))
            {
                return new ColorResponseDto
                {
                    Status = "Pending for preparation"
                };
            }
            else if (status.Equals(OrderStatuses.DeliveredToTransporter.ToString()))
            {
                return new ColorResponseDto
                {
                    Status = "Delivered to transporter"
                };
            }
            else if (status.Equals(OrderStatuses.OnDelivering.ToString()))
            {
                return new ColorResponseDto
                {
                    Status = "On delivering"
                };
            }
            else if (status.Equals(OrderStatuses.Sentback.ToString()))
            {
                return new ColorResponseDto
                {
                    Status = "Sent back"
                };
            }
            else if (status.Equals(OrderStatuses.PendingForReturn.ToString()))
            {
                return new ColorResponseDto
                {
                    Status = "Pending for return"
                };
            }
            else if (status.Equals(OrderStatuses.Success.ToString()))
            {
                return new ColorResponseDto
                {
                    Status = "Success"
                };
            }
            else if (status.Equals(OrderStatuses.Cancel.ToString()))
            {
                return new ColorResponseDto
                {
                    Status = "Cancel"
                };
            }

            return null;
        }
    }
}
