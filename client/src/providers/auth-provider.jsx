import { AuthContext } from "@/context/auth-context";
import { getToken, removeToken, setToken } from "@/services/token";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { connectSocket, disconnectSocket } from "@/services/socket.service";
import { checkAuthAPI, loginAPI, registerAPI } from "@/services/auth.service";

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const socketRef = useRef(null);

  // Initialize the socket
  const initializeSocket = (token) => {
    // prevent duplicate connections
    if (socketRef.current?.connected) return;

    const socketInstance = connectSocket(token);

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
    });

    socketInstance.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);
  };

  // Cleanup the socket
  const cleanupSocket = () => {
    if (socketRef.current) {
      socketRef.current.off("connected");
      socketRef.current.off("getOnlineUsers");
      disconnectSocket(socketRef.current);

      socketRef.current = null;
      setSocket(null);
    }
  };

  // checkAuth defined inside useEffect — no missing dep, no cascading renders
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const response = await checkAuthAPI();
        setAuthUser(response.data);
        initializeSocket(token);
      } catch (error) {
        console.log(error);
        removeToken();
        setAuthUser(null);
        cleanupSocket();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    return () => {
      cleanupSocket();
    };
  }, []);

  // Login user
  const loginUser = async (data) => {
    try {
      setAuthLoading(true);

      const response = await loginAPI(data);

      const { token, user } = response.data;

      setToken(token);
      setAuthUser(user);
      initializeSocket(token);

      return {
        success: true,
        message: "Login successful",
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Login failed",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Register user
  const registerUser = async (data) => {
    try {
      setAuthLoading(true);

      const response = await registerAPI(data);

      const { token, user } = response.data;

      setToken(token);

      setAuthUser(user);

      initializeSocket(token);

      return {
        success: true,
        message: "Registration successful",
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Registration failed",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout user
  const logoutUser = () => {
    removeToken();
    setAuthUser(null);

    setOnlineUsers([]);
    cleanupSocket();
  };

  const value = {
    authUser,
    setAuthUser,

    loading,
    authLoading,

    onlineUsers,
    socket,

    loginUser,
    registerUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
