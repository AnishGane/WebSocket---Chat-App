import { messages } from "@/constants";
import { cn } from "@/lib/utils";
import { formatMessageTime } from "@/utils/helper";
import { BotMessageSquare } from "lucide-react";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Image } from "lucide-react";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { Button } from "./ui/button";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef(null);

  const fileRef = useRef(null);

  const handleImageClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log("Selected image:", file);
      // do something with it (preview/upload)
    }
  };

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [selectedUser]);

  return selectedUser ? (
    <div className="relative w-full h-full overflow-y-auto scrollbar-hide border-r-2 border-border">
      {/* header */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-border justify-between">
        <div className="flex items-center gap-2">
          <div className="size-11 rounded-full overflow-hidden ">
            <img
              src="https://images.unsplash.com/photo-1775309679005-1854413248b2?q=80&w=748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              draggable="false"
            />
            {/* <img src={selectedUser.image} alt={selectedUser.fullName} /> */}
          </div>
          <p className="flex flex-col">
            {selectedUser.fullName}
            <span className="text-sm text-green-500">Online</span>
          </p>
        </div>

        <Info className="cursor-pointer text-foreground/50 hover:text-foreground transition-colors duration-200" />
      </div>

      {/* chat area */}
      <div className="h-[calc(100%-73px)] scrollbar-hide overflow-y-auto px-4 pb-24">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={cn(
              "flex items-end gap-2 justify-end",
              msg.senderId !== "6851c9f2a7b3d91e4c8f1001" && "flex-row-reverse",
            )}
          >
            {msg.image ? (
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1775309679005-1854413248b2?q=80&w=748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  draggable="false"
                />
                {/* <img src={msg.image} alt="message attachment" /> */}
              </div>
            ) : (
              <div className="mt-6">
                <p
                  className={cn(
                    "p-2 max-w-[200px] md:text-sm font-light rounded-lg break-all bg-violet-400/50",
                    msg.senderId === "6851c9f2a7b3d91e4c8f1001"
                      ? "rounded-br-none"
                      : "rounded-bl-none",
                  )}
                >
                  {msg.text}
                </p>
                <p
                  className={cn(
                    "text-muted-foreground text-xs mt-1",
                    msg.senderId === "6851c9f2a7b3d91e4c8f1001" && "text-right",
                  )}
                >
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>
            )}
            <div className="size-12 rounded-full overflow-hidden">
              <img
                src={
                  msg.senderId === "6851c9f2a7b3d91e4c8f1001"
                    ? selectedUser.image
                    : "https://images.unsplash.com/photo-1775309679005-1854413248b2?q=80&w=748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="user image"
                draggable="false"
              />
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* bottom area */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 border-t border-border">
        <InputGroup
          className={
            "bg-background h-12! rounded-none border-0 outline-none border-r border-border"
          }
        >
          <InputGroupInput placeholder="Type message here..." />
          {/* hidden file input */}
          <Input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />

          <InputGroupAddon align="inline-end">
            <Image
              className="size-6 cursor-pointer"
              onClick={handleImageClick}
            />
          </InputGroupAddon>
        </InputGroup>

        <Button
          disabled={true}
          className="flex items-center size-8 justify-center mr-3 cursor-pointer"
        >
          <Send className="size-4 rotate-45 mr-1" />
        </Button>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center flex-col gap-2">
      <BotMessageSquare className="size-14 text-muted-foreground animate-bounce" />
      <p className="text-2xl font-medium text-muted-foreground">
        Chat with anyone, anytime & anywhere.
      </p>
    </div>
  );
};

export default ChatContainer;
