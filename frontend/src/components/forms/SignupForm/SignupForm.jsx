import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { signupUser } from '../../../features/loginSlice';

const SignupForm = () => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.login?.signupError);

  const schema = yup.object().shape({
    username: yup.string().required().min(3).max(20),
    password: yup.string().required().min(6),
    passwordConfirmation: yup
      .string()
      .required()
      .oneOf([yup.ref('password')]),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(signupUser(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">Регистрация</h1>

      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          placeholder="Имя пользователя"
          id="username"
          className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''} ${error ? 'is-invalid' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <label htmlFor="username">Имя пользователя</label>
        {formik.touched.username && formik.errors.username ? (
          <div className="invalid-feedback">{formik.errors.username}</div>
        ) : null}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>

      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="new-password"
          placeholder="Пароль"
          type="password"
          id="password"
          className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <label htmlFor="password">Пароль</label>
        {formik.touched.password && formik.errors.password ? (
          <div className="invalid-feedback">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="form-floating mb-4">
        <input
          name="passwordConfirmation"
          autoComplete="new-password"
          placeholder="Подтвердите пароль"
          type="password"
          id="passwordConfirmation"
          className={`form-control ${formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? 'is-invalid' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirmation}
        />
        <label htmlFor="passwordConfirmation">Подтвердите пароль</label>
        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
          <div className="invalid-feedback">{formik.errors.passwordConfirmation}</div>
        ) : null}
      </div>

      <button type="submit" className="w-100 mb-5 btn btn-outline-primary">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default SignupForm;
