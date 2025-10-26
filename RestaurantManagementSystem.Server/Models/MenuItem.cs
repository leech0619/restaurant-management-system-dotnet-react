namespace RestaurantManagementSystem.Models
{
    /// <summary>
    /// Represents a food or drink item available in the restaurant menu
    /// </summary>
    public class MenuItem
    {
        /// <summary>
    /// Unique identifier for the menu item
        /// </summary>
 public int Id { get; set; }

        /// <summary>
 /// Name of the menu item (e.g., "Margherita Pizza")
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Detailed description of the menu item
        /// </summary>
        public string Description { get; set; } = string.Empty;

        /// <summary>
  /// Category of the item (e.g., "Main Course", "Dessert", "Beverage")
        /// </summary>
        public string Category { get; set; } = string.Empty;

     /// <summary>
/// Price of the menu item in dollars
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
 /// Indicates whether the item is currently available for ordering
     /// </summary>
        public bool IsAvailable { get; set; } = true;

      /// <summary>
        /// Date and time when the menu item was added
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Image URL for the menu item
        /// </summary>
        public string? ImageUrl { get; set; }

        /// <summary>
  /// Navigation property for order items that reference this menu item
        /// </summary>
 public virtual ICollection<OrderItem>? OrderItems { get; set; }
    }
}
