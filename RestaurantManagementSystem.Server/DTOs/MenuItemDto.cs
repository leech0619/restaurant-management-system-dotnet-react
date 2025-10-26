using System.ComponentModel.DataAnnotations;

namespace RestaurantManagementSystem.DTOs
{
    /// <summary>
    /// DTO for creating or updating a menu item
    /// </summary>
 public class MenuItemDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

  [StringLength(500)]
     public string Description { get; set; } = string.Empty;

        [Required]
    [StringLength(50)]
 public string Category { get; set; } = string.Empty;

        [Required]
   [Range(0.01, 10000)]
  public decimal Price { get; set; }

   public bool IsAvailable { get; set; } = true;

   public string? ImageUrl { get; set; }
    }
}
