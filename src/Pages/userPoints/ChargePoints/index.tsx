import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import '../style.css';
import gold from '../../../assets/Home/Polka Dot Gold Coin 1.png';
import { useNavigate } from 'react-router-dom';
import arrow1 from '../../../assets/Play/FAB.png';
import arrow2 from '../../../assets/Play/Right.png';
import ChargeVector from '../../../assets/svgs/ChargeVector';
import { CalendarComponent } from '../../../components/Calender/CalenderComponent';
import { Axios } from '../../../Api/axios';
import { HISTORY } from '../../../Api/Api';
import { useQuery } from 'react-query';

const index = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: string) => {
    console.log('Index.tsx:', date);
    setSelectedDate(date);
  };
  const {
    data: ChargeHistory,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const response = await Axios.get(
        `${HISTORY}?type=charge&day=${selectedDate}`,
      );
      return response?.data?.data;
    },
    queryKey: ['charge-history' + selectedDate],
  });
  return (
    <Layout hasProfile icon="profile">
      <div className="text-black sm:mx-4 space-y-2 mb-5">
        <div className="box-points font-bold mx-auto text-sm flex gap-1 w-fit items-center text-center py-3 px-2">
          <img src={gold} className="w-[13px] h[13px]" />
          <p>{localStorage.getItem('points')}</p>
          <p>:</p>
          <p>نقاطي</p>
        </div>
        <div className="selector font-bold flex text-sm cursor-pointer justify-between text-center relative">
          <div
            onClick={() => navigate(`/play-points`)}
            className="w-1/2 flex items-center justify-center relative"
          >
            <div className="absolute inset-0" />
            <div className="text-center mx-auto my-auto">نقاط اللعب</div>
          </div>
          <div
            onClick={() => navigate(`/charge-points`)}
            className="w-1/2 flex items-center justify-center relative"
          >
            <div className="absolute inset-0" />
            <div className="select text-center py-2.5 text-white">
              نقاط الشحن
            </div>
          </div>
        </div>
        <div className="calender mx-auto">
          <CalendarComponent onDateChange={handleDateChange} />
        </div>
        <div className="charge-points mx-auto  flex flex-col space-y-2">
          <div className="flex justify-between items-center mx-4 mt-3">
            <div className="text flex gap-1 items-center second-col">
              <p className="">نقطة</p>
              <p>{ChargeHistory?.[0]?.charge_points ?? 0}</p>
            </div>
            <div className="first-col">نقط من شحن</div>
          </div>
          <div>
            <ChargeVector />
          </div>
          <div className="flex justify-between items-center mx-4 mt-3">
            <div className="text flex gap-1 items-center second-col">
              <p className="">نقطة</p>
              <p>{ChargeHistory?.[0]?.gift_charge_points ?? 0}</p>
            </div>
            <div className="first-col">نقط هدية</div>
          </div>
          <div>
            <ChargeVector />
          </div>
          <div className="flex justify-between items-center mx-4 mt-3">
            <p className="second-col">
              {ChargeHistory?.[0]?.date_charge ?? 'لا يوجد تاريخ'}
            </p>
            <div className="first-col">تاريخ الشحن</div>
          </div>
        </div>
        <div
          className="custom-button mx-auto cursor-pointer"
          onClick={() => navigate(`/profile`)}
        >
          العودة
        </div>{' '}
      </div>
    </Layout>
  );
};

export default index;
