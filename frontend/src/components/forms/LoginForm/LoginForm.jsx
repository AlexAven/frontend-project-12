import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../../features/loginSlice';

const CustomForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.loginError);

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
      <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required={true}
          placeholder="Ваш ник"
          id="username"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">{t('loginPage.form.login')}</label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          required={true}
          placeholder="Пароль"
          type="password"
          id="password"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label className="form-label" htmlFor="password">
          {t('loginPage.form.password')}
        </label>
        {error && <div className="invalid-feedback">{t(error)}</div>}
      </div>
      <button type="submit" className="w-100 mb-5 btn btn-outline-primary">
        {t('loginPage.form.loginBtn')}
      </button>
    </form>
  );
};

export default CustomForm;
