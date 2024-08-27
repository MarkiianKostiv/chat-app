import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { StatusBar } from "../common/StatusBar";
import "./Core.css";
import { useAuthContext } from "../../context/AuthContext";

interface ProfileImgProps {
  profile_img?: string;
  id?: string;
}

export const ProfileImg = ({
  profile_img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHEJ-8GyKlZr5ZmEfRMmt5nR4tH_aP-crbgg&s",
  id,
}: ProfileImgProps) => {
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();
  const [status, setStatus] = useState<"offline" | "online">("offline");

  useEffect(() => {
    const userIdToCheck = id || authUser?._id;

    if (
      userIdToCheck &&
      Array.isArray(onlineUsers) &&
      onlineUsers.includes(userIdToCheck)
    ) {
      setStatus("online");
    } else {
      setStatus("offline");
    }
  }, [id, onlineUsers, authUser]);

  return (
    <div className='profile-img-container'>
      <img
        src={profile_img}
        alt='profile_img'
      />
      <div className='status-bar-container'>
        <StatusBar status={status} />
      </div>
    </div>
  );
};
