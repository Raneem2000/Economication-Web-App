import { toast, ToastOptions } from 'react-toastify';
// import lodo from '../assets/Profile/lodo.svg';
import notificationSound from '../assets/notificationsound.mp3';
import { Link } from 'react-router-dom';

const customToastOption = {
  style: { width: '250px', left: '0', zIndex: '100' },
};
export const showSuccess = (data) => {
  const audio = new Audio(notificationSound);

  audio.onloadeddata = () => {
    audio.play();
  };

  const messageType = data?.data?.type;
  const messageBody = data?.data?.message;

  toast.info(
    <Link to={`/${messageType === 'new message' ? 'support' : 'notification'}`}>
      <div className="bg-transparent text-black text-center cursor-pointer ">
        <div className="flex gap-4 items-center justify-end mx-5">
          <div dir="rtl" className="flex flex-col gap-1">
            <p className="text-[14px] text-primary">{data?.data?.title}</p>
            <p className="text-[12px]">{messageBody}</p>
            <p className="text-sm text-blue-400">
              اذهب لرؤية {messageType === 'new message' ? 'الرسالة' : 'الإشعار'}
            </p>
          </div>
        </div>
      </div>
    </Link>,
  );
};
export const showError = (
  message: string,
  ToastOptions: ToastOptions = customToastOption,
) => {
  toast.error(
    <div>
      <p>{message}</p>
    </div>,
    ToastOptions,
  );
};

export const showInfo = (
  message: string,
  ToastOptions: ToastOptions = customToastOption,
) => {
  toast.info(
    <div>
      <p>{message}</p>
    </div>,
    ToastOptions,
  );
};

export const showPromis = (
  functionPromise: any,
  ToastOptions: ToastOptions = customToastOption,
) => {
  toast.promise(
    functionPromise,
    {
      pending: 'Opening Chat, Please Wait',
      success: 'Chat Opened Successfully 👌',
    },
    ToastOptions,
  );
};
