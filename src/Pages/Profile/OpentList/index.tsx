import profile from '../../../assets/Profile/USERE.svg';
import game from '../../../assets/openList/game 1.svg';
import podium from '../../../assets/openList/topten.svg';
import profile3 from '../../../assets/openList/profile 3.svg';
import settings from '../../../assets/openList/settings 1.svg';
import exit from '../../../assets/Profile/exit.png';
import notification from '../../../assets/Profile/notification.svg';
import out from '../../../assets/Profile/Add.png';
import support from '../../../assets/Profile/support.svg';
import Cookie from 'cookie-universal';
import './style.css';
import { useMutation, useQuery } from 'react-query';
import { Axios } from '../../../Api/axios';
import { LOGOUT, NOTIFICATIONS } from '../../../Api/Api';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Index = ({ onClose }) => {
  const cookie = Cookie();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await Axios.post(`${LOGOUT}`);
      return data;
    },
    onSuccess: () => {
      cookie.remove('Gamzie');
      localStorage.removeItem('username');
      localStorage.removeItem('profileImage');
      localStorage.removeItem('points');
      localStorage.removeItem('id');
      navigate('/login');
    },
  });
  const handleLogout = async () => {
    await mutateAsync();
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? 'text-[#ffa015]' : '';
  };
  const [storedImage, setStoredImage] = useState(null);

  useEffect(() => {
    const localStorageImage = localStorage.getItem('profileImage');
    if (localStorageImage) {
      setStoredImage(localStorageImage);
    }
  }, []);
  const { data: unreadNotifications } = useQuery({
    queryFn: async () => {
      const response = await Axios.get(
        `${NOTIFICATIONS}/count-unread-notifications`,
      );
      return response?.data?.data?.count_unread_notifications;
    },
    queryKey: ['show-unread'],
  });
  return (
    <div className="fixed left-0 top-0 inset-0 bg-black bg-opacity-50 z-50">
      <div className=" ">
        <div className="layout relative h-dvh">
          {' '}
          <div className="top-right-corner cursor-pointer ">
            <img src={out} onClick={onClose} />
          </div>
          <div className="flex flex-col items-center sm:mx-4">
            <img
              src={storedImage || profile}
              className="w-[77px] h-[77px] mt-13 rounded-full border border-orange"
              alt="Profile"
            />{' '}
            <p className="">{localStorage.getItem('username')}</p>
            <div className="flex flex-col gap-3 mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="254"
                height="2"
                viewBox="0 0 254 2"
                fill="none"
              >
                <path d="M0 1H254" stroke="#CBC2DB" />
              </svg>
              <div
                onClick={() => navigate(`/profile`)}
                className={`flex gap-2 items-center justify-end mx-2 cursor-pointer ${getLinkClass(
                  '/profile',
                )}`}
              >
                <p>الصفحة الشخصية</p>
                <img src={profile3} />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="254"
                height="2"
                viewBox="0 0 254 2"
                fill="none"
              >
                <path
                  opacity="0.8"
                  d="M0 1H254"
                  stroke="#CBC2DB"
                  strokeWidth="0.5"
                />
              </svg>
              <div
                onClick={() => navigate(`/play`)}
                className={`flex gap-2 items-center justify-end mx-2 cursor-pointer ${getLinkClass(
                  '/play',
                )}`}
              >
                <p>إبدأ اللعب</p>
                <img src={game} />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="254"
                height="2"
                viewBox="0 0 254 2"
                fill="none"
              >
                <path
                  opacity="0.8"
                  d="M0 1H254"
                  stroke="#CBC2DB"
                  strokeWidth="0.5"
                />
              </svg>
              <div
                onClick={() => navigate(`/top-person`)}
                className={`flex gap-2 items-center justify-end mx-2 cursor-pointer ${getLinkClass(
                  '/top-person',
                )}`}
              >
                <p>الفائزين</p>
                <img src={podium} />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="254"
                height="2"
                viewBox="0 0 254 2"
                fill="none"
              >
                <path
                  opacity="0.8"
                  d="M0 1H254"
                  stroke="#CBC2DB"
                  strokeWidth="0.5"
                />
              </svg>
              <div
                onClick={() => navigate(`/settings`)}
                className={`flex gap-2 items-center justify-end mx-2 cursor-pointer ${getLinkClass(
                  '/settings',
                )}`}
              >
                <p>الإعدادات</p>
                <img src={settings} />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="254"
                height="2"
                viewBox="0 0 254 2"
                fill="none"
              >
                <path
                  opacity="0.8"
                  d="M0 1H254"
                  stroke="#CBC2DB"
                  strokeWidth="0.5"
                />
              </svg>
              <div
                onClick={() => navigate(`/notification`)}
                className={`flex gap-2 items-center justify-between mx-2 cursor-pointer ${getLinkClass(
                  '/notification',
                )}`}
              >
                {unreadNotifications > 0 ? (
                  <div className="text-red-300 animate-pulse">
                    ({unreadNotifications})
                  </div>
                ) : (
                  '.'
                )}
                <div className="flex gap-3">
                  <p>الإشعارات</p>
                  <img src={notification} />
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="254"
                height="2"
                viewBox="0 0 254 2"
                fill="none"
              >
                <path
                  opacity="0.8"
                  d="M0 1H254"
                  stroke="#CBC2DB"
                  strokeWidth="0.5"
                />
              </svg>
              <div
                onClick={() => navigate(`/support`)}
                className={`flex gap-2 items-center justify-end mx-2 cursor-pointer ${getLinkClass(
                  '/support',
                )}`}
              >
                <p>الدعم</p>
                <img src={support} />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="254"
                height="2"
                viewBox="0 0 254 2"
                fill="none"
              >
                <path d="M0 1H254" stroke="#CBC2DB" />
              </svg>
            </div>
            <div
              onClick={handleLogout}
              className="custom-button cursor-pointer gap-2 mt-20 flex items-center text-center bottom-0"
            >
              <p>{isLoading ? 'انتظر' : 'الخروج'}</p>
              <img className="mt-1" src={exit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
