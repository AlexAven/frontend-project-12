import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '../../features/chatSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.chat.channels);
  const activeChannel = useSelector((state) => state.chat.ui.activeChannelIndex);

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.ids.map((identificator, index) => {
        const { name, id } = channels.entities[identificator];
        const activeBtn = activeChannel === index ? 'btn-secondary' : '';

        return (
          <li
            key={id}
            className="nav-item w-100"
            onClick={() => {
              dispatch(setActiveChannel(index));
            }}
          >
            <button type="button" className={`w-100 rounded-0 text-start btn ${activeBtn}`}>
              <span className="me-1">#</span>
              {name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Channels;
