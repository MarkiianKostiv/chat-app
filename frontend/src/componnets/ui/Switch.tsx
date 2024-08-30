import { useAuthContext } from "../../context/AuthContext";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import { BlackLoader } from "./BlackLoader";
import "./Ui.css";

export const Switch = () => {
  const { authUser } = useAuthContext();
  const { loading } = useUpdateSettings();
  return (
    <label className='switch'>
      <input
        type='checkbox'
        defaultChecked={authUser?.settings.sendMessageToRandomChat}
        disabled={loading === "pending"}
      />
      <span className='slider'>
        {loading === "pending" && <BlackLoader />}
        <svg
          className='slider-icon'
          viewBox='0 0 32 32'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          role='presentation'
        >
          <path
            fill='none'
            d='m4 16.5 8 8 16-16'
          ></path>
        </svg>
      </span>
    </label>
  );
};
