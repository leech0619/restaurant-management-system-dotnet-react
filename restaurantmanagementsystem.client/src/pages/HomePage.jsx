import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated, isAdmin, isStaff } = useAuth();

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Minion Cafe</h1>
          <p className="hero-subtitle">Bananally Good!</p>
          <p className="hero-tagline">Experience the most delicious food this side of Gru's lab</p>
          <Link to="/menu" className="btn hero-btn">
            View Our Menu
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <div className="text-center mb-5 fade-in">
          <h2 className="section-title">Why Choose Minion Cafe</h2>
          <p className="section-subtitle">One in a minion reasons to dine with us!</p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-award-fill"></i>
              </div>
              <h4 className="feature-title">Premium Quality</h4>
              <p className="text-muted">
                We use only the finest ingredients sourced from local farms to create unforgettable dishes
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-clock-history"></i>
              </div>
              <h4 className="feature-title">Fast Service</h4>
              <p className="text-muted">
                Quick preparation and delivery without compromising on quality or taste
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-heart-fill"></i>
              </div>
              <h4 className="feature-title">Made with Love</h4>
              <p className="text-muted">
                Every dish is prepared with passion and care by our expert chefs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-cream py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title text-start">Our Story</h2>
              <p className="lead mb-4">
                Welcome to Minion Cafe, where culinary excellence meets warm hospitality
              </p>
              <p className="text-muted mb-4">
                For over a decade, we've been serving our community with the finest cuisine,
                creating memorable dining experiences one dish at a time. Our menu features a
                perfect blend of traditional favorites and innovative creations, all prepared
                with fresh, locally-sourced ingredients.
              </p>
              <p className="text-muted mb-4">
                Whether you're joining us for a quick lunch, a romantic dinner, or a special
                celebration, our dedicated team is here to make your experience exceptional.
              </p>
              {!isAuthenticated && (
                <div className="d-flex gap-3 mt-4">
                  <Link to="/register" className="btn minion-btn">
                    Join Us Today
                  </Link>
                  <Link to="/login" className="btn btn-outline-custom">
                    Sign In
                  </Link>
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <img
                src="https://wallpapers.com/images/hd/eating-minions-despicable-me-2-w9hdu71zusd73ov2.jpg"
                alt="Restaurant Interior"
                className="img-fluid rounded-custom shadow-custom"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {isAuthenticated && (
        <div className="container py-5">
          <div className="card minion-card p-5 text-center">
            <h3 className="mb-4">Ready to Order?</h3>
            <p className="text-muted mb-4">
              Browse our delicious menu and place your order now
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              {(isAdmin() || isStaff()) ? (
                <Link to="/admin" className="btn minion-btn btn-lg">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/menu" className="btn minion-btn btn-lg">
                    <i className="bi bi-book me-2"></i>
                    Browse Menu
                  </Link>
                  <Link to="/orders" className="btn btn-outline-custom btn-lg">
                    <i className="bi bi-receipt me-2"></i>
                    My Orders
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Minion Cafe</h5>
              <p>Bananally good food for everyone!</p>
            </div>
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <p>
                <i className="bi bi-geo-alt me-2"></i>123 Jalan Minion<br />
                <i className="bi bi-telephone me-2"></i>+60123456789<br />
                <i className="bi bi-envelope me-2"></i>hello@minioncafe.com
              </p>
            </div>
            <div className="col-md-4">
              <h5>Operation Hours</h5>
              <p>
                Monday - Friday: 8am - 10pm<br />
                Saturday - Sunday: 9am - 11pm
              </p>
            </div>
          </div>
          <hr style={{opacity: 0.2}} className="my-4" />
          <div className="text-center">
            <p>&copy; 2025 Minion Cafe. All rights reserved. | Bananally Good Since 2025</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
