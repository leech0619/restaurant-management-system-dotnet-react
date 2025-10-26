import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import orderService from '../services/order.service';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.warning('Your cart is empty!');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({
       menuItemId: item.id,
       quantity: item.quantity
        }))
      };

      await orderService.createOrder(orderData);
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
};

  if (cartItems.length === 0) {
    return (
      <>
        {/* Page Header */}
        <div className="page-header">
       <div className="container">
      <h1>Your Cart</h1>
<p>Review and manage your order</p>
 </div>
        </div>

        <div className="container py-5 text-center">
          <div className="card minion-card p-5 mx-auto" style={{ maxWidth: '500px' }}>
            <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
  <h3>Your cart is empty</h3>
 <p className="text-muted">Add some delicious items from our menu!</p>
            <button className="btn minion-btn mt-3" onClick={() => navigate('/menu')}>
   Browse Menu
     </button>
      </div>
 </div>
      </>
    );
  }

  return (
  <>
      {/* Page Header */}
      <div className="page-header">
 <div className="container">
<h1>Your Cart</h1>
    <p>Review your items before placing order</p>
        </div>
      </div>

      <div className="container py-5">
    <div className="row">
     <div className="col-md-8">
            {cartItems.map((item) => (
 <div key={item.id} className="card minion-card mb-3">
         <div className="card-body">
        <div className="row align-items-center">
   <div className="col-md-6">
    <h5 className="fw-bold text-primary-custom">{item.name}</h5>
 <p className="text-muted mb-0">RM {item.price.toFixed(2)} each</p>
   </div>
      <div className="col-md-3">
    <div className="input-group">
            <button 
      className="btn btn-outline-secondary"
      onClick={() => updateQuantity(item.id, item.quantity - 1)}
       >
       -
    </button>
  <input 
       type="number" 
            className="form-control text-center" 
         value={item.quantity}
         onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
             min="1"
/>
    <button 
     className="btn btn-outline-secondary"
      onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
       +
             </button>
  </div>
   </div>
   <div className="col-md-2 text-end">
       <h5 className="text-success fw-bold">
  RM {(item.price * item.quantity).toFixed(2)}
      </h5>
       </div>
         <div className="col-md-1 text-end">
  <button 
           className="btn btn-danger btn-sm"
    onClick={() => removeFromCart(item.id)}
  >
   <i className="bi bi-trash"></i>
      </button>
       </div>
  </div>
       </div>
  </div>
          ))}
          </div>

          <div className="col-md-4">
 <div className="card minion-card">
<div className="card-body">
     <h4 className="fw-bold mb-4 text-primary-custom">Order Summary</h4>
 <div className="d-flex justify-content-between mb-3">
    <span>Subtotal:</span>
           <span className="fw-bold">RM {getCartTotal().toFixed(2)}</span>
    </div>
   <hr />
 <div className="d-flex justify-content-between mb-4">
 <h5>Total:</h5>
 <h5 className="text-success fw-bold">RM {getCartTotal().toFixed(2)}</h5>
    </div>
     <button 
           className="btn minion-btn w-100 py-3 fw-bold"
            onClick={handlePlaceOrder}
        disabled={loading}
           >
   {loading ? 'Placing Order...' : 'Place Order'}
                </button>
       </div>
            </div>
    </div>
</div>
      </div>
    </>
  );
};

export default CartPage;
