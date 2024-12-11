import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { closeDeleteChannelModal } from '../../features/chatSlice';

const DeleteChannelModal = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.chat.ui.modals.deleteChannel.isOpen);

  const handleClose = () => {
    dispatch(closeDeleteChannelModal());
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Вы уверены?</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="primary">Отправить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
