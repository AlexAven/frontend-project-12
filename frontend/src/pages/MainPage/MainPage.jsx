import { CgAddR as AddBtn, CgArrowRightR as SubmitBtn } from 'react-icons/cg';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from '../../features/loginSlice';
import { getChannels, getMessages } from '../../features/chatSlice';
import Channels from '../../components/Channels/Channels';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const StorageToken = localStorage.getItem('token');
    if (!StorageToken) {
      navigate('/login');
    }
    dispatch(setUser(StorageToken));
    dispatch(getChannels());
    dispatch(getMessages());
  }, [navigate, dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <AddBtn size={'1.6rem'} />
            </button>
          </div>
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>??????????????# general</b>
              </p>
              <span className="text-muted">???? сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 "></div>
            <div className="mt-auto px-5 py-3">
              <form noValidate="" className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  {/* <input
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                    value=""
                  /> */}
                  <button type="submit" disabled="" className="btn btn-group-vertical">
                    <SubmitBtn size={'1.5rem'} />
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
