import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CgArrowRightR as SubmitBtn } from 'react-icons/cg';

import { postMessage } from '../../../features/chatSlice';

const Input = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const messageInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      if (formik.values.message.trim() !== '') {
        const messageInput = messageInputRef.current;
        messageInput.disabled = true;
        dispatch(postMessage(values.message)).finally(() => {
          messageInput.disabled = false;
          messageInput.focus();
        });
        formik.values.message = '';
        messageInput.value = '';
      }
    },
  });

  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            id="message"
            name="message"
            aria-label="Новое сообщение"
            placeholder={t('chat.form.placeholder')}
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.message}
            ref={messageInputRef}
          />
          <button type="submit" disabled="" className="btn btn-group-vertical">
            <SubmitBtn size={'1.5rem'} />
            <span className="visually-hidden">{t('chat.form.sendBtn')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
