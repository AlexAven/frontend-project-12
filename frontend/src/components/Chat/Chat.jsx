import { useSelector } from 'react-redux';

const Chat = () => {
  const chatState = useSelector((state) => state.chat);
  const activeChannelIndex = chatState.ui.activeChannelIndex;
  const currentChannelId = chatState.channels.ids[activeChannelIndex];
  const currentChannel = chatState.channels.entities[currentChannelId];
  const messagesCounter = chatState.messages.ids.length; // переделать логику
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannel?.name}`}</b>
        </p>
        <span className="text-muted">{`${messagesCounter} сообщений`}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 "></div>
    </>
  );
};

export default Chat;
