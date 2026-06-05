import { format } from "date-fns";

export const formatMessageTime = (date) => {
  return format(new Date(date), "MMM d, h:mm a");
};
