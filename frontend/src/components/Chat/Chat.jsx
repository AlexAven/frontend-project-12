import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Chat = () => {
  const dispatch = useDispatch();

  const chatState = useSelector((state) => state.chat);
  const activeChannelIndex = chatState.ui.activeChannelIndex;
  const currentChannelId = chatState.channels.ids[activeChannelIndex];
  const currentChannel = chatState.channels.entities[currentChannelId];
  const channelMessagesIndex = chatState.messages.ids.filter(
    (messageId) => chatState.messages.entities[messageId].channelId === currentChannelId,
  );
  const channelMessages = channelMessagesIndex.map((id) => chatState.messages.entities[id]);
  const messagesCounter = channelMessagesIndex.length;

  // useEffect(() => {
  //   const socket = new WebSocket();
  // });

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannel?.name}`}</b>
        </p>
        <span className="text-muted">{`${messagesCounter} сообщений`}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {channelMessages &&
          channelMessages.map((message) => {
            console.log('message', message);

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
