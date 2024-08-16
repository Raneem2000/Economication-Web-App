import React, { useState, useEffect } from 'react';
import mobile from '../assets/Home/bg 3.png';
import bg from '../assets/background.svg';
import logo from '../assets/Home/logo.png';
import profile from '../assets/Profile/USERE.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import profile1 from '../assets/Home/profile 1.png';
import history from '../assets/Home/history.png';
import cup from '../assets/Home/cup.png';
import homePage from '../assets/Home/home-page (2) 1.png';
import Cookie from 'cookie-universal';
import list from '../assets/Profile/list-.svg';
import OpenList from '../Pages/Profile/OpentList';
import Vector from '../assets/svgs/Vector';
interface LayoutProps {
  children: React.ReactNode;
  hasProfile?: Boolean;
  icon?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, hasProfile, icon }) => {
  const cookie = Cookie();
  const navigate = useNavigate();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleListClick = () => {
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  const isActive = (path: string) => location.pathname === path;
  const [storedImage, setStoredImage] = useState(null);

  useEffect(() => {
    const localStorageImage = localStorage.getItem('profileImage');
    if (localStorageImage) {
      setStoredImage(localStorageImage);
    }
  }, []);
  return (
    <div className="relative w-screen h-dvh flex flex-col justify-between">
      <img
        src={bg}
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="background"
        style={{ objectFit: 'cover' }}
      />
      <div className="relative flex-grow flex justify-center items-center">
        <div className="relative h-full w-[426px] sm:w-90 overflow-hidden shadow-2xl">
          <img
            src={mobile}
            className="absolute top-0 left-0 w-full h-full shadow-switcher"
            alt="background"
          />
          <nav className="absolute rounded-br-2xl rounded-bl-2xl sm:h-14 h-15  bottom-0 w-full bg-darkprimary text-white flex justify-around z-10">
            <Link
              to={`${cookie.get('Gamzie') ? '/profile' : '/login'}`}
              className="flex items-center relative"
              onClick={() => handleLinkClick('/profile')}
            >
              {isActive('/profile') && <Vector />}
              <img src={profile1} alt="Profile" className="w-8 h-8" />
            </Link>
            <Link
              to="/roles"
              className="flex items-center relative"
              onClick={() => handleLinkClick('/roles')}
            >
              {isActive('/roles') && <Vector />}
              <img src={history} alt="Roles" className="w-8 h-8" />
            </Link>
            <Link
              to={`${cookie.get('Gamzie') ? '/top-person' : '/login'}`}
              className="flex items-center relative"
              onClick={() => handleLinkClick('/top-person')}
            >
              {isActive('/top-person') && <Vector />}
              <img src={cup} alt="Top Person" className="w-8 h-8" />
            </Link>
            <Link
              to="/"
              className="flex items-center relative"
              onClick={() => handleLinkClick('/')}
            >
              {isActive('/') && <Vector />}
              <img src={homePage} alt="Home" className="w-8 h-8" />
            </Link>
          </nav>
          <div className="absolute top-0 right-0 m-1">
            <img src={logo} alt="logo" />
          </div>
          <div className="relative">
            {hasProfile && (
              <div className="absolute top-0 left-0 m-2 ">
                <div className="flex items-center gap-1 text-white">
                  {icon === 'profile' ? (
                    <img
                      src={storedImage ? storedImage : profile}
                      onClick={
                        cookie.get(`Gamzie`)
                          ? handleListClick
                          : () => navigate(`/login`)
                      }
                      className="w-10 h-10 mt-1 cursor-pointer z-20 border border-orange rounded-full translate-x-0.5 object-cover"
                      alt="logo"
                    />
                  ) : (
                    <img
                      src={list}
                      className="my-3 cursor-pointer z-40"
                      alt="logo"
                      onClick={
                        cookie.get(`Gamzie`)
                          ? handleListClick
                          : () => navigate(`/login`)
                      }
                    />
                  )}{' '}
                  <p>
                    {cookie.get(`Gamzie`)
                      ? localStorage.getItem('username')
                      : ''}
                  </p>
                </div>
              </div>
            )}
          </div>
          {isOverlayOpen && <OpenList onClose={handleCloseOverlay} />}
          <div className="relative h-screen flex flex-col justify-center items-center text-white text-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
