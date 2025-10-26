using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RestaurantManagementSystem.Models;

namespace RestaurantManagementSystem.Data
{
    /// <summary>
  /// Database context for the Restaurant Management System
    /// Inherits from IdentityDbContext to support ASP.NET Core Identity
    /// </summary>
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
      : base(options)
        {
}

        // DbSet properties representing database tables
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

        /// <summary>
      /// Configures entity relationships and constraints using Fluent API
    /// </summary>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        base.OnModelCreating(modelBuilder);

 // Configure MenuItem entity
      modelBuilder.Entity<MenuItem>(entity =>
        {
 entity.HasKey(e => e.Id);
         entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
  entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
             entity.Property(e => e.Price).HasPrecision(10, 2);
          });

        // Configure Order entity
          modelBuilder.Entity<Order>(entity =>
    {
       entity.HasKey(e => e.Id);
    entity.Property(e => e.TotalAmount).HasPrecision(10, 2);

                // Relationship: Order -> Customer (ApplicationUser)
   entity.HasOne(e => e.Customer)
       .WithMany(u => u.Orders)
          .HasForeignKey(e => e.CustomerId)
      .OnDelete(DeleteBehavior.Restrict);
      });

// Configure OrderItem entity
  modelBuilder.Entity<OrderItem>(entity =>
    {
       entity.HasKey(e => e.Id);
       entity.Property(e => e.UnitPrice).HasPrecision(10, 2);
                entity.Property(e => e.Subtotal).HasPrecision(10, 2);

        // Relationship: OrderItem -> Order
              entity.HasOne(e => e.Order)
   .WithMany(o => o.OrderItems)
         .HasForeignKey(e => e.OrderId)
      .OnDelete(DeleteBehavior.Cascade);

     // Relationship: OrderItem -> MenuItem
        entity.HasOne(e => e.MenuItem)
           .WithMany(m => m.OrderItems)
             .HasForeignKey(e => e.MenuItemId)
          .OnDelete(DeleteBehavior.Restrict);
            });

     // Configure ApplicationUser entity
      modelBuilder.Entity<ApplicationUser>(entity =>
       {
       entity.Property(e => e.FullName).IsRequired().HasMaxLength(100);
            });
        }
    }
}
