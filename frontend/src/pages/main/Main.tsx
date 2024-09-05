import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import { NoChatSelected } from "../../componnets/common/NoChatSelected";
import { ProfileImg } from "../../componnets/core/ProfileImg";
import { Message } from "../../componnets/core/Message";
import { useAuthContext } from "../../context/AuthContext";
import Icon from "../../componnets/ui/Icons";
import { LogoutForm } from "../../componnets/core/Logout.Form";
import { ChatsItem } from "../../componnets/core/ChatsItem";
import { ChatsLoader } from "../../componnets/ui/ChatsLoader";
import useFindUser from "../../hooks/useFindUser";
import useGetChats from "../../hooks/useGetChats";
import useGetMessages from "../../hooks/useGetMessages";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "../../context/SocketContext";
import useDeleteChat from "../../hooks/useDeleteChat";
import { IChatMessage } from "../../interfaces/ichatmessage";
import { IChat } from "../../interfaces/ichat";
import { DeleteChatBtn } from "../../componnets/core/DeleteChatBtn";
import { SendMessageLoader } from "../../componnets/ui/SendMessageLoader";
import notificationSound from "../../assets/notification.mp3";
import { NewMsgToast } from "../../componnets/core/NewMsgToast";

export const Main = () => {
  const { authUser } = useAuthContext();
  const { sendMessage, loading: sendMessageLoading } = useSendMessage();
  const [open, setOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [msgModal, setMsgModal] = useState<boolean>(false);
  const { socket } = useSocketContext();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { chats, loading: chatsLoading, error: chatsError } = useGetChats();

  const {
    messages: initialMessages,
    loading: messagesLoading,
    error: messagesError,
  } = useGetMessages(selectedChat?.user?._id);

  const { error: errorDeleteChat } = useDeleteChat();

  const [messages, setMessages] = useState<IChatMessage[]>(
    initialMessages || []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) return;

    const filteredMessages = messages.map((msg) => ({
      ...msg,
      isSelected: msg.message.toLowerCase().includes(searchTerm.toLowerCase()),
    }));

    setMessages(filteredMessages);

    const matchedCount = filteredMessages.filter(
      (msg) => msg.isSelected
    ).length;
    setSelectedIndex(matchedCount > 0 ? 1 : 0);
  }, [searchTerm]);

  const handleNextMatch = () => {
    const matchedMessages = messages.filter((msg) => msg.isSelected);
    setSelectedIndex((prevIndex) =>
      prevIndex < matchedMessages.length ? prevIndex + 1 : 1
    );
    scrollToSelectedMessage(matchedMessages[selectedIndex - 1]?._id);
  };

  const handlePreviousMatch = () => {
    const matchedMessages = messages.filter((msg) => msg.isSelected);
    setSelectedIndex((prevIndex) =>
      prevIndex > 1 ? prevIndex - 1 : matchedMessages.length
    );
    scrollToSelectedMessage(matchedMessages[selectedIndex - 1]?._id);
  };

  const scrollToSelectedMessage = (messageId: string | undefined) => {
    const messageIndex = messages.findIndex((msg) => msg._id === messageId);
    if (messageRefs.current[messageIndex]) {
      messageRefs.current[messageIndex]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
    setMessages((prevMessages) =>
      prevMessages.map((msg) => ({
        ...msg,
        isSelected: false,
      }))
    );
  };

  useEffect(() => {
    setMessages(initialMessages || []);
  }, [initialMessages]);

  useEffect(() => {
    const handleNewMessage = (newMessage: IChatMessage) => {
      const isCurrentUser = newMessage.senderId === authUser?._id;
      const isSelectedChat =
        selectedChat &&
        (newMessage.senderId === selectedChat.user._id ||
          newMessage.receiverId === selectedChat.user._id);

      if (isCurrentUser || isSelectedChat) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }

      if (!isCurrentUser && (!selectedChat || !isSelectedChat)) {
        const sound = new Audio(notificationSound);
        sound.play();
        setMsgModal(true);
        setTimeout(() => {
          setMsgModal(false);
        }, 2000);
      }
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedChat]);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);

  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useFindUser(searchQuery);

  const openLogoutModal = () => {
    open === false ? setOpen(true) : setOpen(false);
  };

  const handleChatSelect = (chat: IChat) => {
    setSelectedChat(chat);
    setMessages([]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      sendMessage({
        receiverId: selectedChat.user._id,
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const displayedChats = searchQuery && users.length > 0 ? users : chats;

  return (
    <div className='main-page-container'>
      <LogoutForm
        open={open}
        onClose={openLogoutModal}
      />
      <NewMsgToast isOpened={msgModal} />

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
            <div className='search-icon-container'>
              <Icon.Search
                defaultColor='#fff'
                hoverColor='#fff'
                cursorType='default'
                height='27px'
                width='27px'
              />
            </div>
            <input
              className='search-input'
              type='text'
              placeholder='Search or start new Chat'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className='chats-container'>
          <h3>Chats</h3>
          <ul>
            {searchQuery && usersLoading && <li>Loading users...</li>}
            {!searchQuery && chatsLoading && (
              <li className='chat-loader-container'>
                <ChatsLoader />
              </li>
            )}
            {searchQuery && usersError && <li>Error loading users.</li>}
            {!searchQuery && chatsError && <li>Error loading chats.</li>}
            {displayedChats.length === 0 &&
              !chatsLoading &&
              !chatsError &&
              !usersLoading &&
              !usersError && <li>No conversations yet.</li>}
            {displayedChats.map((item, index) =>
              item.user ? (
                <ChatsItem
                  key={item.user._id}
                  id={item.user._id}
                  username={item.user.username}
                  lastMessage={item.lastMessage?.message}
                  createdAt={item.lastMessage?.createdAt}
                  onClick={() => handleChatSelect(item)}
                />
              ) : (
                <li key={item._id || index}>Unknown user</li>
              )
            )}
          </ul>
        </div>
        <div className='settings-btn-container'>
          <Link
            to={"/settings"}
            className='settings-btn'
          >
            <Icon.Settings />
          </Link>
        </div>
      </aside>
      <div className='chat-container'>
        {selectedChat ? (
          <>
            <div className='chat-header'>
              <div>
                <ProfileImg id={selectedChat.user._id} />
                <h3>
                  {selectedChat.user.firstName} {selectedChat.user.lastName}
                </h3>
              </div>
              {errorDeleteChat && <div>Error while deleting a chat</div>}
              <DeleteChatBtn
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
              {isSearchModalOpen && (
                <section className='msg-search-container'>
                  <div>
                    <button
                      className='msg-search-close-btn'
                      onClick={handleCloseSearchModal}
                    >
                      X
                    </button>
                  </div>
                  <div className='msg-input-container'>
                    <input
                      type='text'
                      placeholder='Find message'
                      className='msg-find-input'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className='span'>
                      {selectedIndex}/
                      {messages.filter((msg) => msg.isSelected).length}
                    </div>
                  </div>

                  <div>
                    <button
                      className='to-next-msg'
                      onClick={handlePreviousMatch}
                    >
                      {"<"}
                    </button>
                    <button
                      className='to-previous-msg'
                      onClick={handleNextMatch}
                    >
                      {">"}
                    </button>
                  </div>
                </section>
              )}
            </div>
            <div className='chat'>
              {messagesLoading && <p>Loading messages...</p>}
              {messagesError && <p>Error loading messages.</p>}
              {!messagesLoading && messages.length === 0 && (
                <p className='no-messages'>No messages in this chat.</p>
              )}
              {messages.map((msg, index) => (
                <Message
                  key={msg._id}
                  receiverId={selectedChat.user._id}
                  message_data={{
                    text: msg.message,
                    date: new Date(msg.createdAt).toLocaleString(),
                  }}
                  type={msg.senderId === authUser?._id ? "sender" : "receiver"}
                  isSelected={msg.isSelected}
                  ref={(el) => (messageRefs.current[index] = el)}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className='chat-input-container'>
              <button
                className='chat-input-icon'
                onClick={handleSendMessage}
              >
                {sendMessageLoading ? (
                  <SendMessageLoader />
                ) : (
                  <Icon.Message
                    defaultColor='#7C7C7C'
                    hoverColor='#7C7C7A'
                    height='25px'
                    width='25px'
                  />
                )}
              </button>
              <input
                type='text'
                placeholder='Type your message'
                value={newMessage}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
            </div>
          </>
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  );
};
