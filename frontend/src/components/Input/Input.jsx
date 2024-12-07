import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { CgArrowRightR as SubmitBtn } from 'react-icons/cg';
import { postMessage } from '../../features/chatSlice';

const Input = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      if (formik.values.message.trim() !== '') {
        const messageInput = document.querySelector('#message');
        messageInput.disabled = true;
        dispatch(postMessage(values.message)).finally(() => (messageInput.disabled = false));
        formik.values.message = '';
        messageInput.value = '';
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            id="message"
            name="message"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
          <button type="submit" disabled="" className="btn btn-group-vertical">
            <SubmitBtn size={'1.5rem'} />
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
