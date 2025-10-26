import { useState, useEffect } from 'react';
import orderService from '../../services/order.service';
import menuService from '../../services/menu.service';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    menuItems: 0,
    todayOrders: 0,
    todayRevenue: 0,
    activeCustomers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
  try {
      const [orders, menu] = await Promise.all([
        orderService.getAllOrders(),
        menuService.getAllMenuItems()
      ]);

      const totalRevenue = orders
 .filter(o => o.status === 3)
    .reduce((sum, o) => sum + o.totalAmount, 0);

      const pendingOrders = orders.filter(o => o.status === 0).length;
      const completedOrders = orders.filter(o => o.status === 3).length;

      const today = new Date();
  today.setHours(0, 0, 0, 0);
      
      const todayOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt);
    orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      });

 const todayRevenue = todayOrders
     .filter(o => o.status === 3)
        .reduce((sum, o) => sum + o.totalAmount, 0);

      const uniqueCustomers = new Set(orders.map(o => o.customerId)).size;

      const itemCount = {};
      orders.forEach(order => {
   order.items.forEach(item => {
          if (itemCount[item.menuItemName]) {
        itemCount[item.menuItemName] += item.quantity;
          } else {
 itemCount[item.menuItemName] = item.quantity;
          }
        });
      });

    const popular = Object.entries(itemCount)
        .sort(([, a], [, b]) => b - a)
     .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

      setStats({
  totalOrders: orders.length,
        pendingOrders,
        completedOrders,
        totalRevenue,
  menuItems: menu.length,
        todayOrders: todayOrders.length,
        todayRevenue,
        activeCustomers: uniqueCustomers
      });

      setRecentOrders(orders.slice(0, 5));
      setPopularItems(popular);
 } catch (error) {
      toast.error('Failed to load dashboard data');
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

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;

  return (
    <>
      <div className="page-header">
        <div className="container">
     <h1>Admin Dashboard</h1>
          <p>Welcome to Minion Cafe Management System</p>
        </div>
  </div>

      <div className="container py-5">
        <div className="row g-4 mb-5">
  <div className="col-lg-3 col-md-6">
    <div className="stat-card stat-card-blue">
       <div className="d-flex justify-content-between align-items-start">
  <div>
   <p className="text-muted mb-1 fw-semibold">Total Orders</p>
         <h2 className="display-5 fw-bold mb-0">{stats.totalOrders}</h2>
         <small className="text-success">
            <i className="bi bi-arrow-up me-1"></i>All time
   </small>
         </div>
 <div className="stat-icon">
       <i className="bi bi-receipt fs-1"></i>
      </div>
        </div>
    </div>
       </div>

          <div className="col-lg-3 col-md-6">
            <div className="stat-card stat-card-yellow">
              <div className="d-flex justify-content-between align-items-start">
          <div>
       <p className="text-muted mb-1 fw-semibold">Pending Orders</p>
     <h2 className="display-5 fw-bold mb-0">{stats.pendingOrders}</h2>
        <small className="text-warning">
 <i className="bi bi-clock me-1"></i>Awaiting action
      </small>
    </div>
  <div className="stat-icon">
         <i className="bi bi-hourglass-split fs-1"></i>
        </div>
    </div>
     </div>
  </div>

          <div className="col-lg-3 col-md-6">
        <div className="stat-card stat-card-green">
        <div className="d-flex justify-content-between align-items-start">
          <div>
       <p className="text-muted mb-1 fw-semibold">Total Revenue</p>
            <h2 className="display-5 fw-bold mb-0">RM {stats.totalRevenue.toFixed(2)}</h2>
          <small className="text-success">
      <i className="bi bi-graph-up me-1"></i>{stats.completedOrders} completed
         </small>
     </div>
   <div className="stat-icon">
 <i className="bi bi-currency-dollar fs-1"></i>
       </div>
   </div>
       </div>
 </div>

      <div className="col-lg-3 col-md-6">
      <div className="stat-card stat-card-red">
         <div className="d-flex justify-content-between align-items-start">
    <div>
   <p className="text-muted mb-1 fw-semibold">Active Customers</p>
      <h2 className="display-5 fw-bold mb-0">{stats.activeCustomers}</h2>
             <small className="text-info">
           <i className="bi bi-people me-1"></i>Total customers
      </small>
     </div>
            <div className="stat-icon">
        <i className="bi bi-person-check fs-1"></i>
   </div>
   </div>
            </div>
          </div>
        </div>

  <div className="row g-4 mb-5">
          <div className="col-lg-4 col-md-6">
            <div className="card minion-card h-100">
    <div className="card-body">
   <h5 className="card-title text-primary-custom fw-bold mb-3">
   <i className="bi bi-calendar-day me-2"></i>Today Orders
   </h5>
            <h3 className="display-4 fw-bold text-accent mb-2">{stats.todayOrders}</h3>
    <p className="text-muted mb-0">Orders placed today</p>
      </div>
         </div>
   </div>

     <div className="col-lg-4 col-md-6">
  <div className="card minion-card h-100">
    <div className="card-body">
     <h5 className="card-title text-primary-custom fw-bold mb-3">
           <i className="bi bi-cash-stack me-2"></i>Today Revenue
     </h5>
<h3 className="display-4 fw-bold text-success mb-2">RM {stats.todayRevenue.toFixed(2)}</h3>
     <p className="text-muted mb-0">Revenue earned today</p>
            </div>
            </div>
     </div>

        <div className="col-lg-4 col-md-6">
            <div className="card minion-card h-100">
   <div className="card-body">
      <h5 className="card-title text-primary-custom fw-bold mb-3">
<i className="bi bi-list-check me-2"></i>Menu Items
          </h5>
          <h3 className="display-4 fw-bold text-primary-custom mb-2">{stats.menuItems}</h3>
       <p className="text-muted mb-0">Active items on menu</p>
         </div>
   </div>
    </div>
        </div>

        <div className="row g-4 mb-5">
   <div className="col-lg-6">
    <div className="card minion-card h-100">
       <div className="card-body">
<h5 className="card-title text-primary-custom fw-bold mb-4">
          <i className="bi bi-star-fill me-2"></i>Popular Menu Items
      </h5>
     {popularItems.length === 0 ? (
    <p className="text-muted text-center py-4">No order data available yet</p>
                ) : (
<div className="list-group list-group-flush">
    {popularItems.map((item, index) => (
   <div key={index} className="list-group-item border-0 px-0 py-3">
     <div className="d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
          <div className="badge bg-accent text-dark fw-bold me-3" style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
            {index + 1}
     </div>
           <div>
           <h6 className="mb-0 fw-semibold">{item.name}</h6>
      <small className="text-muted">{item.count} orders</small>
     </div>
     </div>
               <div className="text-end">
       <div className="progress" style={{ width: '100px', height: '8px' }}>
     <div 
     className="progress-bar bg-accent" 
    role="progressbar" 
     style={{ width: `${(item.count / popularItems[0].count) * 100}%` }}
               ></div>
       </div>
      </div>
       </div>
            </div>
         ))}
     </div>
         )}
              </div>
            </div>
       </div>

          <div className="col-lg-6">
      <div className="card minion-card h-100">
  <div className="card-body">
            <h5 className="card-title text-primary-custom fw-bold mb-4">
    <i className="bi bi-clock-history me-2"></i>Recent Orders
       </h5>
     {recentOrders.length === 0 ? (
        <p className="text-muted text-center py-4">No orders yet</p>
   ) : (
                  <div className="list-group list-group-flush">
      {recentOrders.map((order) => (
          <div key={order.id} className="list-group-item border-0 px-0 py-3">
   <div className="d-flex justify-content-between align-items-start">
      <div>
         <h6 className="mb-1 fw-semibold">Order #{order.id}</h6>
          <small className="text-muted">
        <i className="bi bi-person me-1"></i>{order.customerName}
 </small>
      <br />
  <small className="text-muted">
    <i className="bi bi-clock me-1"></i>
    {new Date(order.createdAt).toLocaleString()}
       </small>
   </div>
        <div className="text-end">
    <div className="mb-2">{getStatusBadge(order.status)}</div>
    <span className="fw-bold text-success">RM {order.totalAmount.toFixed(2)}</span>
                     </div>
            </div>
    </div>
  ))}
   </div>
    )}
   </div>
   </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12">
      <div className="card minion-card">
 <div className="card-body p-4">
 <h5 className="card-title text-primary-custom fw-bold mb-4">
      <i className="bi bi-lightning-charge-fill me-2"></i>Quick Actions
             </h5>
          <div className="row g-3">
       <div className="col-lg-3 col-md-6">
     <a href="/admin/orders" className="btn btn-outline-custom w-100 py-3 d-flex align-items-center justify-content-center">
     <i className="bi bi-list-check fs-4 me-2"></i>
      <span className="fw-semibold">Manage Orders</span>
      </a>
    </div>
            <div className="col-lg-3 col-md-6">
     <a href="/admin/menu" className="btn btn-outline-custom w-100 py-3 d-flex align-items-center justify-content-center">
               <i className="bi bi-pencil-square fs-4 me-2"></i>
     <span className="fw-semibold">Manage Menu</span>
       </a>
       </div>
         <div className="col-lg-3 col-md-6">
          <a href="/admin/create-admin" className="btn btn-outline-custom w-100 py-3 d-flex align-items-center justify-content-center">
     <i className="bi bi-person-plus-fill fs-4 me-2"></i>
      <span className="fw-semibold">Create Admin</span>
       </a>
   </div>
                <div className="col-lg-3 col-md-6">
    <button className="btn minion-btn w-100 py-3 d-flex align-items-center justify-content-center" onClick={fetchDashboardData}>
           <i className="bi bi-arrow-clockwise fs-4 me-2"></i>
 <span className="fw-semibold">Refresh Data</span>
    </button>
        </div>
        </div>
      </div>
       </div>
    </div>
        </div>

      <div className="row g-4 mt-3">
          <div className="col-12">
            <div className="card minion-card">
  <div className="card-body p-4">
                <h5 className="card-title text-primary-custom fw-bold mb-3">
        <i className="bi bi-info-circle-fill me-2"></i>System Information
   </h5>
 <div className="row">
        <div className="col-md-4">
        <p className="mb-2"><strong>Version:</strong> <span className="badge bg-secondary">1.0.0</span></p>
        </div>
          <div className="col-md-4">
           <p className="mb-2"><strong>Database:</strong> <span className="badge bg-info">MinionCafeDB</span></p>
         </div>
 <div className="col-md-4">
           <p className="mb-2"><strong>Status:</strong> <span className="badge bg-success">Active</span></p>
              </div>
                </div>
       </div>
   </div>
        </div>
        </div>
  </div>
  </>
  );
};

export default AdminDashboard;
