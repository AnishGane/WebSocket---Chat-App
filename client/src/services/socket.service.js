import { ENV_VAR } from "@/utils/env";
import { io} from "socket.io-client";

export const connectSocket = (token) => {
    return io(ENV_VAR.BACKEND_URL, {
        auth: {
            token
        }
    })
}

export const disconnectSocket = (socket) => {
    if (socket?.connected) {
      socket.disconnect();
    }
  };