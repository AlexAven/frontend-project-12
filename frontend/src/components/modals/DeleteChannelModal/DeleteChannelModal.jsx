import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { closeDeleteChannelModal, deleteChannel, deleteMessage } from '../../../features/chatSlice';

const DeleteChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const messagesState = useSelector((state) => state.chat.messages);
  const id = useSelector((state) => state.chat.ui.modals.deleteChannel.channelId);
  const isOpen = useSelector((state) => state.chat.ui.modals.deleteChannel.isOpen);

  const handleClose = () => {
    dispatch(closeDeleteChannelModal());
  };

  const handleDelete = (id) => {
    const channelMessagesIds = messagesState.ids.filter(
      (messageId) => messagesState.entities[messageId].channelId === id,
    );

    dispatch(deleteChannel(id));
    handleClose();

    channelMessagesIds.map((item) => {
      const message = messagesState.entities[item];
      dispatch(deleteMessage(message.id));
    });
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.deleteModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{t('chat.deleteModal.desription')}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">
          {t('chat.deleteModal.cancelBtn')}
        </Button>
        <Button
          onClick={() => {
            handleDelete(id);
          }}
          variant="danger"
        >
          {t('chat.deleteModal.sendBtn')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
