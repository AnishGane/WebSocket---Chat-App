import ChatContainer from "@/components/chat-container";
import RightSidebar from "@/components/right-sidebar";
import Sidebar from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div
      className={cn(
        "h-full w-full backdrop-blur-2xl border-2 border-border rounded-md overflow-hidden grid grid-cols-1 relative",
        selectedUser
          ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
          : "md:grid-cols-[1fr_2.5fr]",
      )}
    >
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <ChatContainer
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      {selectedUser && (
        <RightSidebar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
    </div>
  );
};

export default HomePage;
