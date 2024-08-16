import Layout from '../../../components/Layout';
import image from '../../../assets/Profile/USERE.svg';
import gold from '../../../assets/Home/Polka Dot Gold Coin 1.png';
import location from '../../../assets/Profile/location.svg';
import edit from '../../../assets/Profile/Edit.svg';
import frame from '../../../assets/Profile/Frame (5).png';
import calender from '../../../assets/Profile/Calendar.svg';
import frame3 from '../../../assets/Profile/Frame (3).svg';
import vector from '../../../assets/Profile/Vector 4.png';

import './style.css';
import { useQuery } from 'react-query';
import { Axios } from '../../../Api/axios';
import { SHOWPROFILE } from '../../../Api/Api';
import Skelton from './Skelton';
import { useNavigate } from 'react-router-dom';
const index = () => {
  const navigate = useNavigate();

  const {
    data: showProfile,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const response = await Axios.get(SHOWPROFILE);
      return response?.data?.data;
    },
    queryKey: ['show-profile'],
  });
  localStorage.setItem('points', showProfile?.points);
  localStorage.setItem('profileImage', showProfile?.media);
  return (
    <Layout hasProfile icon="profile">
      <div className="cardProfile w-75 sm:mx-4 mt-7 text-black-2 text-base relative h-fit py-1">
        <img
          src={showProfile?.media ? showProfile?.media : image}
          className={`absolute top-0  mx-auto translate-x-21 -translate-y-19 ${
            showProfile?.media &&
            ' w-20 h-20 top-5  border border-orange rounded-full translate-x-29 -translate-y-11 object-cover'
          }      
          `}
          alt="Profile"
        />
        <div className="flex flex-col justify-center mt-12 text-thirdPrimay items-center gap-4 mb-2">
          {isLoading ? (
            <Skelton />
          ) : (
            <>
              {' '}
              <p>{showProfile?.username}</p>
              <span className="font-extralight">{showProfile?.phone}</span>
              <div className="cardPoint flex gap-2 justify-center items-center font-bold">
                <img src={gold} />
                نقاطي : {showProfile?.points ?? 0}
              </div>
              <p
                className="text-sm w-[248px] text-center font-semibold"
                style={{ direction: 'rtl' }}
              >
                يلا زود نقاطك عشان تكون من الفائزين إلعب دلوقتي و زود نقاطك.
              </p>
              <div className="line mb-22 flex flex-col gap-2">
                <img src={vector} />
                <div className="flex gap-2 justify-end text-sm mx-4">
                  <p>{showProfile?.address ?? 'لم يتم تحديد العنوان'}</p>
                  <img src={location} className="w-[20px] h-[20px]" />
                </div>
                <img src={vector} />
                <div className="flex gap-2 justify-end text-sm mx-4">
                  <p>{showProfile?.username}</p>
                  <img src={frame3} className="w-[20px] h-[20px]" />
                </div>
                <img src={vector} />
                <div className="flex gap-2 justify-end text-sm mx-4">
                  <p>
                    {showProfile?.date_of_birth ?? 'لم يتم تحديد تاريخ الميلاد'}
                  </p>
                  <img src={calender} className="w-[20px] h-[20px]" />
                </div>
                <img src={vector} />
              </div>
              <div
                onClick={() => navigate(`/update-profile`)}
                className="flex justify-center gap-2 text-primary mt-8 cursor-pointer items-center"
              >
                <img src={edit} />
                <p>تعديل الصفحة الشخصية</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-2">
        <div className=" text-base mt-1 cursor-pointer">
          {' '}
          <img src={frame} onClick={() => navigate(`/charge-points`)} />
        </div>
      </div>{' '}
    </Layout>
  );
};

export default index;
