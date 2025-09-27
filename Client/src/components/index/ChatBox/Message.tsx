interface MessageProps {
  message: string;
  name: string;
  time: string;
  avatar?: string;
  type: "other" | "self";
}

function Message({ message, name, time, avatar, type }: MessageProps) {
  return (
    <div>
      {type === "other" ? (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={avatar} />
            </div>
          </div>
          <div className="chat-header">
            {name}
            <time className="text-xs opacity-50">{time}</time>
          </div>
          <div className="chat-bubble bg-secondary text-secondary-content">
            {message}
          </div>
        </div>
      ) : (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={avatar} />
            </div>
          </div>
          <div className="chat-header">
            {name}
            <time className="text-xs opacity-50">{time}</time>
          </div>
          <div className="chat-bubble bg-primary text-primary-content">
            {message}
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
