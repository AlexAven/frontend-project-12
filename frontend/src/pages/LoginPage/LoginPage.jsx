import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Form from '../../components/forms/LoginForm/LoginForm';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const token = useSelector((state) => state.login.entities?.token);

  useEffect(() => {
    if (localStorage.getItem('userData') && token) {
      navigate('fromPage');
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
                <img className="rounded-circle" src="./src/assets/login.jpg" alt="login" />
              </div>
              <Form />
            </div>
            <div className=" card-footer p-4">
              <div className="login__footer-text text-center">
                <span className="mx-2">{t('loginPage.hasAccount')}</span>
                <Link to={'/signup'}>{t('loginPage.regLink')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
