import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Form from '../../components/Form/Form';

const LoginPage = () => {
  const token = useSelector((state) => state.entities?.currentUser.token);
  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem('token');
    if (token) {
    // if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className='card shadow-sm"'>
          <div className="card-body row m-0 pt-4 px-0 pb-0">
            <div className="row align-items-center justify-content-center">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img className="rounded-circle" src="./src/assets/login.jpg" alt="login" />
                </div>
              </div>
              <Form />
            </div>
            <div className=" card-footer p-4">
              <div className="login__footer-text text-center">
                <span className="mx-2">Нет аккаунта?</span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
