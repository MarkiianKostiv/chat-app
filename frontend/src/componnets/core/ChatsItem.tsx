import { ProfileImg } from "./ProfileImg";

interface ChatsItemProps {
  profile_img: string;
  username: string;
  lastMessage: string;
  createAt: Date;
}

export const ChatsItem = ({
  profile_img,
  username,
  lastMessage,
  createAt,
}: ChatsItemProps) => {
  const formattedDate = new Date(createAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li className='chats-item'>
      <div className='chat-item-info'>
        <ProfileImg profile_img={profile_img} />
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
