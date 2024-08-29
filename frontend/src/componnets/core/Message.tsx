import { IMessage } from "../../interfaces/imessage";
import "./Core.css";
import { ProfileImg } from "./ProfileImg";
interface MessageProps {
  message_data: IMessage;
  type: "sender" | "receiver";
  receiverId: string;
}

export const Message = ({ message_data, type, receiverId }: MessageProps) => {
  const { text, date } = message_data;

  return (
    <div
      className={`message-container ${
        type === "sender"
          ? "message-container-sender "
          : "message-container-receiver"
      }`}
    >
      <div
        className={`message ${
          type === "sender" ? "sender-class" : "receiver-class"
        }`}
      >
        {type === "receiver" && <ProfileImg id={receiverId} />}
        <div>
          <p>{text}</p>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};
