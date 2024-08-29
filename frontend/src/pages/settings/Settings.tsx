import { Link } from "react-router-dom";
import { Switch } from "../../componnets/ui/Switch";
import "./Settings.css";
export const Settings = () => {
  return (
    <div className='settings-page-container'>
      <Link
        className='go-back-link'
        to={"/"}
      >
        Go Back
      </Link>
      <div className='massage-settings-container'>
        <h3>User Profile Settings</h3>
        <p>Enable send random message to random chat?</p>
        <Switch />
      </div>
    </div>
  );
};
