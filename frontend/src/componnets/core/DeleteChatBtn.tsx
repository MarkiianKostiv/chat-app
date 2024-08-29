import { useState } from "react";
import useDeleteChat from "../../hooks/useDeleteChat";
import useGetChats from "../../hooks/useGetChats";
import { DeleteLoader } from "../ui/DeleteLoader";
import Icon from "../ui/Icons";

interface DeleteChatBtnProps {
  selectedChat: any;
  setSelectedChat: any;
}

export const DeleteChatBtn = ({
  selectedChat,
  setSelectedChat,
}: DeleteChatBtnProps) => {
  const { loading: deleteChatLoading, deleteChat } = useDeleteChat();

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    open === false ? setOpen(true) : setOpen(false);
  };

  const { fetchChats } = useGetChats();

  const handleDeleteChat = async (receiverId: string) => {
    setOpen(false);
    await deleteChat(receiverId);
    setSelectedChat(null);
    fetchChats();
  };

  return (
    <div className='delete-chat-btn-container'>
      <button
        onClick={handleOpen}
        className='delete-chat-btn'
      >
        {deleteChatLoading ? (
          <DeleteLoader />
        ) : (
          <Icon.Delete
            defaultColor='#f5f5f5'
            hoverColor='#f5f5f5'
          />
        )}
      </button>
      <div className={`delete-chat-modal ${open ? "" : "display-none"}`}>
        <h3>Are you sure you want to delete this chat?</h3>
        <div>
          <button
            className='logout-button'
            onClick={() => {
              handleDeleteChat(selectedChat.user._id);
            }}
          >
            Confirm
          </button>
          <button
            className='logout-button cancel-btn'
            onClick={handleOpen}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
