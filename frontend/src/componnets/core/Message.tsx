import { forwardRef } from "react";
import { IMessage } from "../../interfaces/imessage";
import "./Core.css";
import { ProfileImg } from "./ProfileImg";

interface MessageProps {
  message_data: IMessage;
  type: "sender" | "receiver";
  receiverId: string;
  isSelected?: boolean;
}

export const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message_data, type, receiverId, isSelected }, ref) => {
    const { text, date } = message_data;

    return (
      <div
        ref={ref}
        className={`message-container ${
          type === "sender"
            ? "message-container-sender "
            : "message-container-receiver"
        }`}
      >
        <div
          className={`message  ${
            type === "sender" ? "sender-class" : "receiver-class"
          }`}
        >
          {type === "receiver" && <ProfileImg id={receiverId} />}
          <div>
            <p
              className={`${
                isSelected
                  ? "selected"
                  : `${
                      type === "sender"
                        ? "no-selected-sender"
                        : "no-selected-receiver"
                    }`
              }`}
            >
              {text}
            </p>
            <span>{date}</span>
          </div>
        </div>
      </div>
    );
  }
);
