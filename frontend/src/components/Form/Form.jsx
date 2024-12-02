import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { loginUser } from '../../features/loginSlice';

const CustomForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required={true}
          placeholder="Ваш ник"
          id="username"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          required={true}
          placeholder="Пароль"
          type="password"
          id="password"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label className="form-label" htmlFor="password">
          Пароль
        </label>
      </div>
      <button type="submit" className="w-100 mb-5 btn btn-outline-primary">
        Войти
      </button>
    </form>
  );
};

export default CustomForm;
