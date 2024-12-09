import { useRef } from 'react';

const Modal = () => {
  const formRef = useRef();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <div
      className="modal fade"
      id="addChannel"
      tabIndex="-1"
      aria-labelledby="addChannelLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog d-flex align-items-center justify-content-center h-100">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addChannelLabel">
              Добавить канал
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form ref={formRef} action="">
              <input name="name" id="name" className="mb-2 form-control" value="" />
              <label className="visually-hidden" htmlFor="name">
                Имя канала
              </label>
              <div className="invalid-feedback"></div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Отменить
            </button>
            <button onClick={handleSubmit} type="button" className="btn btn-primary">
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
