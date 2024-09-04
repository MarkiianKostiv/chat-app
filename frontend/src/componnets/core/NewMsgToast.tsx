import "./Core.css";
export const NewMsgToast = ({ isOpened }: { isOpened: boolean }) => {
  return (
    <div className={isOpened ? `new-msg-toast` : `display-none`}>
      <div className='new-msg-container'>You have new message</div>
    </div>
  );
};
