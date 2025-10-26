# ?? Minion Café - Restaurant Management System

<div align="center">

![Minion Café](https://img.shields.io/badge/Minion%20Caf%C3%A9-Bananally%20Good-FDD835?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzFBMjM3RSIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPjwvc3ZnPg==)
![.NET Version](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, full-stack restaurant management system where every meal is a despicably delicious adventure!**

[Features](#-features) • [Demo](#-demo) • [Installation](#%EF%B8%8F-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack)

</div>

---

## ?? Overview

**Minion Café Restaurant Management System** is a comprehensive full-stack web application designed to streamline restaurant operations. Built with **ASP.NET Core 8**, **Entity Framework Core**, **React 18**, and **SQL Server**, this system provides role-based access control, real-time order management, and an intuitive admin dashboard.

Whether you're a restaurant owner managing your menu, a staff member processing orders, or a customer placing an order, Minion Café delivers a seamless and delightful experience with its playful Minion-themed UI! ??

### ?? Project Purpose

This project was developed to:
- Demonstrate proficiency in **full-stack web development**
- Showcase **modern ASP.NET Core** backend architecture
- Implement **React** best practices with hooks and context API
- Practice **RESTful API** design and JWT authentication
- Build a **portfolio-ready** production-quality application

---

## ? Features

### ?? **Authentication & Authorization**
- **JWT-based authentication** with secure token management
- **Role-based access control** (Admin, Staff, Customer)
- **Password change functionality** for all users
- Secure registration and login system

### ????? **Admin Dashboard**
- **Real-time statistics** (Total Orders, Revenue, Active Customers)
- **Today's performance** metrics
- **Popular menu items** analytics with visual charts
- **Recent orders** overview
- **Quick actions** panel for common tasks

### ??? **Menu Management** (Admin Only)
- **CRUD operations** for menu items
- **Category-based** organization (Breakfast, Main Course, Beverages, Desserts)
- **Image support** via URL
- **Availability** toggle for items
- **Price management** in RM (Malaysian Ringgit)

### ?? **Order Management**
- **Real-time order tracking** with 4 status levels:
  - ?? Pending
  - ?? In Progress
  - ?? Served
  - ? Completed
- **Order history** for customers
- **Status updates** with dropdown (Admin/Staff)
- **Detailed order breakdown** with itemized pricing

### ?? **Shopping Cart**
- **Add/Remove items** with quantity management
- **Real-time total calculation**
- **Cart badge** showing item count
- **One-click checkout** process

### ?? **Modern UI/UX**
- **Minion-themed design** (Navy Blue + Warm Yellow)
- **Fully responsive** (Desktop, Tablet, Mobile)
- **Smooth animations** and transitions
- **Bootstrap 5** with custom styling
- **Toast notifications** for user feedback
- **Loading states** and spinners

### ?? **Additional Features**
- **Pre-seeded data** with 15 menu items
- **Swagger API documentation**
- **CORS configuration** for cross-origin requests
- **Code-First migrations** with Entity Framework
- **Clean architecture** with separation of concerns

---

## ?? Demo

### ?? Home Page
Beautiful hero section with Minion Café branding, feature cards, and compelling call-to-action.

### ?? Admin Dashboard
Comprehensive dashboard with:
- 4 metric cards (Orders, Pending, Revenue, Customers)
- Today's performance section
- Popular items with progress bars
- Recent orders list
- Quick action buttons

### ?? Menu Page
Grid layout showcasing menu items with:
- High-quality images
- Category grouping
- Price in RM
- Add to Cart functionality
- Out of Stock badges

### ?? Cart & Checkout
Interactive cart with:
- Item quantity controls
- Live subtotal calculation
- Order summary card
- One-click order placement

---

## ??? Tech Stack

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| ![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-8.0-512BD4?logo=dotnet) | 8.0 | Web API Framework |
| ![Entity Framework](https://img.shields.io/badge/EF%20Core-9.0-512BD4?logo=dotnet) | 9.0 | ORM & Database Management |
| ![SQL Server](https://img.shields.io/badge/SQL%20Server-LocalDB-CC2927?logo=microsoftsqlserver) | LocalDB | Database |
| ![ASP.NET Identity](https://img.shields.io/badge/Identity-8.0-512BD4) | 8.0 | User Authentication |
| ![JWT](https://img.shields.io/badge/JWT-Bearer-000000?logo=jsonwebtokens) | Bearer | Token-based Auth |
| ![AutoMapper](https://img.shields.io/badge/AutoMapper-12.0-brightgreen) | 12.0 | Object Mapping |
| ![Swagger](https://img.shields.io/badge/Swagger-6.6-85EA2D?logo=swagger) | 6.6 | API Documentation |

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react) | 18.3 | UI Library |
| ![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite) | 7.1 | Build Tool |
| ![React Router](https://img.shields.io/badge/React%20Router-7.1-CA4245?logo=reactrouter) | 7.1 | Routing |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap) | 5.3 | CSS Framework |
| ![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4?logo=axios) | 1.7 | HTTP Client |
| ![React Toastify](https://img.shields.io/badge/Toastify-11.0-FFD700) | 11.0 | Notifications |

### **Tools & DevOps**
- **Visual Studio 2022** - Backend Development
- **VS Code** - Frontend Development
- **Postman** - API Testing
- **Git & GitHub** - Version Control
- **npm** - Package Management

---

## ??? Architecture Overview

### **Backend Architecture (ASP.NET Core MVC)**

```
RestaurantManagementSystem.Server/
??? Controllers/     # API Controllers
?   ??? AuthController.cs      # Authentication & User Management
? ??? MenuItemsController.cs # Menu CRUD Operations
?   ??? OrdersController.cs    # Order Management
??? Models/        # Entity Models
?   ??? ApplicationUser.cs     # User Entity
?   ??? MenuItem.cs       # Menu Item Entity
?   ??? Order.cs         # Order Entity
?   ??? OrderItem.cs           # Order Item Junction
??? DTOs/       # Data Transfer Objects
?   ??? AuthDtos.cs # Login, Register, Change Password
?   ??? MenuItemDto.cs         # Menu DTOs
?   ??? OrderDtos.cs           # Order DTOs
??? Data/       # Database Context & Seeding
?   ??? ApplicationDbContext.cs
?   ??? MinionCafeSeedData.cs
??? Program.cs            # App Configuration & Middleware
```

### **Frontend Architecture (React)**

```
restaurantmanagementsystem.client/
??? src/
?   ??? components/     # Reusable Components
?   ?   ??? Navbar.jsx       # Navigation Bar
?   ?   ??? LoadingSpinner.jsx    # Loading State
?   ?   ??? ProtectedRoute.jsx    # Route Guard
?   ??? pages/     # Page Components
? ?   ??? HomePage.jsx          # Landing Page
?   ?   ??? LoginPage.jsx         # Authentication
?   ?   ??? RegisterPage.jsx# User Registration
?   ?   ??? MenuPage.jsx     # Menu Display
?   ?   ??? CartPage.jsx     # Shopping Cart
?   ?   ??? OrdersPage.jsx        # Order History
?   ?   ??? ChangePasswordPage.jsx # Password Update
?   ?   ??? admin/ # Admin Pages
?   ?       ??? AdminDashboard.jsx
?   ?  ??? AdminMenuManager.jsx
?   ?       ??? AdminOrders.jsx
?   ?       ??? CreateAdminPage.jsx
?   ??? context/          # React Context (State)
?   ?   ??? AuthContext.jsx       # Auth State Management
?   ?   ??? CartContext.jsx       # Cart State Management
?   ??? services/# API Services
?   ?   ??? axios.js              # Axios Configuration
?   ?   ??? auth.service.js       # Auth API Calls
?   ?   ??? menu.service.js       # Menu API Calls
?   ?   ??? order.service.js      # Order API Calls
?   ??? config/    # Configuration
?   ?   ??? api.config.js         # API Endpoints
?   ??? App.jsx      # Main App Component
?   ??? main.jsx       # React Entry Point
?   ??? index.css        # Global Styles
??? vite.config.js           # Vite Configuration
```

### **Database Design (Code-First EF Core)**

#### **Entity Relationship Diagram**

```
???????????????????
?  ApplicationUser?
?  (Identity)     ?
???????????????????
         ? 1
         ?
         ? *
???????????????????
?  Order       ?
? - CustomerId  ?
? - TotalAmount   ?
? - Status        ?
? - CreatedAt     ?
???????????????????
         ? 1
  ?
         ? *
???????????????????
?   OrderItem     ?
? - OrderId       ?
? - MenuItemId    ?????
? - Quantity    ?   ?
? - UnitPrice     ?   ?
? - Subtotal      ?   ?
???????????????????   ?
       ? *
         ??????????????
         ? 1
???????????????????
?    MenuItem     ?
? - Name       ?
? - Description   ?
? - Category      ?
? - Price      ?
? - IsAvailable   ?
? - ImageUrl      ?
???????????????????
```

#### **Key Entities**

1. **ApplicationUser** (ASP.NET Identity)
   - Extends `IdentityUser`
   - Custom property: `FullName`
   - Roles: Admin, Staff, Customer

2. **MenuItem**
   - Restaurant menu items
   - Category-based grouping
   - Price in RM (Malaysian Ringgit)
   - Image URL support

3. **Order**
   - Customer orders
   - Status tracking (Pending ? In Progress ? Served ? Completed)
   - Total amount calculation

4. **OrderItem**
   - Junction table
   - Links Orders to MenuItems
   - Stores quantity and pricing

---

## ?? Installation

### **Prerequisites**

Before you begin, ensure you have the following installed:

- ? [Visual Studio 2022](https://visualstudio.microsoft.com/) (Community, Professional, or Enterprise)
- ? [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- ? [Node.js](https://nodejs.org/) (v18+ recommended)
- ? [SQL Server LocalDB](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb) (included with Visual Studio)
- ? [Git](https://git-scm.com/)

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/yourusername/minion-cafe-restaurant-system.git
cd minion-cafe-restaurant-system
```

### **Step 2: Backend Setup**

#### **2.1 Restore NuGet Packages**

```bash
cd RestaurantManagementSystem.Server
dotnet restore
```

#### **2.2 Update Database Connection String (Optional)**

Edit `appsettings.json` if you want to change the database connection:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MinionCafeDB;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

#### **2.3 Apply Database Migrations**

```bash
dotnet ef database update
```

This will:
- Create the `MinionCafeDB` database
- Apply all migrations
- Seed initial data:
  - 1 Admin account (admin@minioncafe.com / MinionAdmin@123)
  - 15 menu items across 4 categories
- 3 roles (Admin, Staff, Customer)

#### **2.4 Run the Backend API**

```bash
dotnet run --launch-profile https
```

Expected output:
```
Now listening on: https://localhost:7000
Now listening on: http://localhost:5000
Swagger UI: https://localhost:7000/swagger
```

### **Step 3: Frontend Setup**

#### **3.1 Install Dependencies**

Open a **new terminal**:

```bash
cd restaurantmanagementsystem.client
npm install
```

#### **3.2 Configure Environment Variables (Optional)**

Create or edit `.env` file:

```env
VITE_API_URL=https://localhost:7000/api
```

#### **3.3 Run the Frontend**

```bash
npm run dev
```

Expected output:
```
VITE v7.1.12 ready in 500ms

?  Local:   http://localhost:5173/
?  Network: use --host to expose
```

### **Step 4: Access the Application**

Open your browser and navigate to:

?? **http://localhost:5173**

---

## ?? Usage

### **1. Admin Access**

#### **Login Credentials**
```
Email:    admin@minioncafe.com
Password: MinionAdmin@123
```

#### **Admin Capabilities**
1. **Dashboard**
   - View total orders, revenue, and customer statistics
   - Monitor today's performance
   - See popular menu items
   - Track recent orders

2. **Menu Management**
   - Add new menu items
   - Edit existing items (name, description, price, category, image)
   - Delete items
   - Toggle availability

3. **Order Management**
   - View all customer orders
   - Filter by status (Pending, In Progress, Served, Completed)
   - Update order status
   - View order details with itemized breakdown

4. **User Management**
   - Create new admin accounts
   - Change own password

### **2. Customer Access**

#### **Registration**
1. Click **"Sign Up"** on the homepage
2. Fill in:
   - Full Name
   - Email Address
   - Password (min 6 characters)
   - Confirm Password
3. Click **"Sign Up as Customer"**
4. Auto-login after registration

#### **Customer Capabilities**
1. **Browse Menu**
   - View all menu items by category
   - See item details (name, description, price, image)
   - Check availability

2. **Shopping Cart**
   - Add items to cart
   - Adjust quantities
   - Remove items
   - View live total

3. **Place Orders**
   - Review cart
   - Click "Place Order"
 - Receive confirmation

4. **Order History**
   - View all past orders
   - Track order status
   - See itemized breakdown
   - View total amounts

5. **Profile Management**
   - Change password
   - Logout

### **3. Staff Access** (Similar to Admin but limited)

Staff accounts can:
- ? View and manage orders
- ? Update order status
- ? Cannot manage menu
- ? Cannot create admin accounts

---

## ?? UI Theme & Design

### **Minion Café Theme**

The application features a playful yet professional Minion-inspired design:

#### **Color Palette**
| Color | Hex Code | Usage |
|-------|----------|-------|
| Deep Navy Blue | `#1A237E` | Primary (Headers, Navbar, Buttons) |
| Warm Yellow | `#FDD835` | Accent (Highlights, CTA Buttons) |
| Light Gray | `#FAFAFA` | Background |
| Dark Gray | `#212121` | Text |
| Success Green | `#4CAF50` | Success States |
| Danger Red | `#F44336` | Error States |

#### **Typography**
- **Font Family:** Poppins (Google Fonts)
- **Headings:** Bold 700-800 weight
- **Body:** Regular 400-500 weight
- **Responsive:** `clamp()` for fluid sizing

#### **UI Components**
- ? **Cards:** Rounded corners with shadow elevation
- ? **Buttons:** Pill-shaped with hover animations
- ? **Forms:** Clean inputs with yellow accent on focus
- ? **Tables:** Alternating row colors with hover effect
- ? **Badges:** Status indicators with color coding
- ? **Modals:** Overlay with smooth transitions

### **Responsive Design**

| Device | Screen Size | Layout Adjustments |
|--------|-------------|-------------------|
| Desktop | 1920px+ | 4-column grid, full navigation |
| Laptop | 1366px | 3-column grid, compact spacing |
| Tablet | 768px | 2-column grid, hamburger menu |
| Mobile | 375px+ | 1-column stack, touch-optimized |

#### **Mobile Optimizations**
- ?? Hamburger navigation menu
- ?? Full-width buttons
- ?? Stacked form fields
- ?? Mobile-friendly tables
- ?? Touch-optimized targets (48px+)

---

## ?? API Documentation

The API is fully documented using **Swagger UI**.

### **Access Swagger**
Navigate to: **https://localhost:7000/swagger**

### **Key Endpoints**

#### **Authentication** (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new customer | ? |
| POST | `/login` | User login | ? |
| POST | `/change-password` | Change password | ? |
| POST | `/create-admin` | Create admin (Admin only) | ? |

#### **Menu Items** (`/api/menuitems`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all items | ? |
| GET | `/{id}` | Get item by ID | ? |
| GET | `/by-category` | Get items grouped | ? |
| POST | `/` | Create item (Admin) | ? |
| PUT | `/{id}` | Update item (Admin) | ? |
| DELETE | `/{id}` | Delete item (Admin) | ? |

#### **Orders** (`/api/orders`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user's orders | ? |
| GET | `/{id}` | Get order by ID | ? |
| GET | `/by-status/{status}` | Filter by status (Staff) | ? |
| POST | `/` | Create order | ? |
| PATCH | `/{id}/status` | Update status (Staff) | ? |
| DELETE | `/{id}` | Delete order (Admin) | ? |

### **Authentication Flow**

1. **Register/Login** ? Receive JWT token
2. **Include token** in Authorization header:
   ```
   Authorization: Bearer <your-token-here>
   ```
3. **Make authenticated requests**

---

## ?? Testing

### **Manual Testing Checklist**

#### **Authentication**
- [ ] Register new customer account
- [ ] Login with admin credentials
- [ ] Login with customer credentials
- [ ] Logout and verify session cleared
- [ ] Change password and verify new password works
- [ ] Verify protected routes redirect to login

#### **Menu Management (Admin)**
- [ ] View all menu items
- [ ] Create new menu item with image
- [ ] Edit menu item details
- [ ] Delete menu item
- [ ] Toggle item availability

#### **Order Flow (Customer)**
- [ ] Browse menu items by category
- [ ] Add multiple items to cart
- [ ] Update cart quantities
- [ ] Remove items from cart
- [ ] Place order successfully
- [ ] View order in order history

#### **Order Management (Admin/Staff)**
- [ ] View all orders
- [ ] Filter orders by status
- [ ] Update order status
- [ ] Verify status change reflected immediately
- [ ] View order details and breakdown

#### **Dashboard (Admin)**
- [ ] View accurate statistics
- [ ] Verify today's metrics
- [ ] Check popular items ranking
- [ ] Review recent orders list
- [ ] Test quick action buttons

#### **Responsive Design**
- [ ] Test on Desktop (1920px)
- [ ] Test on Laptop (1366px)
- [ ] Test on Tablet (768px)
- [ ] Test on Mobile (375px)
- [ ] Verify all interactions work on touch devices

### **API Testing with Swagger**

1. Navigate to `https://localhost:7000/swagger`
2. Test each endpoint:
   - Register user
   - Login and copy JWT token
   - Click "Authorize" and paste token
   - Test protected endpoints

---

## ?? Troubleshooting

### **Common Issues**

#### **1. Database Connection Error**
```bash
# Solution: Update database
cd RestaurantManagementSystem.Server
dotnet ef database update
```

#### **2. Port Already in Use**
```bash
# Check what's using the port (Windows)
netstat -ano | findstr ":7000"
netstat -ano | findstr ":5173"

# Kill the process
taskkill /PID <process-id> /F
```

#### **3. CORS Error**
Verify `Program.cs` has correct CORS policy:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
         .AllowAnyHeader()
   .AllowAnyMethod()
 .AllowCredentials();
    });
});
```

#### **4. JWT Token Expired**
- JWT tokens expire after 60 minutes
- Solution: Login again to get a fresh token

#### **5. Frontend Not Loading**
```bash
# Clear cache and reinstall
cd restaurantmanagementsystem.client
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

#### **6. Swagger Not Loading**
- Ensure backend is running on HTTPS
- Check browser console for errors
- Verify `launchSettings.json` has correct ports

---

## ?? Learning Goals

This project was built to demonstrate and practice:

### **Backend Skills**
- ? **ASP.NET Core 8** Web API development
- ? **Entity Framework Core** with Code-First migrations
- ? **ASP.NET Identity** for authentication
- ? **JWT Bearer** token authentication
- ? **RESTful API** design principles
- ? **Repository pattern** and clean architecture
- ? **AutoMapper** for DTO mapping
- ? **Swagger/OpenAPI** documentation
- ? **CORS** configuration
- ? **Dependency Injection**

### **Frontend Skills**
- ? **React 18** with functional components
- ? **React Hooks** (useState, useEffect, useContext)
- ? **Context API** for state management
- ? **React Router** for navigation
- ? **Axios** for HTTP requests
- ? **Bootstrap 5** for responsive design
- ? **Custom CSS** with CSS variables
- ? **Protected routes** and authentication flow
- ? **Toast notifications** for user feedback
- ? **Form validation** and error handling

### **Full-Stack Integration**
- ? **JWT authentication** flow (frontend ? backend)
- ? **CRUD operations** via REST API
- ? **Real-time updates** without page refresh
- ? **Role-based access control** (RBAC)
- ? **Error handling** and user feedback
- ? **Responsive design** principles
- ? **Production-ready** code structure

### **Software Engineering Practices**
- ? **Clean Code** principles
- ? **Separation of Concerns**
- ? **DRY (Don't Repeat Yourself)**
- ? **SOLID principles**
- ? **Version Control** with Git
- ? **Project Documentation**
- ? **Testing mindset**

---

## ?? Future Enhancements

Planned features for future development:

- [ ] **Email notifications** for order updates
- [ ] **Payment gateway** integration (Stripe/PayPal)
- [ ] **Table reservation** system
- [ ] **Customer reviews** and ratings
- [ ] **Inventory management**
- [ ] **Sales reports** and analytics
- [ ] **Multi-language support** (i18n)
- [ ] **Dark mode** toggle
- [ ] **Progressive Web App** (PWA)
- [ ] **Unit and integration tests**
- [ ] **Docker containerization**
- [ ] **CI/CD pipeline** (GitHub Actions)
- [ ] **Cloud deployment** (Azure/AWS)
- [ ] **Real-time notifications** (SignalR)
- [ ] **QR code** menu for dine-in

---

## ?? Contributing

Contributions are welcome! If you'd like to improve this project:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Contribution Guidelines**
- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed
- Test your changes thoroughly
- Write descriptive commit messages

---

## ?? License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## ?? Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## ?? Acknowledgments

- **Minion theme** inspiration for the playful design
- **Bootstrap** for the responsive framework
- **Microsoft** for ASP.NET Core and Entity Framework
- **React team** for the excellent frontend library
- **Open source community** for the amazing packages used

---

## ?? Support

If you encounter any issues or have questions:

1. **Check** the [Troubleshooting](#-troubleshooting) section
2. **Search** existing [Issues](https://github.com/yourusername/minion-cafe-restaurant-system/issues)
3. **Create** a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment details (OS, .NET version, Node version)

---

<div align="center">

### **Built with ?? and lots of ??**

**Bananally Good Since 2025!** ???

? **Star this repo** if you found it helpful!

[? Back to Top](#-minion-café---restaurant-management-system)

</div>
