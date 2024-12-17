import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import {
  openDeleteChannelModal,
  setActiveChannel,
  openRenameChannelModal,
} from '../../features/chatSlice';
import DeleteChannelModal from '../modals/DeleteChannelModal/DeleteChannelModal';
import RenameChannelModal from '../modals/RenameChannelModal/RenameChannelModal';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.chat.channels);
  const activeChannel = useSelector((state) => state.chat.ui.activeChannelIndex);

  const handleDeleteModal = (id) => {
    dispatch(openDeleteChannelModal(id));
  };
  const handleRenameModal = (id) => {
    dispatch(openRenameChannelModal(id));
  };

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  return (
    <>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.ids.map((identificator, index) => {
          const { name, id, removable } = channels.entities[identificator];
          const censoredChannelName = filter.clean(name);
          const isActive = activeChannel === index;
          const activeBtnClass = isActive ? 'btn-secondary' : 'btn-light';

          return (
            <li key={id} className="nav-item w-100">
              {removable ? (
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    className={`text-truncate w-100 text-start rounded-0 ${activeBtnClass} ${isActive ? 'active' : ''}`}
                    onClick={() => dispatch(setActiveChannel(index))}
                  >
                    <span className="me-1">#</span>
                    {censoredChannelName}
                  </Button>

                  <Dropdown.Toggle
                    split
                    variant={activeBtnClass}
                    id={`dropdown-split-${id}`}
                    className={`rounded-0.5 ${isActive ? 'active' : ''}  ${isActive ? 'btn-secondary' : ''}`}
                  />

                  <Dropdown.Menu>
                    <span className="visually-hidden">{t('chat.channels.properties')}</span>
                    <Dropdown.Item onClick={() => handleDeleteModal(id)} href="#">
                      {t('chat.channels.dropdown.deleteBtn')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRenameModal(id)} href="#">
                      {t('chat.channels.dropdown.renameBtn')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  type="button"
                  className={`w-100 rounded-0 text-start btn ${activeBtnClass} ${isActive ? 'active' : ''}`}
                  onClick={() => dispatch(setActiveChannel(index))}
                >
                  <span className="me-1">#</span>
                  {name}
                </Button>
              )}
            </li>
          );
        })}
      </ul>
      <DeleteChannelModal />
      <RenameChannelModal />
    </>
  );
};

export default Channels;
