import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();

  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      console.log(newMessage);
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket]);
};

export default useListenMessages;
