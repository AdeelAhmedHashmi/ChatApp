import emojis from "../../../assets/emojis";
import { motion } from "motion/react";
import { useAppDispatch } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { setCurrent } from "../../../store/slice/emojiBox.slice";

function EmojiBox() {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState<string>("");

  const allEmojies = document.querySelectorAll(".emoji")!;

  useEffect(() => {
    if (!allEmojies || !query.trim()) return;

    allEmojies.forEach((emojiDiv) => {
      const div = emojiDiv as HTMLElement;
      if (emojiDiv.getAttribute("data-tags")?.includes(query)) {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    });
  }, [query, allEmojies]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: "10%",
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: "-10%",
        opacity: 0,
      }}
      className={`absolute z-10 bg-base-100 rounded-xl -top-29 w-65 h-28 flex flex-col left-2`}
    >
      <div>
        <input
          type="text"
          className="p-2 w-full text-sm focus:outline-none"
          placeholder="search.."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="flex p-1 grow flex-wrap overflow-x-auto">
        {emojis.map((emoji, index) => {
          let name: string = "";
          for (let i = 0; i < emoji.tags.length; i++) {
            name = name + " " + emoji.tags[i];
          }
          return (
            <div
              key={index}
              className="hover:cursor-pointer emoji"
              data-tags={name}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                dispatch(setCurrent(target.textContent));
              }}
            >
              {emoji.emoji}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default EmojiBox;
