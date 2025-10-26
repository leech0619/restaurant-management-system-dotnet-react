using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantManagementSystem.Data;
using RestaurantManagementSystem.DTOs;
using RestaurantManagementSystem.Models;
using System.Security.Claims;

namespace RestaurantManagementSystem.Controllers
{
    /// <summary>
    /// Manages customer orders (CRUD and status updates)
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all orders (Admin, Staff see all; Customer sees only their own)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderResponseDto>>> GetOrders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRole = User.FindFirstValue(ClaimTypes.Role);

            IQueryable<Order> query = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.MenuItem);

            // Customers can only see their own orders
            if (userRole == "Customer")
            {
                query = query.Where(o => o.CustomerId == userId);
            }

            var orders = await query
    .OrderByDescending(o => o.CreatedAt)
.Select(o => new OrderResponseDto
             {
      Id = o.Id,
            CustomerId = o.CustomerId,
      CustomerName = o.Customer != null ? o.Customer.FullName : "",
    TotalAmount = o.TotalAmount,
Status = o.Status,
             CreatedAt = o.CreatedAt,
  Items = o.OrderItems.Select(oi => new OrderItemResponseDto
         {
            Id = oi.Id,
   MenuItemId = oi.MenuItemId,
               MenuItemName = oi.MenuItem != null ? oi.MenuItem.Name : "",
           Quantity = oi.Quantity,
               UnitPrice = oi.UnitPrice,
          Subtotal = oi.Subtotal
                }).ToList()
  })
       .ToListAsync();

      return Ok(orders);
  }

        /// <summary>
        /// Get a specific order by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderResponseDto>> GetOrder(int id)
  {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
var userRole = User.FindFirstValue(ClaimTypes.Role);

       var order = await _context.Orders
  .Include(o => o.Customer)
        .Include(o => o.OrderItems)
             .ThenInclude(oi => oi.MenuItem)
    .FirstOrDefaultAsync(o => o.Id == id);

       if (order == null)
       {
     return NotFound(new { message = "Order not found" });
         }

      // Customers can only view their own orders
       if (userRole == "Customer" && order.CustomerId != userId)
   {
                return Forbid();
      }

            var dto = new OrderResponseDto
            {
    Id = order.Id,
              CustomerId = order.CustomerId,
           CustomerName = order.Customer?.FullName ?? "",
     TotalAmount = order.TotalAmount,
        Status = order.Status,
  CreatedAt = order.CreatedAt,
       Items = order.OrderItems.Select(oi => new OrderItemResponseDto
     {
   Id = oi.Id,
         MenuItemId = oi.MenuItemId,
     MenuItemName = oi.MenuItem?.Name ?? "",
     Quantity = oi.Quantity,
             UnitPrice = oi.UnitPrice,
           Subtotal = oi.Subtotal
            }).ToList()
            };

    return Ok(dto);
        }

        /// <summary>
        /// Create a new order (Authenticated users)
    /// </summary>
