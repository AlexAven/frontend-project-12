import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { closeDeleteChannelModal, deleteChannel, deleteMessage } from '../../../features/chatSlice';

const DeleteChannelModal = () => {
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
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Уверены?</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">
          Отменить
        </Button>
        <Button
          onClick={() => {
            handleDelete(id);
          }}
          variant="danger"
        >
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
