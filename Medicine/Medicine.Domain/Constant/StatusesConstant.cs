namespace Medicine.Domain.Constant
{
    public static class StatusesConstant
    {
        public const string PendingForConfirm = "Pending for confirm";

        public const string PendingForPreparation = "Pending for preparation";

        public const string OnChecking = "Shipper is checking your orders";

        public const string PendingForPreparationDescription = "Your order is confirmed and being prepared.";

        public const string DeliveredToTransporterDescription = "Your order is delivered to transporter.";

        public const string OnDeliveringDescription = "Your order is being delivered.";

        public const string SentBackDescription = "Your order is sent back.";

        public const string PendingForReturnDescription = "Your order is pending for return.";

        public const string CancelDescription = "Your order is canceled.";

        public const string SuccessDescription = "Your order is delivered successfully.";
    }
}
