import { Navigate, useLocation } from 'react-router-dom';
// import { useEffect } from 'react';

const RequireAuth = ({ children }) => {
  // const navigate = useNavigate();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem('userData')) || false;
  const token = userData.token;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // useEffect(() => {
  //   const data = localStorage.getItem('userData');
  //   if (!data) {
  //     navigate('/login', { replace: true });
  //   }
  // }, [token, navigate]);

  return children;
};

export default RequireAuth;
