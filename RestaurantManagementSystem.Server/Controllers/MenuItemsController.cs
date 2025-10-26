using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantManagementSystem.Data;
using RestaurantManagementSystem.DTOs;
using RestaurantManagementSystem.Models;

namespace RestaurantManagementSystem.Controllers
{
    /// <summary>
    /// Manages menu items (CRUD operations)
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MenuItemsController(ApplicationDbContext context)
        {
      _context = context;
  }

        /// <summary>
        /// Get all menu items
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuItemDto>>> GetMenuItems([FromQuery] bool? availableOnly = null)
        {
var query = _context.MenuItems.AsQueryable();

            if (availableOnly == true)
        {
           query = query.Where(m => m.IsAvailable);
  }

            var menuItems = await query
          .Select(m => new MenuItemDto
     {
         Id = m.Id,
  Name = m.Name,
          Description = m.Description,
             Category = m.Category,
     Price = m.Price,
           IsAvailable = m.IsAvailable
          })
      .ToListAsync();

         return Ok(menuItems);
        }

      /// <summary>
        /// Get a specific menu item by ID
        /// </summary>
        [HttpGet("{id}")]
      public async Task<ActionResult<MenuItemDto>> GetMenuItem(int id)
        {
            var menuItem = await _context.MenuItems.FindAsync(id);

    if (menuItem == null)
    {
                return NotFound(new { message = "Menu item not found" });
          }

          var dto = new MenuItemDto
   {
     Id = menuItem.Id,
                Name = menuItem.Name,
  Description = menuItem.Description,
      Category = menuItem.Category,
       Price = menuItem.Price,
     IsAvailable = menuItem.IsAvailable
     };

            return Ok(dto);
        }

        /// <summary>
        /// Create a new menu item (Admin only)
        /// </summary>
  [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<MenuItemDto>> CreateMenuItem([FromBody] MenuItemDto dto)
      {
  if (!ModelState.IsValid)
            {
        return BadRequest(ModelState);
        }

            var menuItem = new MenuItem
  {
                Name = dto.Name,
     Description = dto.Description,
          Category = dto.Category,
    Price = dto.Price,
IsAvailable = dto.IsAvailable,
         CreatedAt = DateTime.UtcNow
      };

   _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();

            dto.Id = menuItem.Id;

    return CreatedAtAction(nameof(GetMenuItem), new { id = menuItem.Id }, dto);
        }

        /// <summary>
        /// Update an existing menu item (Admin only)
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
  public async Task<IActionResult> UpdateMenuItem(int id, [FromBody] MenuItemDto dto)
        {
            if (id != dto.Id)
      {
    return BadRequest(new { message = "ID mismatch" });
            }

            var menuItem = await _context.MenuItems.FindAsync(id);

      if (menuItem == null)
            {
    return NotFound(new { message = "Menu item not found" });
 }

      menuItem.Name = dto.Name;
            menuItem.Description = dto.Description;
   menuItem.Category = dto.Category;
            menuItem.Price = dto.Price;
        menuItem.IsAvailable = dto.IsAvailable;

     await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Delete a menu item (Admin only)
   /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteMenuItem(int id)
        {
     var menuItem = await _context.MenuItems.FindAsync(id);

   if (menuItem == null)
 {
          return NotFound(new { message = "Menu item not found" });
          }

      _context.MenuItems.Remove(menuItem);
         await _context.SaveChangesAsync();

      return NoContent();
        }

        /// <summary>
 /// Get menu items grouped by category
    /// </summary>
  [HttpGet("by-category")]
        public async Task<ActionResult<IEnumerable<object>>> GetMenuItemsByCategory()
  {
            var groupedItems = await _context.MenuItems
  .Where(m => m.IsAvailable)
         .GroupBy(m => m.Category)
       .Select(g => new
           {
      Category = g.Key,
                 Items = g.Select(m => new MenuItemDto
 {
    Id = m.Id,
          Name = m.Name,
      Description = m.Description,
           Category = m.Category,
   Price = m.Price,
            IsAvailable = m.IsAvailable
     }).ToList()
                })
       .ToListAsync();

            return Ok(groupedItems);
        }
 }
}
