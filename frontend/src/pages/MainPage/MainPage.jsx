import { CgAddR as AddBtn } from 'react-icons/cg';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from '../../features/loginSlice';
import { getChannels, getMessages, openAddChannelModal } from '../../features/chatSlice';
import Channels from '../../components/Channels/Channels';
import Chat from '../../components/Chat/Chat';
import Input from '../../components/Input/Input';
import AddChannelModal from '../../components/modals/AddChannelModal';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const StorageToken = userData.token;
    if (!StorageToken) {
      navigate('/login');
    }
    dispatch(setUser(userData));
    dispatch(getChannels());
    dispatch(getMessages());
  }, [navigate, dispatch]);

  const handleOpenModal = () => {
    dispatch(openAddChannelModal());
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
              onClick={handleOpenModal}
            >
              <AddBtn size={'1.6rem'} />
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
    </div>
  );
};

export default MainPage;
