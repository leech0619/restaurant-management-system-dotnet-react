using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RestaurantManagementSystem.DTOs;
using RestaurantManagementSystem.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RestaurantManagementSystem.Controllers
{
    /// <summary>
    /// Handles user authentication including registration and login
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
  private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthController(
       UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration)
        {
 _userManager = userManager;
   _signInManager = signInManager;
 _configuration = configuration;
        }

      /// <summary>
      /// Register a new user (Admin, Staff, or Customer)
      /// </summary>
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto model)
        {
 if (!ModelState.IsValid)
            {
       return BadRequest(new AuthResponseDto
         {
              Success = false,
         Message = "Invalid registration data"
 });
            }

  // Check if user already exists
        var existingUser = await _userManager.FindByEmailAsync(model.Email);
        if (existingUser != null)
            {
      return BadRequest(new AuthResponseDto
      {
 Success = false,
    Message = "User with this email already exists"
         });
  }

       // Create new user
      var user = new ApplicationUser
            {
     UserName = model.Email,
          Email = model.Email,
           FullName = model.FullName,
     EmailConfirmed = true,
           CreatedAt = DateTime.UtcNow
   };

 var result = await _userManager.CreateAsync(user, model.Password);

    if (!result.Succeeded)
          {
     return BadRequest(new AuthResponseDto
    {
            Success = false,
 Message = string.Join(", ", result.Errors.Select(e => e.Description))
  });
      }

    // All new registrations are customers by default
         // Only admins can create staff/admin accounts through separate endpoint
         await _userManager.AddToRoleAsync(user, "Customer");

            // Generate JWT token
   var token = await GenerateJwtToken(user);

       return Ok(new AuthResponseDto
  {
    Success = true,
       Message = "Registration successful",
             Token = token,
       Email = user.Email,
      FullName = user.FullName,
            Role = "Customer",
     ExpiresAt = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:ExpirationInMinutes"]))
 });
        }

   /// <summary>
        /// Login with email and password
        /// </summary>
        [HttpPost("login")]
  public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto model)
        {
            if (!ModelState.IsValid)
 {
          return BadRequest(new AuthResponseDto
       {
         Success = false,
 Message = "Invalid login data"
          });
            }

            // Find user by email
         var user = await _userManager.FindByEmailAsync(model.Email);
         if (user == null)
      {
            return Unauthorized(new AuthResponseDto
     {
          Success = false,
   Message = "Invalid email or password"
             });
            }

          // Verify password
       var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
       if (!result.Succeeded)
 {
     return Unauthorized(new AuthResponseDto
      {
     Success = false,
          Message = "Invalid email or password"
       });
}

            // Get user role
            var roles = await _userManager.GetRolesAsync(user);
     var role = roles.FirstOrDefault() ?? "Customer";

 // Generate JWT token
   var token = await GenerateJwtToken(user);

            return Ok(new AuthResponseDto
            {
                Success = true,
         Message = "Login successful",
                Token = token,
  Email = user.Email,
       FullName = user.FullName,
   Role = role,
           ExpiresAt = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:ExpirationInMinutes"]))
      });
        }

        /// <summary>
        /// Generate JWT token for authenticated user
        /// </summary>
        private async Task<string> GenerateJwtToken(ApplicationUser user)
    {
            var roles = await _userManager.GetRolesAsync(user);

        var claims = new List<Claim>
    {
    new Claim(ClaimTypes.NameIdentifier, user.Id),
          new Claim(ClaimTypes.Name, user.UserName!),
                new Claim(ClaimTypes.Email, user.Email!),
           new Claim("FullName", user.FullName)
       };

       // Add role claims
    foreach (var role in roles)
            {
   claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var jwtSettings = _configuration.GetSection("JwtSettings");
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]!));
       var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpirationInMinutes"]));

            var token = new JwtSecurityToken(
        issuer: jwtSettings["Issuer"],
     audience: jwtSettings["Audience"],
        claims: claims,
        expires: expires,
           signingCredentials: credentials
 );

          return new JwtSecurityTokenHandler().WriteToken(token);
    }

        /// <summary>
        /// Create admin account (Admin only)
    /// </summary>
        [HttpPost("create-admin")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<AuthResponseDto>> CreateAdmin([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
          {
                return BadRequest(new AuthResponseDto
           {
           Success = false,
           Message = "Invalid registration data"
 });
            }

            // Check if user already exists
            var existingUser = await _userManager.FindByEmailAsync(model.Email);
       if (existingUser != null)
            {
        return BadRequest(new AuthResponseDto
            {
 Success = false,
        Message = "User with this email already exists"
     });
      }

         // Create new admin user
    var user = new ApplicationUser
         {
         UserName = model.Email,
    Email = model.Email,
                FullName = model.FullName,
        EmailConfirmed = true,
                CreatedAt = DateTime.UtcNow
};

  var result = await _userManager.CreateAsync(user, model.Password);

     if (!result.Succeeded)
            {
      return BadRequest(new AuthResponseDto
           {
            Success = false,
       Message = string.Join(", ", result.Errors.Select(e => e.Description))
      });
         }

            // Assign Admin role
            await _userManager.AddToRoleAsync(user, "Admin");

 return Ok(new AuthResponseDto
     {
                Success = true,
       Message = "Admin account created successfully",
  Email = user.Email,
         FullName = user.FullName,
     Role = "Admin"
 });
        }

        /// <summary>
        /// Change password for the authenticated user
        /// </summary>
        [HttpPost("change-password")]
        [Authorize]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User not found" });
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Check current password
            var passwordValid = await _userManager.CheckPasswordAsync(user, model.CurrentPassword);
            if (!passwordValid)
            {
                return BadRequest(new { message = "Current password is incorrect" });
            }

            // Change password
            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Failed to change password", errors = result.Errors.Select(e => e.Description) });
            }

            return Ok(new { message = "Password changed successfully" });
        }
  }
}
