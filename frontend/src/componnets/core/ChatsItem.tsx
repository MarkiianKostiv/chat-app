import { ProfileImg } from "./ProfileImg";

interface ChatsItemProps {
  profile_img?: string;
  username: string;
  id: string;
  lastMessage: string;
  createdAt: string | Date;
  onClick: () => void;
}

export const ChatsItem = ({
  profile_img,
  username,
  lastMessage,
  createdAt,
  id,
  onClick,
}: ChatsItemProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li
      className='chats-item'
      onClick={onClick}
    >
      <div className='chat-item-info'>
        <ProfileImg
          profile_img={profile_img}
          id={id}
        />
        <div>
          <h3>{username}</h3>
          <p>{lastMessage}</p>
        </div>
      </div>
      <div className='chat-item-date'>
        <p>{formattedDate}</p>
      </div>
    </li>
  );
};
