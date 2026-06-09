import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const SidebarUserCard = ({ user, i, selectedUser, setSelectedUser }) => {
  const isSelectedUser = selectedUser?._id === user._id;

  return (
    <Card
      onClick={() => setSelectedUser(user)}
      className={cn(
        "py-1.5! cursor-pointer bg-card",
        isSelectedUser && "bg-red-50",
      )}
    >
      <CardContent className={"flex items-center justify-between py-1! px-4!"}>
        <div className="flex-1 flex items-center gap-3">
          <div className="relative">
            <div className="size-11 rounded-full overflow-hidden">
              <img
                draggable="false"
                src="https://images.unsplash.com/photo-1775309679005-1854413248b2?q=80&w=748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="select-none"
              />
              {/* <img src={user.image} alt={user.fullName} /> */}
            </div>
            <div className="absolute bottom-0 right-1 size-2.5 border border-white rounded-full bg-green-600" />
          </div>
          <CardHeader className={"flex-1 px-0! gap-0!"}>
            <CardTitle>{user?.fullName}</CardTitle>
            <CardDescription>
              {/* Can show recent send message by user itself or receive message */}
            </CardDescription>
          </CardHeader>
        </div>

        {i > 2 && <Badge className={"py-2.5 px-1.5"}>{i}</Badge>}
      </CardContent>
    </Card>
  );
};

export default SidebarUserCard;
