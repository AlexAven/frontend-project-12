import * as yup from 'yup';
import { setLocale } from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { addingChannelSucceeded, addingChannelFailed } from '../../../features/validationSlice';
import { closeAddChannelModal, postChannel } from '../../../features/chatSlice';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validation = useSelector((state) => state.validation.addingChannel);
  const channelIds = useSelector((state) => state.chat.channels.ids);
  const channels = useSelector((state) => state.chat.channels.entities);
  const channelNames = channelIds.map((id) => channels[id].name);
  const isOpen = useSelector((state) => state.chat.ui.modals.addChannel.isOpen);

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
    name: yup.string().required().min(3).max(20).notOneOf(channelNames, t('validation.uniqName')),
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
        <Modal.Title>{t('chat.addModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="channelName">
            <Form.Label>{t('chat.addModal.desription')}</Form.Label>
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
          {t('chat.addModal.cancelBtn')}
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          {t('chat.addModal.sendBtn')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
