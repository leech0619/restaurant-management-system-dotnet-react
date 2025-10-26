import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin, isStaff } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg minion-navbar">
  <div className="container-fluid px-4">
  <Link className="navbar-brand" to="/">
          Minion Cafe
        </Link>
        
   <button
     className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
     aria-expanded="false"
          aria-label="Toggle navigation"
        >
    <span className="navbar-toggler-icon"></span>
</button>
        
   <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
    <Link className="nav-link" to="/">
      <i className="bi bi-house-door me-1"></i> Home
     </Link>
     </li>

          {isAuthenticated ? (
       <>
                <li className="nav-item">
           <Link className="nav-link" to="/menu">
      <i className="bi bi-book me-1"></i> Menu
          </Link>
                </li>

    {!isAdmin() && !isStaff() && (
            <>
       <li className="nav-item position-relative">
       <Link className="nav-link" to="/cart">
         <i className="bi bi-cart3 me-1"></i> Cart
      {getCartCount() > 0 && (
   <span className="cart-badge">{getCartCount()}</span>
         )}
        </Link>
           </li>
        <li className="nav-item">
 <Link className="nav-link" to="/orders">
               <i className="bi bi-receipt me-1"></i> My Orders
            </Link>
           </li>
      </>
      )}

    {(isAdmin() || isStaff()) && (
   <>
  <li className="nav-item">
    <Link className="nav-link" to="/admin">
      <i className="bi bi-speedometer2 me-1"></i> Dashboard
         </Link>
   </li>
            <li className="nav-item">
         <Link className="nav-link" to="/admin/orders">
       <i className="bi bi-list-check me-1"></i> Orders
    </Link>
        </li>
    </>
     )}

    {isAdmin() && (
         <li className="nav-item">
   <Link className="nav-link" to="/admin/menu">
          <i className="bi bi-pencil-square me-1"></i> Manage Menu
            </Link>
        </li>
       )}

             <li className="nav-item dropdown">
       <a
         className="nav-link dropdown-toggle"
  href="#"
   id="navbarDropdown"
    role="button"
          data-bs-toggle="dropdown"
        aria-expanded="false"
              >
           <i className="bi bi-person-circle me-1"></i>
                {user?.fullName}
              </a>
       <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
          <li>
        <span className="dropdown-item-text small">
        <strong>Role:</strong> {user?.role}
  </span>
            </li>
   <li><hr className="dropdown-divider" /></li>
             <li>
     <Link className="dropdown-item" to="/change-password">
    <i className="bi bi-key-fill me-2"></i> Change Password
           </Link>
     </li>
        {isAdmin() && (
                  <>
       <li><hr className="dropdown-divider" /></li>
             <li>
           <Link className="dropdown-item" to="/admin/create-admin">
       <i className="bi bi-person-plus-fill me-2"></i> Create Admin
       </Link>
         </li>
 </>
          )}
             <li><hr className="dropdown-divider" /></li>
        <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
  <i className="bi bi-box-arrow-right me-2"></i> Logout
        </button>
       </li>
     </ul>
   </li>
   </>
 ) : (
  <>
     <li className="nav-item">
  <Link className="nav-link" to="/login">
    <i className="bi bi-box-arrow-in-right me-1"></i> Login
     </Link>
</li>
          <li className="nav-item">
       <Link className="btn minion-btn ms-2" to="/register">
    Sign Up
      </Link>
        </li>
          </>
   )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
