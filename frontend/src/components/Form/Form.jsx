import { Formik, Form } from 'formik';
import Input from '../Input/Input';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nickname: Yup.string().required('Nickname is required'),
  password: Yup.string().required('Password is required'),
});

const CustomForm = () => {
  return (
    <Formik
      initialValues={{ nickname: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={() => console.log('boom!')}
    >
      <Form action="" className="form">
        <Input name="nickname" id="nickname" placeholder="Ваш ник" />
        <Input name="password" id="password" placeholder="Пароль" />
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
          Войти
        </button>
      </Form>
    </Formik>
  );
};

export default CustomForm;
