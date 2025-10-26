import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { toast } from 'react-toastify';

const CreateAdminPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
  });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.createAdmin({
      email: formData.email,
        fullName: formData.fullName,
        password: formData.password
      });
      
      if (response.success) {
        toast.success(`Admin account created for ${response.fullName}!`);
  navigate('/admin');
      } else {
        toast.error(response.message || 'Failed to create admin account');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create admin account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center py-5">
      <div className="col-md-6">
    <div className="card minion-card shadow-lg">
        <div className="card-body p-5">
  <div className="text-center mb-4">
        <h2 className="fw-bold">Create Admin Account</h2>
    <p className="text-muted">Create a new administrator for Minion Cafe</p>
         </div>

        <form onSubmit={handleSubmit}>
       <div className="mb-3">
    <label className="form-label fw-semibold">Full Name</label>
          <input
       type="text"
          name="fullName"
       className="form-control form-control-lg"
           placeholder="Enter admin's full name"
           value={formData.fullName}
    onChange={handleChange}
            required
                  />
              </div>

             <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
     <input
         type="email"
        name="email"
     className="form-control form-control-lg"
              placeholder="Enter admin's email"
       value={formData.email}
               onChange={handleChange}
  required
      />
      </div>

       <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
         <input
     type="password"
              name="password"
   className="form-control form-control-lg"
         placeholder="Enter password"
                 value={formData.password}
    onChange={handleChange}
  required
       minLength="6"
         />
  <small className="text-muted">
        Minimum 6 characters with uppercase, lowercase, and number
       </small>
          </div>

     <div className="mb-4">
                  <label className="form-label fw-semibold">Confirm Password</label>
               <input
      type="password"
              name="confirmPassword"
    className="form-control form-control-lg"
   placeholder="Confirm password"
            value={formData.confirmPassword}
        onChange={handleChange}
           required
    />
           </div>

    <div className="alert alert-warning">
      <i className="bi bi-exclamation-triangle me-2"></i>
       <strong>Warning:</strong> This will create an account with full administrative privileges.
    </div>

         <button
                  type="submit"
               className="btn minion-btn w-100 py-3 fw-bold"
           disabled={loading}
    >
        {loading ? (
 <>
     <span className="spinner-border spinner-border-sm me-2"></span>
            Creating admin account...
        </>
      ) : (
  <>
   <i className="bi bi-person-plus-fill me-2"></i>
             Create Admin Account
         </>
                  )}
    </button>
              </form>

        <div className="text-center mt-4">
            <button 
          className="btn btn-link text-decoration-none"
    onClick={() => navigate('/admin')}
                >
          Back to Dashboard
  </button>
   </div>
 </div>
          </div>
        </div>
 </div>
  </div>
  );
};

export default CreateAdminPage;
