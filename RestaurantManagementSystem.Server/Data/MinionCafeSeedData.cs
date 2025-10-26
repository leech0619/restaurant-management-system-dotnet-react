using Microsoft.EntityFrameworkCore;
using RestaurantManagementSystem.Models;

namespace RestaurantManagementSystem.Data
{
    /// <summary>
    /// Seeds the database with sample Minion Cafe data
    /// </summary>
    public static class MinionCafeSeedData
    {
        public static async Task SeedMinionCafeData(ApplicationDbContext context)
        {
        // Check if data already exists
            if (await context.MenuItems.AnyAsync())
            {
      return; // Database has been seeded
      }

       // Seed Menu Items
            var menuItems = new List<MenuItem>
            {
   // Breakfast Items
        new MenuItem
            {
          Name = "Minion Pancakes",
                Description = "Fluffy pancakes with banana slices and honey - A Minion's dream breakfast!",
     Category = "Breakfast",
   Price = 7.99m,
    IsAvailable = true,
           CreatedAt = DateTime.UtcNow
    },
     new MenuItem
       {
   Name = "Banana Waffles",
         Description = "Golden waffles topped with fresh bananas and whipped cream",
      Category = "Breakfast",
       Price = 8.49m,
        IsAvailable = true,
         CreatedAt = DateTime.UtcNow
        },
     new MenuItem
                {
      Name = "Stuart's Scrambled Eggs",
        Description = "Fluffy scrambled eggs with toast and bacon",
         Category = "Breakfast",
      Price = 6.99m,
            IsAvailable = true,
           CreatedAt = DateTime.UtcNow
                },

       // Main Course
    new MenuItem
    {
            Name = "Despicable Burger",
                 Description = "Juicy beef burger with special Minion sauce, lettuce, tomato, and cheese",
          Category = "Main Course",
     Price = 12.99m,
            IsAvailable = true,
              CreatedAt = DateTime.UtcNow
   },
                new MenuItem
        {
  Name = "Yellow Submarine Sandwich",
       Description = "Fresh submarine sandwich loaded with premium meats, cheese, and veggies",
    Category = "Main Course",
 Price = 9.99m,
     IsAvailable = true,
     CreatedAt = DateTime.UtcNow
          },
    new MenuItem
 {
  Name = "Gru's Spaghetti",
       Description = "Classic spaghetti with homemade marinara sauce and meatballs",
     Category = "Main Course",
  Price = 11.49m,
        IsAvailable = true,
           CreatedAt = DateTime.UtcNow
     },
            new MenuItem
    {
    Name = "Kevin's Crispy Chicken",
   Description = "Crispy fried chicken with fries and coleslaw",
                    Category = "Main Course",
    Price = 13.99m,
          IsAvailable = true,
          CreatedAt = DateTime.UtcNow
      },

        // Beverages
   new MenuItem
                {
       Name = "Banana Smoothie",
     Description = "Fresh banana smoothie - The ultimate Minion favorite!",
           Category = "Beverages",
               Price = 4.99m,
  IsAvailable = true,
            CreatedAt = DateTime.UtcNow
        },
  new MenuItem
     {
    Name = "Minion Milkshake",
      Description = "Creamy vanilla milkshake with banana flavor",
       Category = "Beverages",
          Price = 5.49m,
      IsAvailable = true,
      CreatedAt = DateTime.UtcNow
         },
          new MenuItem
      {
           Name = "Purple Potion",
         Description = "Refreshing grape juice - Evil Minion's choice!",
        Category = "Beverages",
   Price = 3.99m,
   IsAvailable = true,
         CreatedAt = DateTime.UtcNow
     },
         new MenuItem
                {
       Name = "Bob's Hot Chocolate",
        Description = "Rich hot chocolate with marshmallows",
        Category = "Beverages",
    Price = 4.49m,
      IsAvailable = true,
          CreatedAt = DateTime.UtcNow
   },

          // Desserts
            new MenuItem
        {
            Name = "Banana Split Supreme",
        Description = "Classic banana split with three scoops of ice cream, chocolate sauce, and cherry on top",
       Category = "Desserts",
          Price = 6.99m,
            IsAvailable = true,
          CreatedAt = DateTime.UtcNow
      },
       new MenuItem
         {
         Name = "Minion Cupcakes",
 Description = "Adorable yellow cupcakes decorated like Minions",
     Category = "Desserts",
           Price = 4.49m,
   IsAvailable = true,
               CreatedAt = DateTime.UtcNow
         },
    new MenuItem
       {
               Name = "Unicorn Ice Cream",
      Description = "Agnes's favorite - Colorful rainbow ice cream",
   Category = "Desserts",
Price = 5.99m,
           IsAvailable = true,
   CreatedAt = DateTime.UtcNow
  },
       new MenuItem
      {
            Name = "Fart Gun Cookies",
        Description = "Delicious chocolate chip cookies shaped like fart guns",
          Category = "Desserts",
      Price = 3.99m,
    IsAvailable = true,
     CreatedAt = DateTime.UtcNow
                }
  };

            await context.MenuItems.AddRangeAsync(menuItems);
          await context.SaveChangesAsync();
      }
 }
}
