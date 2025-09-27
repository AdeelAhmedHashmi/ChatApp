import ChatHead from "./ChatBox/ChatHead";
import InputField from "./ChatBox/InputField";
import MessageBox from "./ChatBox/MessageBox";

function ChatBox() {
  return (
    <div className="flex relative flex-col align-middle justify-between grow h-screen">
      <ChatHead />
      <MessageBox />
      <InputField />
    </div>
  );
}

export default ChatBox;
