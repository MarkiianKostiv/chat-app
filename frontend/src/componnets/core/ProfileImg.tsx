import { StatusBar } from "../common/StatusBar";
import "./Core.css";

interface ProfileImgProps {
  profile_img?: string;
}

export const ProfileImg = ({
  profile_img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHEJ-8GyKlZr5ZmEfRMmt5nR4tH_aP-crbgg&s",
}: ProfileImgProps) => {
  return (
    <div className='profile-img-container'>
      <img
        src={profile_img}
        alt='profile_img'
      />
      <div className='status-bar-container'>
        <StatusBar status='online' />
      </div>
    </div>
  );
};
