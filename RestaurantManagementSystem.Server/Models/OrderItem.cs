namespace RestaurantManagementSystem.Models
{
    /// <summary>
    /// Represents a single menu item within an order
/// Links an Order to a MenuItem with quantity and price information
    /// </summary>
    public class OrderItem
    {
  /// <summary>
        /// Unique identifier for the order item
        /// </summary>
        public int Id { get; set; }

   /// <summary>
        /// Foreign key to the parent order
        /// </summary>
   public int OrderId { get; set; }

 /// <summary>
        /// Foreign key to the menu item being ordered
        /// </summary>
  public int MenuItemId { get; set; }

/// <summary>
   /// Number of units of this menu item ordered
   /// </summary>
 public int Quantity { get; set; }

        /// <summary>
        /// Price per unit at the time of order (snapshot of MenuItem.Price)
      /// </summary>
  public decimal UnitPrice { get; set; }

    /// <summary>
/// Total price for this line item (Quantity * UnitPrice)
        /// </summary>
        public decimal Subtotal { get; set; }

        // Navigation properties
 /// <summary>
        /// The order this item belongs to
        /// </summary>
        public virtual Order? Order { get; set; }

        /// <summary>
        /// The menu item being ordered
        /// </summary>
      public virtual MenuItem? MenuItem { get; set; }
    }
}
