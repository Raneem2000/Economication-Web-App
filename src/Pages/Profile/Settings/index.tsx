import Layout from '../../../components/Layout';
import image1 from '../../../assets/Profile/Lock (1).svg';
import image2 from '../../../assets/Profile/profile (1).svg';

import './style.css';
import { useNavigate } from 'react-router-dom';
const index = () => {
  const navigate = useNavigate();
  return (
    <Layout hasProfile icon="list">
      <h3 className="my-3">الإعدادات</h3>
      <div className="cardSetting sm:mx-4">
        <div className="flex justify-between text-base w-full px-3 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.4828 7.03445L9.51727 12L14.4828 16.9655"
              stroke="#160041"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div
            onClick={() => navigate(`/update-profile`)}
            className="flex justify-start text-black gap-2 cursor-pointer"
          >
            <p className="ms-10" style={{ color: '#160041' }}>
              تعديل الحسـاب الشخصي
            </p>
            <img src={image2} />
          </div>
        </div>
        <div className="flex justify-between text-base w-full px-3 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.4828 7.03445L9.51727 12L14.4828 16.9655"
              stroke="#160041"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div
            onClick={() => navigate(`/change-password`)}
            className="flex justify-start text-black gap-2 cursor-pointer"
          >
            <p className="ms-10" style={{ color: '#160041' }}>
              تعديل كلمــة المــرور
            </p>
            <img src={image1} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
