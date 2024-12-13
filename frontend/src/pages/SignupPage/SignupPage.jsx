import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Form from '../../components/forms/SignupForm/SignupForm';

const SignupPage = () => {
  const navigate = useNavigate();

  const token = useSelector((state) => state.login.entities?.token);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className='card shadow-sm"'>
          <div className="card-body row m-0 pt-4 px-0 pb-0">
            <div className="row align-items-center justify-content-center">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src="./src/assets/signup.jpg" alt="signup" />
              </div>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
