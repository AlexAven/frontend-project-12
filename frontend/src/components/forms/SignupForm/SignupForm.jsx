import * as yup from 'yup';
import { setLocale } from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { signupUser } from '../../../features/loginSlice';

const SignupForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.login?.signupError);

  const customMessages = {
    mixed: {
      required: t('validation.emptyField'),
    },
    string: {
      min: ({ min }) => (min === 3 ? t('validation.length') : t('validation.min')),
      max: t('validation.length'),
      oneOf: t('validation.passwordConfirmation'),
      notOneOf: t('validation.uniqName'),
    },
  };

  setLocale(customMessages);

  const schema = yup.object().shape({
    username: yup.string().required().min(3).max(20),
    password: yup.string().required().min(6),
    passwordConfirmation: yup
      .string()
      .required()
      .oneOf([yup.ref('password')], t('validation.passwordConfirmation')),
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
      <h1 className="text-center mb-4">{t('signupPage.title')}</h1>

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
        <label htmlFor="username">{t('signupPage.form.name')}</label>
        {formik.touched.username && formik.errors.username ? (
          <div className="invalid-feedback">{formik.errors.username}</div>
        ) : null}
        {error && <div className="invalid-feedback">{t(error)}</div>}
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
        <label htmlFor="password">{t('signupPage.form.password')}</label>
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
        <label htmlFor="passwordConfirmation">{t('signupPage.form.passwordConfirm')}</label>
        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
          <div className="invalid-feedback">{formik.errors.passwordConfirmation}</div>
        ) : null}
      </div>

      <button type="submit" className="w-100 mb-5 btn btn-outline-primary">
        {t('signupPage.form.sendBtn')}
      </button>
    </form>
  );
};

export default SignupForm;
