namespace RestaurantManagementSystem.Models
{
    /// <summary>
    /// Represents the status of an order in its lifecycle
    /// </summary>
    public enum OrderStatus
    {
        Pending,      // Order has been placed but not yet processed
        InProgress,   // Order is being prepared
        Served,       // Order has been served to the customer
        Completed     // Order is complete and paid for
    }

    /// <summary>
  /// Represents a customer's order
  /// </summary>
    public class Order
    {
        /// <summary>
        /// Unique identifier for the order
  /// </summary>
        public int Id { get; set; }

        /// <summary>
/// Foreign key to the customer who placed the order
        /// </summary>
        public string CustomerId { get; set; } = string.Empty;

        /// <summary>
        /// Total amount for the order in dollars
   /// </summary>
     public decimal TotalAmount { get; set; }

        /// <summary>
  /// Current status of the order
    /// </summary>
    public OrderStatus Status { get; set; } = OrderStatus.Pending;

        /// <summary>
        /// Date and time when the order was created
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        /// <summary>
        /// The customer who placed this order
        /// </summary>
        public virtual ApplicationUser? Customer { get; set; }

        /// <summary>
   /// Collection of items in this order
   /// </summary>
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
