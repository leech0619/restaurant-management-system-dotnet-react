import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import { toast } from 'react-toastify';

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
 confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
    toast.error('New passwords do not match!');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long!');
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error('New password must be different from current password!');
      return;
    }

 setLoading(true);

    try {
      await authService.changePassword(formData);
      toast.success('Password changed successfully!');
      setFormData({
        currentPassword: '',
 newPassword: '',
      confirmPassword: ''
  });
      setTimeout(() => {
        navigate('/');
   }, 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
    error.response?.data?.errors?.[0] ||
        'Failed to change password. Please check your current password.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
      <h1>Change Password</h1>
          <p>Update your account password</p>
  </div>
      </div>

    <div className="container py-5">
  <div className="row justify-content-center">
 <div className="col-md-6">
            <div className="card minion-card shadow-lg">
              <div className="card-body p-5">
            <div className="text-center mb-4">
            <i className="bi bi-shield-lock display-4 text-primary-custom mb-3"></i>
       <h2 className="fw-bold">Change Your Password</h2>
     <p className="text-muted">Enter your current password and choose a new one</p>
                </div>

        <form onSubmit={handleSubmit}>
        <div className="mb-3">
         <label className="form-label fw-semibold">Current Password</label>
        <div className="input-group">
          <input
type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
        className="form-control form-control-lg"
placeholder="Enter current password"
      value={formData.currentPassword}
          onChange={handleChange}
 required
              />
           <button
          className="btn btn-outline-secondary"
 type="button"
  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
         >
  <i className={`bi ${showCurrentPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
             </button>
   </div>
                  </div>

               <div className="mb-3">
        <label className="form-label fw-semibold">New Password</label>
           <div className="input-group">
   <input
      type={showNewPassword ? "text" : "password"}
   name="newPassword"
     className="form-control form-control-lg"
               placeholder="Enter new password"
     value={formData.newPassword}
               onChange={handleChange}
          required
      minLength="6"
          />
                  <button
           className="btn btn-outline-secondary"
     type="button"
             onClick={() => setShowNewPassword(!showNewPassword)}
          >
    <i className={`bi ${showNewPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
         </button>
         </div>
             <small className="text-muted">
            Minimum 6 characters with uppercase, lowercase, and number
 </small>
            </div>

   <div className="mb-4">
  <label className="form-label fw-semibold">Confirm New Password</label>
  <div className="input-group">
    <input
       type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
         className="form-control form-control-lg"
 placeholder="Confirm new password"
    value={formData.confirmPassword}
             onChange={handleChange}
        required
       />
     <button
  className="btn btn-outline-secondary"
            type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
   <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
           </button>
 </div>
         </div>

   <div className="alert alert-info">
         <i className="bi bi-info-circle me-2"></i>
     <strong>Security Tip:</strong> Use a strong password with a mix of letters, numbers, and symbols.
    </div>

  <button
            type="submit"
     className="btn minion-btn w-100 py-3 fw-bold mb-3"
         disabled={loading}
     >
              {loading ? (
        <>
   <span className="spinner-border spinner-border-sm me-2"></span>
Changing Password...
     </>
         ) : (
         <>
     <i className="bi bi-check-circle me-2"></i>
       Change Password
                </>
  )}
  </button>

         <button
           type="button"
    className="btn btn-outline-custom w-100"
        onClick={() => navigate(-1)}
        >
 <i className="bi bi-arrow-left me-2"></i>
         Cancel
           </button>
       </form>
    </div>
  </div>
</div>
      </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
