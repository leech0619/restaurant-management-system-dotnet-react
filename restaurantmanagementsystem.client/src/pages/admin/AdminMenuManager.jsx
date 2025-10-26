import { useState, useEffect } from 'react';
import menuService from '../../services/menu.service';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';

const AdminMenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', category: 'Breakfast', price: '', isAvailable: true, imageUrl: ''
  });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await menuService.getAllMenuItems();
      setMenuItems(data);
    } catch (error) {
      console.error('Failed to load menu:', error);
      toast.error('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await menuService.updateMenuItem(editItem.id, { ...formData, id: editItem.id });
        toast.success('Menu item updated!');
      } else {
        await menuService.createMenuItem(formData);
        toast.success('Menu item created!');
      }
      setShowModal(false);
      setEditItem(null);
      setFormData({ name: '', description: '', category: 'Breakfast', price: '', isAvailable: true, imageUrl: '' });
      fetchMenu();
    } catch (error) {
      console.error('Failed to save menu item:', error);
      toast.error('Failed to save menu item');
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await menuService.deleteMenuItem(id);
      toast.success('Menu item deleted!');
      fetchMenu();
    } catch (error) {
      console.error('Failed to delete menu item:', error);
      toast.error('Failed to delete menu item');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Manage Menu</h1>
          <p>Add, edit, and manage your menu items</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary-custom fw-bold">Menu Items</h2>
          <button className="btn minion-btn" onClick={() => { setShowModal(true); setEditItem(null); setFormData({ name: '', description: '', category: 'Breakfast', price: '', isAvailable: true, imageUrl: '' }); }}>
            <i className="bi bi-plus-circle me-2"></i>Add Item
          </button>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    {item.isAvailable ? (
                      <span className="badge bg-success">Yes</span>
                    ) : (
                      <span className="badge bg-danger">No</span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-custom me-2" onClick={() => handleEdit(item)}>
                      <i className="bi bi-pencil me-1"></i>Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editItem ? 'Edit' : 'Add'} Menu Item</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input className="form-control" placeholder="Item name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" placeholder="Item description" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image URL</label>
                      <input className="form-control" placeholder="https://example.com/image.jpg" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select className="form-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option>Breakfast</option>
                        <option>Main Course</option>
                        <option>Beverages</option>
                        <option>Desserts</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input type="number" step="0.01" className="form-control" placeholder="0.00" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                    </div>
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="availableCheck" checked={formData.isAvailable} onChange={e => setFormData({...formData, isAvailable: e.target.checked})} />
                      <label className="form-check-label" htmlFor="availableCheck">Available</label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn minion-btn">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminMenuManager;
