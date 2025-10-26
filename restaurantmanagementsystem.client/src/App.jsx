import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenuManager from './pages/admin/AdminMenuManager';
import AdminOrders from './pages/admin/AdminOrders';
import CreateAdminPage from './pages/admin/CreateAdminPage';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
   <Navbar />
  <Routes>
  <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Customer Routes */}
            <Route path="/menu" element={
              <ProtectedRoute>
          <MenuPage />
     </ProtectedRoute>
   } />
            <Route path="/cart" element={
      <ProtectedRoute>
        <CartPage />
              </ProtectedRoute>
   } />
     <Route path="/orders" element={
  <ProtectedRoute>
        <OrdersPage />
              </ProtectedRoute>
            } />
        <Route path="/change-password" element={
              <ProtectedRoute>
            <ChangePasswordPage />
              </ProtectedRoute>
   } />
    
       {/* Protected Admin Routes */}
            <Route path="/admin" element={
      <ProtectedRoute staffOnly>
    <AdminDashboard />
           </ProtectedRoute>
            } />
        <Route path="/admin/menu" element={
              <ProtectedRoute adminOnly>
    <AdminMenuManager />
       </ProtectedRoute>
      } />
   <Route path="/admin/orders" element={
     <ProtectedRoute staffOnly>
             <AdminOrders />
       </ProtectedRoute>
            } />
 <Route path="/admin/create-admin" element={
              <ProtectedRoute adminOnly>
                <CreateAdminPage />
         </ProtectedRoute>
       } />
     
            <Route path="*" element={<Navigate to="/" replace />} />
       </Routes>
          <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
