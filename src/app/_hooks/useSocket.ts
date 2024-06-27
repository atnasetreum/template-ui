"use client";

import { useEffect, useState, useCallback } from "react";

import io, { Socket } from "socket.io-client";

const apiRoute = `${process.env.NEXT_PUBLIC_API_RAW}/${process.env.NEXT_PUBLIC_WS_NAMESPACE}`;

export const useSocket = () => {
  const [online, setOnline] = useState(false);
  const [socket, setSocket] = useState<Socket>();

  const connectSocket = useCallback(async () => {
    const socketNew = io(apiRoute, {
      transports: ["websocket", "polling"],
      path: "/socket.io/socket.io.js",
      autoConnect: true,
      forceNew: true,
    });
    setSocket(socketNew);
  }, []);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    const event = "connect";
    socket?.on(event, () => {
      setOnline(true);
    });
    return () => {
      socket?.off(event);
    };
  }, [socket]);

  useEffect(() => {
    const event = "disconnect";
    socket?.on(event, () => {
      setOnline(false);
    });
    return () => {
      socket?.off(event);
    };
  }, [socket]);

  useEffect(() => {
    const event = "connect_error";
    socket?.on(event, () => {
      socket.io.opts.transports = ["polling", "websocket"];
    });
    return () => {
      socket?.off(event);
    };
  }, [socket]);

  return {
    socket,
    online,
    disconnectSocket,
    connectSocket,
  };
};
