const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner">
      <div className="text-center">
        <div className="spinner-border spinner-border-minion" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
  <p className="mt-3 text-white fw-bold">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
