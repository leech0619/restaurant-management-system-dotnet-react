import { useState, useEffect } from 'react';
import orderService from '../services/order.service';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      0: 'status-pending',
      1: 'status-inprogress',
      2: 'status-served',
      3: 'status-completed'
    };
    const labels = { 0: 'Pending', 1: 'In Progress', 2: 'Served', 3: 'Completed' };
    return <span className={`status-badge ${badges[status]}`}>{labels[status]}</span>;
  };

  if (loading) return <LoadingSpinner message="Loading your orders..." />;

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>My Orders</h1>
          <p>Track your order history and status</p>
        </div>
      </div>

      <div className="container py-5">
        {orders.length === 0 ? (
          <div className="card minion-card p-5 text-center">
            <i className="bi bi-inbox display-1 text-muted mb-3"></i>
            <h3>No orders yet</h3>
            <p className="text-muted">Start ordering from our delicious menu!</p>
            <a href="/menu" className="btn minion-btn mt-3">
              Browse Menu
            </a>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="card minion-card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="fw-bold mb-1 text-primary-custom">Order #{order.id}</h5>
                    <small className="text-muted">
                      <i className="bi bi-clock me-1"></i>
                      {new Date(order.createdAt).toLocaleString()}
                    </small>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.menuItemName}</td>
                          <td>{item.quantity}</td>
                          <td>RM {item.unitPrice.toFixed(2)}</td>
                          <td>RM {item.subtotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-end border-top pt-3 mt-3">
                  <h5 className="text-success fw-bold">
                    Total: RM {order.totalAmount.toFixed(2)}
                  </h5>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OrdersPage;
