import React from "react";
import "./Common.css";

interface IStatusBarProps {
  status: "online" | "offline";
}

export const StatusBar: React.FC<IStatusBarProps> = ({ status }) => {
  return (
    <div className={`status-bar ${status}`}>
      <div className='status-circle'>
        <span className='checkmark'>✓</span>
      </div>
    </div>
  );
};
