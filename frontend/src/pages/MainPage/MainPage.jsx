/* eslint-disable react-hooks/exhaustive-deps */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { CgAddR as AddBtn } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { setUser } from '../../features/loginSlice';
import {
  getChannels,
  getMessages,
  openAddChannelModal,
  clearError,
  setChannelAdded,
  setChannelRenamed,
  setChannelDeleted,
} from '../../features/chatSlice';
import Channels from '../../components/Channels/Channels';
import Chat from '../../components/Chat/Chat';
import Input from '../../components/forms/SendMessageForm/SendMessageForm';
import AddChannelModal from '../../components/modals/AddChannelModal/AddChannelModal';

const MainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const serverErrors = useSelector((state) => state.chat.error);
  const channelAdded = useSelector((state) => state.chat.ui.modals.addChannel.isChannelAdded);
  const channelDeleted = useSelector((state) => state.chat.ui.modals.deleteChannel.isChannelDeleted);
  const channelRenamed = useSelector((state) => state.chat.ui.modals.renameChannel.isChannelRenamed);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const StorageToken = userData?.token;
    if (!StorageToken) {
      navigate('/login');
    } else {
      dispatch(setUser(userData));
      dispatch(getChannels());
      dispatch(getMessages());
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    if (serverErrors) {
      toast.error(t(serverErrors), {
        theme: 'colored',
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'bottom-right',
      });
      dispatch(clearError());
    }
  }, [serverErrors, dispatch]);

  useEffect(() => {
    if (channelAdded) {
      toast.success(t('chat.addModal.notification'), {
        theme: 'colored',
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'bottom-right',
      });
      dispatch(setChannelAdded(false));
    }
    if (channelDeleted) {
      toast.success(t('chat.deleteModal.notification'), {
        theme: 'colored',
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'bottom-right',
      });
      dispatch(setChannelDeleted(false));
    }
    if (channelRenamed) {
      toast.success(t('chat.renameModal.notification'), {
        theme: 'colored',
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'bottom-right',
      });
      dispatch(setChannelRenamed(false));
    }
  }, [channelAdded, channelDeleted, channelRenamed, dispatch]);

  const handleOpenModal = () => {
    dispatch(openAddChannelModal());
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('chat.channels.title')}</b>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
              onClick={handleOpenModal}
            >
              <AddBtn size={'1.6rem'} />
              <span className="visually-hidden">{t('chat.channels.addBtn')}</span>
            </button>
          </div>
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Chat />
            <Input />
          </div>
        </div>
      </div>
      <AddChannelModal />
      <ToastContainer />
    </div>
  );
};

export default MainPage;
