namespace Medicine.Domain.Enums
{
    public enum OrderStatuses
    {
        PendingForConfirm, // Cho admin xac nhan
        PendingForPreparation, // Admin dang chuan bi
        DeliveredToTransporter, // Giao cho don vi van chuyen
        OnDelivering, // Dang van chuyen
        Sentback, // Tra hang
        PendingForReturn, // Giao vao ngay khac
        Cancel, // Huy don
        Success, // Giao thanh cong
        All,
    }
}