[HttpPost]
      public async Task<ActionResult<OrderResponseDto>> CreateOrder([FromBody] CreateOrderDto dto)
        {
    if (!ModelState.IsValid || dto.Items == null || !dto.Items.Any())
        {
             return BadRequest(new { message = "Invalid order data. At least one item is required." });
        }

      var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

 // Create order
            var order = new Order
            {
           CustomerId = userId!,
            Status = OrderStatus.Pending,
 CreatedAt = DateTime.UtcNow,
  TotalAmount = 0
            };

            _context.Orders.Add(order);

    // Add order items and calculate total
        decimal totalAmount = 0;

     foreach (var itemDto in dto.Items)
   {
   var menuItem = await _context.MenuItems.FindAsync(itemDto.MenuItemId);

   if (menuItem == null || !menuItem.IsAvailable)
       {
            return BadRequest(new { message = $"Menu item {itemDto.MenuItemId} is not available" });
      }

     var orderItem = new OrderItem
    {
       Order = order,
    MenuItemId = itemDto.MenuItemId,
      Quantity = itemDto.Quantity,
              UnitPrice = menuItem.Price,
              Subtotal = menuItem.Price * itemDto.Quantity
    };

                totalAmount += orderItem.Subtotal;
     _context.OrderItems.Add(orderItem);
            }

     order.TotalAmount = totalAmount;

            await _context.SaveChangesAsync();

      // Reload order with related data
            var createdOrder = await _context.Orders
     .Include(o => o.Customer)
           .Include(o => o.OrderItems)
          .ThenInclude(oi => oi.MenuItem)
   .FirstOrDefaultAsync(o => o.Id == order.Id);

            var responseDto = new OrderResponseDto
   {
             Id = createdOrder!.Id,
   CustomerId = createdOrder.CustomerId,
        CustomerName = createdOrder.Customer?.FullName ?? "",
          TotalAmount = createdOrder.TotalAmount,
  Status = createdOrder.Status,
             CreatedAt = createdOrder.CreatedAt,
         Items = createdOrder.OrderItems.Select(oi => new OrderItemResponseDto
                {
           Id = oi.Id,
      MenuItemId = oi.MenuItemId,
           MenuItemName = oi.MenuItem?.Name ?? "",
            Quantity = oi.Quantity,
       UnitPrice = oi.UnitPrice,
          Subtotal = oi.Subtotal
           }).ToList()
        };

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, responseDto);
        }

        /// <summary>
        /// Update order status (Admin/Staff only) - Can set to any status
        /// </summary>
        [HttpPatch("{id}/status")]
     [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<OrderResponseDto>> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusDto statusUpdate)
        {
       var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderItems)
    .ThenInclude(oi => oi.MenuItem)
    .FirstOrDefaultAsync(o => o.Id == id);

    if (order == null)
       {
     return NotFound(new { message = "Order not found" });
         }

            // Validate status value
   if (!Enum.IsDefined(typeof(OrderStatus), statusUpdate.Status))
       {
       return BadRequest(new { message = "Invalid order status" });
            }

          order.Status = statusUpdate.Status;

            await _context.SaveChangesAsync();

            var orderDto = new OrderResponseDto
         {
    Id = order.Id,
       CustomerId = order.CustomerId,
                CustomerName = order.Customer?.FullName ?? "",
         TotalAmount = order.TotalAmount,
       Status = order.Status,
        CreatedAt = order.CreatedAt,
            Items = order.OrderItems.Select(oi => new OrderItemResponseDto
 {
        Id = oi.Id,
  MenuItemId = oi.MenuItemId,
            MenuItemName = oi.MenuItem?.Name ?? "",
       Quantity = oi.Quantity,
  UnitPrice = oi.UnitPrice,
        Subtotal = oi.Subtotal
    }).ToList()
        };

 return Ok(orderDto);
        }

        /// <summary>
        /// Delete an order (Admin only)
        /// </summary>
    [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
     public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _context.Orders
      .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);

  if (order == null)
   {
        return NotFound(new { message = "Order not found" });
  }

     _context.Orders.Remove(order);
         await _context.SaveChangesAsync();

   return NoContent();
        }

        /// <summary>
        /// Get orders by status (Admin, Staff)
        /// </summary>
        [HttpGet("by-status/{status}")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<IEnumerable<OrderResponseDto>>> GetOrdersByStatus(OrderStatus status)
        {
      var orders = await _context.Orders
       .Include(o => o.Customer)
   .Include(o => o.OrderItems)
     .ThenInclude(oi => oi.MenuItem)
        .Where(o => o.Status == status)
      .OrderByDescending(o => o.CreatedAt)
     .Select(o => new OrderResponseDto
     {
             Id = o.Id,
         CustomerId = o.CustomerId,
          CustomerName = o.Customer != null ? o.Customer.FullName : "",
            TotalAmount = o.TotalAmount,
Status = o.Status,
      CreatedAt = o.CreatedAt,
        Items = o.OrderItems.Select(oi => new OrderItemResponseDto
             {
              Id = oi.Id,
 MenuItemId = oi.MenuItemId,
            MenuItemName = oi.MenuItem != null ? oi.MenuItem.Name : "",
       Quantity = oi.Quantity,
        UnitPrice = oi.UnitPrice,
     Subtotal = oi.Subtotal
 }).ToList()
    })
             .ToListAsync();

 return Ok(orders);
        }
    }
}
