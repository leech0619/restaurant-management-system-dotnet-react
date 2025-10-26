using System.ComponentModel.DataAnnotations;

namespace RestaurantManagementSystem.DTOs
{
    /// <summary>
    /// DTO for user registration
    /// </summary>
    public class RegisterDto
    {
      [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
     [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;

        [Required]
      [Compare("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;

    }

    /// <summary>
    /// DTO for user login
    /// </summary>
    public class LoginDto
    {
        [Required]
        [EmailAddress]
 public string Email { get; set; } = string.Empty;

     [Required]
        public string Password { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO for authentication response containing JWT token
    /// </summary>
    public class AuthResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? Token { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
  public string? Role { get; set; }
   public DateTime? ExpiresAt { get; set; }
    }
    public class ChangePasswordDto
 {
        [Required]
        public string CurrentPassword { get; set; } = string.Empty;

[Required]
 [MinLength(6)]
        public string NewPassword { get; set; } = string.Empty;

  [Required]
        [Compare("NewPassword")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
