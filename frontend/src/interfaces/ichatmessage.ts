export interface IChatMessage {
  createdAt: Date;
  message: string;
  receiverId: string;
  senderId: string;
  updatedAt: Date;
  _id: string;
  isSelected?: boolean;
}
