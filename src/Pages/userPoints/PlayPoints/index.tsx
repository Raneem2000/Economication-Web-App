import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import '../style.css';
import gold from '../../../assets/Home/Polka Dot Gold Coin 1.png';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Axios } from '../../../Api/axios';
import { HISTORY } from '../../../Api/Api';
import { CalendarComponent } from '../../../components/Calender/CalenderComponent';
import Loader from '../../../components/Loader';
import moment from 'moment';
const index = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: string) => {
    console.log('Index.tsx:', date);
    setSelectedDate(date);
  };

  const {
    data: PlayHistory,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const response = await Axios.get(
        `${HISTORY}?type=game&day=${selectedDate}`,
      );
      return response?.data?.data;
    },
    queryKey: ['play-history', selectedDate],
  });
  return (
    <Layout hasProfile icon="profile">
      <div className="text-black sm:mx-4 space-y-2 mb-5">
        <div className="box-points mx-auto text-sm flex font-bold gap-1 w-fit items-center text-center  px-2">
          <img src={gold} className="w-[13px] h[13px]" />
          <p>{localStorage.getItem('points')}</p>
          <p>:</p>
          <p>نقاطي</p>
        </div>

        <div className="selector font-bold flex text-sm cursor-pointer justify-between text-center relative">
          <div
            onClick={() => navigate(`/play-points`)}
            className="relative w-1/2 flex items-center justify-center"
          >
            <div className="absolute inset-0" />
            <div className="select text-center py-2.5 text-white">
              نقاط اللعب
            </div>
          </div>
          <div
            onClick={() => navigate(`/charge-points`)}
            className="relative w-1/2 flex items-center justify-center"
          >
            <div className="absolute inset-0" />
            <div className="text-center mx-auto my-auto">نقاط الشحن</div>
          </div>
        </div>
        <div className="calender mx-auto">
          <CalendarComponent onDateChange={handleDateChange} />
        </div>
        <div className="flex flex-col gap-2 h-42.5 overflow-y-scroll">
          {isLoading ? (
            <Loader />
          ) : (
            PlayHistory?.map((item: any, index: number) => (
              <div
                key={index}
                className="play-points mx-auto flex justify-between items-center"
              >
                <div className="flex flex-col items-center text-win mx-2">
                  <p>مكسب</p>
                  <p>+</p>
                  <div className="money-card text-money items-center gap-0.5">
                    <span className="">{item?.reward_points}</span>
                    <img src={gold} className="w-[12.068px] h-[12px]" />{' '}
                  </div>
                </div>
                <div className="flex mx-2 gap-2">
                  <div className="flex flex-col items-end gap-1">
                    <p className="text1">{item?.game_name}</p>
                    <p className="date">
                      {moment(item?.date).format('YYYY-MM-DD')}
                    </p>
                  </div>
                  <img
                    src={item?.image}
                    className="w-[50px] h[50px] rounded-2xl shadow"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div
          className="custom-button mx-auto cursor-pointer"
          onClick={() => navigate(`/profile`)}
        >
          العودة
        </div>
      </div>
    </Layout>
  );
};

export default index;
