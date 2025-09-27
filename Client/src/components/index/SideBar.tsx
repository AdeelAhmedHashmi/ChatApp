import { MdOutlineChat } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { TbSettings } from "react-icons/tb";
import logo from "../../assets/logos/chatlogo.png";
import { motion } from "motion/react";

function SideBar() {
  return (
    <div className="bg-base-100 text-base-content relative h-screen p-2.5 border-r-base-300 border-r-2">
      <div className="p-2 mb-2">
        <MdOutlineChat className="scale-150" />
      </div>

      {/* Chat Search Section  */}

      <div>
        <label className="input">
          <IoIosSearch className="h-[1em] opacity-50" />
          <input
            type="search"
            className="focus:border-none"
            required
            placeholder="Search"
          />
        </label>
      </div>

      {/* Your Chats Section  */}
      <div className="mt-5 pb-12 max-h-4/5 overflow-y-auto">
        <p className="text-start text-sm text-gray-300">Your Chats</p>

        {Array.from({ length: 30 }, (_, i) => {
          return (
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              key={i}
              className="flex align-middle gap-2 p-1 rounded-xl bg-primary text-primary-content my-2"
            >
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <span className="text-xs">AD</span>
                </div>
              </div>
              <div className=" text-sm translate-y-1.5 flex align-middle justify-center">
                <span>AdeelAhmed</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Profile Info Section  */}
      <div className="flex gap-2.5 text-start text-sm p-2 rounded-full bottom-0 bg-base-300 border-base-300 border-2 shadow-white absolute w-full left-0">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full">
            <img src={logo} />
          </div>
        </div>
        <div>
          <div>
            <span>AdeelAhmed</span>
          </div>
          <div>
            <span className="text-xs opacity-70">adeel@gmail.com</span>
          </div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-2">
          <TbSettings className="scale-180" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
