import ChatContainer from "@/components/chat-container";
import RightSidebar from "@/components/right-sidebar";
import Sidebar from "@/components/sidebar";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <div>
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
