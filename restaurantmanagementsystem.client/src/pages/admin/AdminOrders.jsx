import { useState, useEffect } from 'react';
import orderService from '../../services/order.service';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      let data;
      if (filter === 'all') {
        data = await orderService.getAllOrders();
      } else {
        data = await orderService.getOrdersByStatus(parseInt(filter));
      }
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, parseInt(newStatus));
      toast.success('Order status updated successfully!');
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusBadge = (status) => {
    const badges = { 0: 'status-pending', 1: 'status-inprogress', 2: 'status-served', 3: 'status-completed' };
    const labels = { 0: 'Pending', 1: 'In Progress', 2: 'Served', 3: 'Completed' };
    return <span className={`status-badge ${badges[status]}`}>{labels[status]}</span>;
  };

  const getStatusOptions = () => [
    { value: 0, label: 'Pending' },
    { value: 1, label: 'In Progress' },
    { value: 2, label: 'Served' },
    { value: 3, label: 'Completed' },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>All Orders</h1>
          <p>Manage and track all customer orders</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="card minion-card p-4 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h4 className="mb-0">Order Management</h4>
            </div>
            <div className="col-md-6">
              <select 
                className="form-select" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="0">Pending</option>
                <option value="1">In Progress</option>
                <option value="2">Served</option>
                <option value="3">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="card minion-card p-5 text-center">
            <i className="bi bi-inbox display-1 text-muted mb-3"></i>
            <h3>No orders found</h3>
            <p className="text-muted">No orders match the selected filter</p>
          </div>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div key={order.id} className="col-12">
                <div className="card minion-card">
                  <div className="card-body p-4">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <h5 className="fw-bold mb-2">Order #{order.id}</h5>
                        <p className="text-muted mb-1">
                          <i className="bi bi-person me-2"></i>
                          <strong>Customer:</strong> {order.customerName}
                        </p>
                        <p className="text-muted mb-0">
                          <i className="bi bi-clock me-2"></i>
                          <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <div className="mb-3">
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="d-flex align-items-center justify-content-md-end gap-2">
                          <label className="small fw-semibold mb-0">Update Status:</label>
                          <select
                            className="form-select form-select-sm"
                            style={{ width: 'auto', minWidth: '180px' }}
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          >
                            {getStatusOptions().map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-sm mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Item</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-end">Unit Price</th>
                            <th className="text-end">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr key={item.id}>
                              <td>{item.menuItemName}</td>
                              <td className="text-center">{item.quantity}</td>
                              <td className="text-end">RM {item.unitPrice.toFixed(2)}</td>
                              <td className="text-end fw-semibold">RM {item.subtotal.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="text-end border-top pt-3 mt-3">
                      <h5 className="text-success fw-bold mb-0">
                        Total: RM {order.totalAmount.toFixed(2)}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrders;
