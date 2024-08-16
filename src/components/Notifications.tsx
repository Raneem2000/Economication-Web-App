import React, { useEffect } from 'react';
import notificationSound from '../assets/notificationsound.mp3';

const NotificationComponent = ({ title, body }) => {
  useEffect(() => {
    const audio = new Audio(notificationSound);
    audio.play();
  }, []);

  return (
    <div className="bg-white rounded-md shadow-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* <img src={lodo} alt="Logo" className="w-12 h-12 rounded-lg shadow" /> */}
        <div dir="rtl" className="flex flex-col gap-1">
          <p className="text-[14px] font-bold">{title}</p>
          <p className="text-[12px]">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
