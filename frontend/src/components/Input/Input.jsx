import { Field, ErrorMessage as Error } from 'formik';

const Input = ({ id, name, placeholder }) => {
  return (
    <div className="inputContainer">
      <div className="form-floating mb-3">
        <label htmlFor="username">Ваш ник</label>
        <Field name={name} id={id} placeholder={placeholder} />
      </div>
      <Error name={name} component="span"></Error>
    </div>
  );
};

export default Input;
