import { Link } from "react-router-dom";
import "./Main.css";
import { NoChatSelected } from "../../componnets/common/NoChatSelected";
export const Main = () => {
  return (
    <div className='main-page-container'>
      <aside className='users-container'>
        <div className='chat-controls'>
          <div className='profile-container'>
            <img
              src=''
              alt='profile_img'
            />
            <Link to={"/login"}>Log in</Link>
          </div>
          <div className='search-input-container'>
            <input
              className='search-input'
              type='text'
              placeholder='Search or start new Chat'
            />
          </div>
        </div>
        <div className='chats-container'>
          <h3>Chats</h3>
          <ul>
            <li>sdfsf</li>
            <li>sdfsf</li>
            <li>sdfsf</li>
          </ul>
        </div>
      </aside>
      <div className='chat-container'>
        <div className='chat-header'>
          <img
            src=''
            alt='profile_img'
          />
          <h3>Username</h3>
        </div>
        {/* <NoChatSelected /> */}
        <div className='chat'>
          <p>message1</p>
          <p>message1</p>
          <p>message1</p>
        </div>
        <div>
          <input
            type='text'
            placeholder='Type your message'
          />
        </div>
      </div>
    </div>
  );
};
