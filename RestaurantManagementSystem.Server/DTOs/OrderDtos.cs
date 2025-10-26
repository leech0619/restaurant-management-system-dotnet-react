using System.ComponentModel.DataAnnotations;
using RestaurantManagementSystem.Models;

namespace RestaurantManagementSystem.DTOs
{
 /// <summary>
    /// DTO for creating an order
    /// </summary>
    public class CreateOrderDto
    {
  [Required]
  public List<OrderItemDto> Items { get; set; } = new();
    }

    /// <summary>
    /// DTO for an item within an order
    /// </summary>
    public class OrderItemDto
  {
        [Required]
     public int MenuItemId { get; set; }

        [Required]
        [Range(1, 100)]
        public int Quantity { get; set; }
    }

    /// <summary>
    /// DTO for order response
    /// </summary>
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public string CustomerId { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public OrderStatus Status { get; set; }
      public DateTime CreatedAt { get; set; }
 public List<OrderItemResponseDto> Items { get; set; } = new();
    }

    /// <summary>
    /// DTO for order item response
    /// </summary>
    public class OrderItemResponseDto
    {
     public int Id { get; set; }
        public int MenuItemId { get; set; }
        public string MenuItemName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Subtotal { get; set; }
    }

  /// <summary>
    /// DTO for updating order status
    /// </summary>
    public class UpdateOrderStatusDto
    {
        [Required]
        public OrderStatus Status { get; set; }
    }
}
