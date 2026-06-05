import { EllipsisVertical } from "lucide-react";
import { BotMessageSquare } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";
import SidebarUserCard from "./sidebar-user-card";
import { USER_DATA } from "@/constants";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "h-full overflow-y-auto p-5 border-r-2 border-border space-y-2",
        selectedUser && "max-md:hidden",
      )}
    >
      <div className="pb-5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BotMessageSquare />
            QuickChat
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={"cursor-pointer"}>
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search   */}
        <InputGroup>
          <InputGroupInput placeholder="Search user" />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
      </div>

      <h1 className="text-base ml-2 font-medium">Total Users in App [1.2k]</h1>
      {/* <h1 className="text-base ml-2 font-medium">Total Users in App [{USER_DATA.length}]</h1> */}

      {/* Users Lists */}
      <div className="flex flex-col gap-2 border border-border p-1.5 rounded-2xl">
        {USER_DATA.map((user, index) => (
          <SidebarUserCard
            key={user._id}
            user={user}
            i={index}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
