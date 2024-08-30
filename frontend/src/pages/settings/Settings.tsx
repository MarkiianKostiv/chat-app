import { Link } from "react-router-dom";
import { Switch } from "../../componnets/ui/Switch";
import "./Settings.css";
import { useAuthContext } from "../../context/AuthContext";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
export const Settings = () => {
  const { authUser } = useAuthContext();
  const { changeSettings, error, response } = useUpdateSettings();
  return (
    <div className='settings-page-container'>
      <Link
        className='go-back-link'
        to={"/"}
      >
        Go Back
      </Link>
      <div className='massage-settings-container'>
        <h3> User Profile Settings</h3>
        <p>
          The function of sending a random message to a random chat is{" "}
          {authUser?.settings.sendMessageToRandomChat === true
            ? "enabled"
            : "disenabled"}
        </p>
        <p>
          {authUser?.settings.sendMessageToRandomChat === true
            ? "Disenable"
            : "Enable"}{" "}
          send random message to random chat?
        </p>
        {error && <p>{error}</p>}
        {response && <p>{response.message}</p>}
        <button
          className='settings-btn'
          onClick={changeSettings}
        >
          <Switch />
        </button>
      </div>
    </div>
  );
};
