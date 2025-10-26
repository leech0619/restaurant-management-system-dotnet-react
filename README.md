# 🍌 Minion Café - Restaurant Management System

<div align="center">

![Minion Café](https://img.shields.io/badge/Minion%20Caf%C3%A9-Bananally%20Good-FDD835?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzFBMjM3RSIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPjwvc3ZnPg==)
![.NET Version](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, full-stack restaurant management system where every meal is a despicably delicious adventure!**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture-overview) • [Database](#-database-design-ef-core-code-first) • [Installation](#-installation--setup) • [Usage](#-usage)

</div>

---

## 🍽️ Overview

**Minion Café Restaurant Management System** is a comprehensive full-stack web application designed to streamline restaurant operations. Built with **ASP.NET Core 8**, **Entity Framework Core**, **React 18**, and **SQL Server**, this system provides role-based access control, real-time order management, and an intuitive admin dashboard.

Whether you're a restaurant owner managing your menu, a staff member processing orders, or a customer placing an order — Minion Café delivers a seamless and delightful experience with its playful **Minion-themed UI**! 💛

### 🎯 Project Purpose

This project was developed **for learning purposes** to:
- Demonstrate proficiency in **.NET full-stack development**
- Showcase **modern ASP.NET Core** backend architecture
- Implement **React** best practices with hooks and context API
- Practice **RESTful API** design and JWT authentication
- Build a **portfolio-ready** and educational application

---

## 🚀 Features

### 🔐 **Authentication & Authorization**
- JWT-based authentication with secure token management  
- Role-based access control (Admin, Staff, Customer)  
- Password change functionality for all users  
- Secure registration and login system  

### 🧑‍💼 **Admin Dashboard**
- Real-time statistics (Orders, Revenue, Active Customers)  
- Today’s performance metrics  
- Popular menu analytics with charts  
- Recent orders overview  
- Quick actions panel  

### 🍔 **Menu Management (Admin Only)**
- CRUD operations for menu items  
- Organized by category (Breakfast, Main Course, Beverages, Desserts)  
- Image URL support  
- Availability toggles and price management  

### 🛒 **Order Management**
- Real-time order tracking with 4 statuses: Pending, In Progress, Served, Completed  
- Order history for customers  
- Detailed order breakdown with itemized pricing  

### 🧾 **Shopping Cart**
- Add/remove items with quantity control  
- Real-time total calculation  
- One-click checkout process  

### 💻 **Modern UI/UX**
- Minion-themed design  
- Fully responsive (Desktop, Tablet, Mobile)  
- Smooth transitions and animations  
- Toast notifications and loading states  

---

## 🎨 UI Theme & Design

### **Minion Café Theme**
A playful yet professional **Minion-inspired** design:

- **Primary Colors:** Navy blue and warm yellow  
- **Font:** Poppins (Google Fonts)  
- **Style:** Rounded cards, pill buttons, smooth animations  
- **Responsive:** Fully optimized for all screen sizes  

---

## ⚙️ Tech Stack

**Backend**
- ASP.NET Core 8  
- Entity Framework Core 9  
- SQL Server (LocalDB)  
- ASP.NET Identity  
- JWT Authentication  
- Swagger for API docs  

**Frontend**
- React 18  
- Vite  
- React Router  
- Bootstrap 5  
- Axios  
- React Toastify  

**Tools**
- Visual Studio 2022 / VS Code  
- Postman  
- Git & GitHub  
- npm  

---

## 🏗️ Architecture Overview

**Backend (ASP.NET Core)**
- Controllers (Auth, Menu, Orders)  
- Models and DTOs  
- Data context and seed data  
- Clean architecture with layered structure  

**Frontend (React)**
- Components, pages, and context folders  
- AuthContext and CartContext for state  
- Axios-based API services  
- Protected routes and responsive layout  

---

## 🧩 Database Design (EF Core Code-First)

**Entities:**
- `ApplicationUser` (Identity-based user)
- `MenuItem` (menu data)
- `Order` (customer order)
- `OrderItem` (junction table)

**Relationships:**
- One user → many orders  
- One order → many order items  
- One menu item → many order items  

---

## 🧰 Installation & Setup

### Prerequisites
- Visual Studio 2022  
- .NET 8 SDK  
- Node.js 18+  
- SQL Server LocalDB  

### Steps
1. Clone the repo  
   ```bash
   git clone https://github.com/yourusername/minion-cafe-restaurant-system.git
   cd minion-cafe-restaurant-system
   ```
2. Backend setup  
   ```bash
   cd RestaurantManagementSystem.Server
   dotnet restore
   dotnet ef database update
   dotnet run
   ```
3. Frontend setup  
   ```bash
   cd restaurantmanagementsystem.client
   npm install
   npm run dev
   ```
4. Open in browser → http://localhost:5173  

---

## 💡 Usage

### **Admin**
- Manage menu and orders  
- View dashboard metrics  
- Update order status  
- Create admin accounts  

### **Customer**
- Register and login  
- Browse menu and add to cart  
- Place orders and track status  
- View order history  

---

## 🧪 Testing & Troubleshooting

- Test API with Swagger → `https://localhost:7000/swagger`  
- Common issues: CORS, database connection, expired JWT tokens  
- Use `dotnet ef database update` if database not initialized  

---

## 📚 Learning Goals

This project was built for **educational purposes** to strengthen:
- Full-stack development with .NET and React  
- RESTful API design and authentication  
- Clean architecture and best practices  
- Responsive UI implementation  

---

## 🛠️ Future Enhancements

- Email notifications  
- Payment integration  
- Table reservation  
- Inventory management  
- Real-time updates via SignalR  
- Cloud deployment  

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgments

- **Minions™** theme inspiration  
- **Microsoft** for ASP.NET Core  
- **React Team** for the frontend framework  
- **Open Source Community** for supporting tools  

---

<div align="center">

### **Built with ❤️ and lots of 🍌**
**Bananally Good Since 2025!**

⭐ *Star this repo if you find it useful!*  

[⬆️ Back to Top](#-minion-café---restaurant-management-system)

</div>
