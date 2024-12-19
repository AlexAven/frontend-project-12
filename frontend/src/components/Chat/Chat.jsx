import { io } from 'socket.io-client';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { receiveMessage } from '../../features/chatSlice';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const chatState = useSelector((state) => state.chat);
  const activeChannelIndex = chatState.ui.activeChannelIndex;
  const currentChannelId = chatState.channels.ids[activeChannelIndex];
  const currentChannel = chatState.channels.entities[currentChannelId];
  const channelMessagesIndex = chatState.messages.ids.filter(
    (messageId) => chatState.messages.entities[messageId].channelId === currentChannelId,
  );
  const channelMessages = channelMessagesIndex.map((id) => chatState.messages.entities[id]);
  const messagesCounter = channelMessagesIndex.length;
  const censoredChannelName = filter.clean(currentChannel?.name);

  useEffect(() => {
    const socket = io();
    socket.on('newMessage', (payload) => {
      const sensoredMessage = { ...payload, body: filter.clean(payload.body) };
      dispatch(receiveMessage(sensoredMessage));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${censoredChannelName || t('chat.channels.noChannels')}`}</b>
        </p>
        <span className="text-muted">{`${messagesCounter} ${t('chat.messagesCount')}`}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {channelMessages &&
          channelMessages.map((message) => {
            const { id, username, body } = message;
            return (
              <div key={id} className="text-break mb-2">
                <b>{username}:</b> {body}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Chat;
