import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import menuService from '../services/menu.service';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const MenuPage = () => {
  const [menuByCategory, setMenuByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await menuService.getMenuItemsByCategory();
    setMenuByCategory(data);
    } catch (error) {
      console.error('Failed to load menu:', error);
      toast.error('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    toast.success(`${item.name} added to cart!`);
  };

  if (loading) return <LoadingSpinner message="Loading delicious menu..." />;

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
     <div className="container">
    <h1>Our Menu</h1>
          <p>Explore our delicious selection of handcrafted dishes</p>
        </div>
      </div>

      <div className="container py-5">
        {menuByCategory.map((category, idx) => (
          <div key={idx} className="mb-5 fade-in">
            <div className="text-center mb-4">
      <h2 className="section-title">{category.category}</h2>
              <div style={{width: '80px', height: '3px', background: 'var(--accent-color)', margin: '1rem auto'}}></div>
         </div>
            
     <div className="row g-4">
           {category.items.map((item) => (
  <div key={item.id} className="col-md-6 col-lg-4">
                  <div className="menu-item-card">
         {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="menu-item-image" />
        ) : (
     <div className="menu-item-image d-flex align-items-center justify-content-center">
           <span className="text-muted fs-4">{category.category}</span>
             </div>
 )}
        <div className="menu-item-details">
              <h5 className="menu-item-name">{item.name}</h5>
            <p className="menu-item-description">{item.description}</p>
            <div className="d-flex justify-content-between align-items-center mt-3">
           <span className="menu-item-price">RM {item.price.toFixed(2)}</span>
        <button 
  className="btn minion-btn"
            onClick={() => handleAddToCart(item)}
     disabled={!item.isAvailable}
       >
  <i className="bi bi-cart-plus me-2"></i>
    Add to Cart
    </button>
     </div>
 {!item.isAvailable && (
  <span className="badge bg-danger mt-2">Out of Stock</span>
          )}
          </div>
                  </div>
                </div>
           ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuPage;
