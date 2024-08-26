export interface IChat {
  user: {
    _id: string;
    username: string;
    profile_img: string;
  };
  lastMessage: {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
