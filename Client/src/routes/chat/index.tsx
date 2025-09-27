import { createFileRoute } from "@tanstack/react-router";
import ChatBox from "../../components/index/ChatBox";
import SideBar from "../../components/index/SideBar";

export const Route = createFileRoute("/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center flex bg-base-300">
      <div className="hidden sm:block  w-1/4 min-w-65 h-screen ">
        <SideBar />
      </div>
      <ChatBox />
    </div>
  );
}
