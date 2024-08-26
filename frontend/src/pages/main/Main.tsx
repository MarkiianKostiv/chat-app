import { Link } from "react-router-dom";
import { useState } from "react";
import "./Main.css";
import { NoChatSelected } from "../../componnets/common/NoChatSelected";
import { ProfileImg } from "../../componnets/core/ProfileImg";
import { Message } from "../../componnets/core/Message";
import { useAuthContext } from "../../context/AuthContext";
import Icon from "../../componnets/ui/Icons";
import { LogoutForm } from "../../componnets/core/Logout.Form";
import useGetChats from "../../hooks/useGetChats";
import { ChatsItem } from "../../componnets/core/ChatsItem"; // Імпорт ChatsItem
import { ChatsLoader } from "../../componnets/ui/ChatsLoader";

export const Main = () => {
  const { authUser } = useAuthContext();
  const [open, setOpen] = useState(false);

  // Викликаємо хук для отримання списку чатів
  const { chats, loading, error } = useGetChats();

  const openLogoutModal = () => {
    setOpen(true);
  };

  const closeLogoutModal = () => {
    setOpen(false);
  };

  return (
    <div className='main-page-container'>
      <LogoutForm
        open={open}
        onClose={closeLogoutModal}
      />
      <aside className='users-container'>
        <div className='chat-controls'>
          <div className='profile-container'>
            <ProfileImg />
            {!authUser ? (
              <Link to={"/login"}>Log in</Link>
            ) : (
              <button
                onClick={openLogoutModal}
                className='logout-btn'
              >
                <Icon.Logout
                  height='30px'
                  width='30px'
                />
              </button>
            )}
          </div>
          <div className='search-input-container'>
            <input
              className='search-input'
              type='text'
              placeholder='Search or start new Chat'
            />
          </div>
        </div>
        <div className='chats-container'>
          <h3>Chats</h3>
          <ul>
            {loading && (
              <li>
                <ChatsLoader />
              </li>
            )}
            {error && <li>Error loading chats.</li>}
            {chats.length === 0 && !loading && !error && (
              <li>No conversations yet.</li>
            )}
            {chats.map((chat) => (
              <ChatsItem
                key={chat.user._id}
                profile_img={chat.user.profile_img}
                username={chat.user.username}
                lastMessage={chat.lastMessage.message}
                createAt={chat.lastMessage.createdAt}
              />
            ))}
          </ul>
        </div>
        <div className='settings-btn-container'>
          <button className='settings-btn'>
            <Icon.Settings />
          </button>
        </div>
      </aside>
      <div className='chat-container'>
        <div className='chat-header'>
          <div>
            <ProfileImg />
            <h3>Username</h3>
          </div>
        </div>
        {/* <NoChatSelected /> */}
        <div className='chat'>
          <Message
            message_data={{ text: "message-1", date: "8/17/2024, 7:48 AM" }}
            type='sender'
          />
          <Message
            message_data={{
              text: "message-1ergtertertdfssfsdf",
              date: "8/17/2024, 7:48 AM",
            }}
            type='receiver'
          />
          <Message
            message_data={{ text: "message-1", date: "8/17/2024, 7:48 AM" }}
            type='sender'
          />
          <Message
            message_data={{
              text: "message-1ergtertertdfssfsdf",
              date: "8/17/2024, 7:48 AM",
            }}
            type='receiver'
          />
          <Message
            message_data={{ text: "message-1", date: "8/17/2024, 7:48 AM" }}
            type='sender'
          />
          <Message
            message_data={{
              text: "message-1ergtertertdfssfsdf",
              date: "8/17/2024, 7:48 AM",
            }}
            type='receiver'
          />
          <Message
            message_data={{ text: "message-1", date: "8/17/2024, 7:48 AM" }}
            type='sender'
          />
          <Message
            message_data={{
              text: "message-1ergtertertdfssfsdf",
              date: "8/17/2024, 7:48 AM",
            }}
            type='receiver'
          />
          <Message
            message_data={{ text: "message-1", date: "8/17/2024, 7:48 AM" }}
            type='sender'
          />
          <Message
            message_data={{
              text: "message-1ergtertertdfssfsdf",
              date: "8/17/2024, 7:48 AM",
            }}
            type='receiver'
          />
        </div>
        <div className='chat-input-container'>
          <input
            type='text'
            placeholder='Type your message'
          />
        </div>
      </div>
    </div>
  );
};
