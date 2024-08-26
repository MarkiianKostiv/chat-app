import "./Core.css";
import { useLogout } from "../../hooks/useLogout";
import { Loader } from "../ui/Loader";

interface LogoutFormProps {
  open: boolean;
  onClose: () => void;
}

export const LogoutForm = ({ open, onClose }: LogoutFormProps) => {
  const { logout, loading, error } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`modal-container ${open ? "" : "display-none"}`}>
      <div className='modal'>
        <h3>Are you sure you want to logout?</h3>
        {error && <h4>{error}</h4>}
        <div>
          <button
            className='logout-button'
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? <Loader /> : "Submit"}
          </button>
          <button
            className='logout-button cancel-btn'
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
