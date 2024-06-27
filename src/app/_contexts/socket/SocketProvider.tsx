"use client";

import { FC } from "react";

import { useSocket } from "@hooks";
import { SocketContext } from ".";

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: FC<Props> = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket();
  return (
    <SocketContext.Provider
      value={{ socket, online, connectSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
