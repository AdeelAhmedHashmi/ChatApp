import logo from "../../../assets/logos/chatlogo.png";
import { BiMenuAltLeft } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import SideBar from "../SideBar";
import { useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { AnimatePresence, motion } from "motion/react";

function ChatHead() {
  const [isSliderOpen, setIsSliderOpen] = useState<boolean>(true);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  return (
    <div className="pt-2 px-2 bg-primary text-primary-content w-full">
      <div className="flex gap-3">
        <div>
          {/* Slider Open Button  */}
          <div className="flex-none sm:hidden">
            <button
              onClick={() => setIsSliderOpen(!isSliderOpen)}
              className="btn border-none text-primary-content bg-transparent px-0 pl-2"
            >
              <BiMenuAltLeft className="scale-200" />
            </button>
          </div>

          {/* Slider  */}
          <AnimatePresence>
            {isSliderOpen && (
              <motion.div
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: 0,
                }}
                exit={{
                  x: "-100%",
                }}
                className="min-w-65 sm:hidden absolute top-0 left-0 z-50 w-2/4"
              >
                <div className="absolute hover:cursor-pointer text-base-content z-50 scale-150 right-5 top-3.5">
                  <button onClick={() => setIsSliderOpen(!isSliderOpen)}>
                    <RiArrowGoBackLine />
                  </button>
                </div>
                <SideBar />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="avatar rounded-full flex align-middle justify-center text-center">
          <div className="w-10 h-10 rounded-full">
            <img src={logo} />
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <span className="font-semibold">AdeelAhmed</span>
          </div>
          <div className="text-start -translate-y-2">
            <span className="text-xs">online</span>
          </div>
        </div>

        {/* Chat Menu Option  */}

        <div className="absolute right-3">
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className="h-full -translate-y-1 pl-2 hover:cursor-pointer"
          >
            <CiMenuKebab className="scale-150 translate-y-3" />
          </button>

          {isOptionsOpen && (
            <motion.div className="absolute right-0 top-13">
              <ul className="menu bg-secondary w-36 rounded-xl">
                <li className="">
                  <a className="rounded-none">Clear Chat</a>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatHead;
