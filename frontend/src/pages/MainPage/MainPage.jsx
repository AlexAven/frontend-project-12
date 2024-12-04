import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from '../../features/loginSlice';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      dispatch(setUser(token));
    }
  }, [navigate, dispatch]);

  return <h1>Главная страница</h1>;
};

export default MainPage;
