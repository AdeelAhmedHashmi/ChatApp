import Message from "./Message";
import logo from "../../../assets/logos/chatlogo.png";
import { BsChatSquareText } from "react-icons/bs";

function MessageBox() {
  return (
    <div className="overflow-x-auto relative h-full p-2 sm:px-3 pb-23 pt-3">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
        <BsChatSquareText className="scale-1600 opacity-3" />
      </div>
      {Array.from({ length: 10 }, (_, i) => {
        if (i % 2 == 0) {
          return (
            <Message
              key={i}
              message="hi how are you doing"
              name="adeelahmed"
              time="34:23"
              type="self"
              avatar={logo}
            />
          );
        } else {
          return (
            <Message
              key={i}
              message="hi how are you doing"
              name="adeelahmed"
              time="34:23"
              type="other"
              avatar={logo}
            />
          );
        }
      })}
    </div>
  );
}

export default MessageBox;
