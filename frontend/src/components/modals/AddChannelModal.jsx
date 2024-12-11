// import * as yup from 'yup';
// import { useFormik } from 'formik';

// import { useDispatch, useSelector } from 'react-redux';
// import { closeModal } from '../../features/chatSlice';
// import { addingChannelSucceeded, addingChannelFailed } from '../../features/validationSlice';

// const Modal = () => {
//   const dispatch = useDispatch();
//   const validation = useSelector((state) => state.validation.addingChannel);
//   const channelIds = useSelector((state) => state.chat.channels.ids);
//   const channels = useSelector((state) => state.chat.channels.entities);
//   const channelNames = channelIds.map((id) => channels[id].name);

//   const isOpen = useSelector((state) => state.chat.ui.modal.isOpen);

//   const schema = yup.object().shape({
//     name: yup.string().required().min(3).max(20).notOneOf(channelNames),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//     },
//     // validationSchema: schema,

//     // onSubmit: async (values) => {
//     // try {
//     //   await schema.validate(values);
//     //   alert(JSON.stringify(values, null, 2));
//     // } catch (error) {
//     //   console.log(error.errors[0]);
//     // }
//     // },

//     // onSubmit: (values) => {
//     //   // console.log('onSubmit', values);
//     //   dispatch(addingChannelValidate(values)).then(() => {
//     //     if (validation.status === 'succeeded') {
//     //       alert(JSON.stringify(values, null, 2));
//     //     }
//     //   });
//     //   // console.log('After onSubmit', values);
//     // },

//     onSubmit: (values) => {
//       schema
//         .validate(values)
//         .then(() => {
//           dispatch(addingChannelSucceeded(values));
//           handleClose();
//           // alert('УЪУ!');
//         })
//         .catch((error) => dispatch(addingChannelFailed(error)));
//     },
//   });

//   const handleClose = () => {
//     dispatch(closeModal());
//   };

//   return (
//     <div
//       className="modal fade"
//       id="addChannel"
//       tabIndex="-1"
//       aria-labelledby="addChannelLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog d-flex align-items-center justify-content-center h-100">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h1 className="modal-title fs-5" id="addChannelLabel">
//               Добавить канал
//             </h1>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={formik.handleSubmit} action="">
//               <input
//                 name="name"
//                 id="name"
//                 className={`mb-2 form-control ${validation.status === 'failed' ? 'is-invalid' : ''}`}
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//               />
//               <label className="visually-hidden" htmlFor="name">
//                 Имя канала
//               </label>
//               {validation.status === 'failed' ? (
//                 <div className="invalid-feedback">{validation.error}</div>
//               ) : null}
//               <div className="invalid-feedback"></div>
//             </form>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//               Отменить
//             </button>
//             <button onClick={formik.handleSubmit} className="btn btn-primary">
//               Отправить
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import * as yup from 'yup';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addingChannelSucceeded, addingChannelFailed } from '../../features/validationSlice';
import { closeAddChannelModal, postChannel } from '../../features/chatSlice';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const validation = useSelector((state) => state.validation.addingChannel);
  const channelIds = useSelector((state) => state.chat.channels.ids);
  const channels = useSelector((state) => state.chat.channels.entities);
  const channelNames = channelIds.map((id) => channels[id].name);

  const isOpen = useSelector((state) => state.chat.ui.modals.addChannel.isOpen);

  const schema = yup.object().shape({
    name: yup.string().required().min(3).max(20).notOneOf(channelNames),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      const channelName = { name: name.trim() };
      schema
        .validate(channelName)
        .then(() => {
          dispatch(addingChannelSucceeded(channelName));
          dispatch(postChannel(channelName));
          handleClose();
        })
        .catch((error) => dispatch(addingChannelFailed(error)));
    },
  });

  const handleClose = () => {
    dispatch(closeAddChannelModal());
    formik.resetForm();
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="channelName">
            <Form.Label>Имя канала</Form.Label>
            <Form.Control
              type="text"
              name="name"
              isInvalid={validation.status === 'failed'}
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">{validation.error}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
