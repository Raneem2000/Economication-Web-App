import { FaFacebook } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
const Footer = () => {
  return (
    <div className="w-full  bottom-0 h-[150px] text-stroke font-extralight bg-black gap-2 flex flex-wrap items-center justify-between">
      <div className="ms-10 w-67 text-sm">
        Privacy policy and terms and conditions 2023 © Bike Index, a 501(c)(3)
        nonprofit - EIN 81-4296194
      </div>
      <div className="mx-10  flex gap-3 text-2xl cursor-pointer">
        <a
          href="https://www.facebook.com/unifisolution?mibextid=ZbWKwL"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stroke"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.facebook.com/unifisolution?mibextid=ZbWKwL"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stroke"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.facebook.com/unifisolution?mibextid=ZbWKwL"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stroke"
        >
          <FaTwitter />
        </a>
      </div>
    </div>
  );
};

export default Footer;
