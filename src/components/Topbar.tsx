import { RxHamburgerMenu } from 'react-icons/rx';
import logo from '../assets/logo.png';
const Topbar = () => {
  return (
    <div className="h-[80px] text-white bg-black flex items-center justify-between">
      <img src={logo} className="w-20 h-20 ms-10 cursor-pointer" />
      <ul className="hidden gap-8 items-center md:flex sm:hidden">
        <li className="cursor-pointer hover:text-primary">Bikes</li>
        <li className="cursor-pointer hover:text-primary">Blog</li>
        <li className="cursor-pointer hover:text-primary">Login</li>
        <li className="border border-primary p-1 rounded cursor-pointer hover:text-primary">
          Signin
        </li>
      </ul>
      <RxHamburgerMenu className="me-10 text-2xl text-white font-extrabold cursor-pointer" />
    </div>
  );
};

export default Topbar;
