using Microsoft.AspNetCore.Identity;

namespace RestaurantManagementSystem.Models
{
    /// <summary>
    /// Custom user model that extends ASP.NET Core Identity's IdentityUser
    /// Used for authentication and authorization across Admin, Staff, and Customer roles
    /// </summary>
    public class ApplicationUser : IdentityUser
    {
        /// <summary>
 /// Full name of the user (e.g., "John Doe")
     /// </summary>
        public string FullName { get; set; } = string.Empty;

        /// <summary>
  /// Date and time when the user account was created
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

     /// <summary>
        /// Navigation property for orders placed by this user (if customer)
     /// </summary>
        public virtual ICollection<Order>? Orders { get; set; }
    }
}
