import { socket } from "@/lib/socket";
import { ReactNode, useEffect } from "react";

export default function SocketProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const onConnect = () => {
      console.log("socket connected");
    };

    const onDisconnect = (reason: string) => {
      console.log("Sockent disconnected", reason);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.connect();
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
}
