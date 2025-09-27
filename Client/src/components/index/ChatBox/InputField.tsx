import { BiSmile } from "react-icons/bi";
import { BiSend } from "react-icons/bi";
import { BiMicrophone } from "react-icons/bi";
import { AnimatePresence } from "motion/react";
import EmojiBox from "../ui/EmojiBox";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { currentemoji } from "../../../store/slice/emojiBox.slice";

function InputField() {
  const emoji = useAppSelector(currentemoji);

  const messageInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (emoji) {
      messageInput.current!.value = messageInput.current!.value + emoji;
    }
  }, [emoji]);

  const [isEmoji, setIsEmoji] = useState<boolean>(false);

  function sendMessage() {
    // const length = messageInput.current!.value.trim().length;
    return;
  }

  return (
    <div className="absolute flex align-middle rounded-3xl bg-base-200 text-base-content justify-center bottom-0  w-full sm:w-9/10 p-2 sm:left-1/2 sm:-translate-x-1/2">
      <AnimatePresence>{isEmoji && <EmojiBox />}</AnimatePresence>
      <div>
        <button
          onClick={() => setIsEmoji(!isEmoji)}
          className="h-full p-2 mr-2 hover:cursor-pointer"
        >
          <BiSmile className="scale-170 opacity-45" />
        </button>
      </div>
      <div className="grow">
        <label className="input w-full">
          <input
            type="search"
            className=" focus:outline-none"
            placeholder="type message here..."
            ref={messageInput}
            onFocus={() => setIsEmoji(false)}
          />
        </label>
      </div>
      <div className="ml-1">
        <button className="btn rounded-full px-3 mx-1 bg-primary">
          <BiMicrophone className="scale-150" />
        </button>
        <button
          onClick={sendMessage}
          className="btn rounded-full px-3 mx-1 bg-primary"
        >
          <BiSend className="scale-150" />
        </button>
      </div>
    </div>
  );
}

export default InputField;
