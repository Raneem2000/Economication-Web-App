import React, { useState } from 'react';
import './style.css';
import gold from '../../assets/Home/Polka Dot Gold Coin 1.png';
import image from '../../assets/Home/image 1.png';
import { Axios } from '../../Api/axios';
import { useQuery } from 'react-query';
import { TOPPERSON } from '../../Api/Api';
import Loader from '../Loader';
import Skelton from './Skelton';
import { UserData } from '../../intarface/user';
import InfiniteScroll from 'react-infinite-scroll-component';

const CardTopPerson = () => {
  const [pageNumber, setPageNumber] = useState(1); // حالة الصفحة الحالية للتمرير اللانهائي
  const [itemsToShow, setItemsToShow] = useState(4); // عدد العناصر للعرض في البداية

  const { data: topPerson, isLoading } = useQuery({
    queryFn: async () => {
      const response = await Axios.get(TOPPERSON);
      return response?.data?.data;
    },
    queryKey: ['top-person'],
  });
  const MaskedUsername = (username: string) => {
    const maskedUsername =
      username.length > 2
        ? username.slice(0, 2) + '*'.repeat(username.length - 2)
        : username;
    return <p>{maskedUsername}</p>;
  };
  return (
    <>
      <h4 className="inline-flex top-5 gap-4 mt-5 items-center text-center w-fit">
        <img src={gold} className="w-[24px] h-[24px]" alt="Gold Coin" /> نقاطي :{' '}
        {isLoading ? '...' : topPerson?.user?.points}
      </h4>
      <div className="overflow-y-scroll" style={{ height: 'calc(60vh - 6vh)' }}>
        {isLoading
          ? Array.from({ length: itemsToShow }, (_, index) => (
              <Skelton key={index} />
            ))
          : topPerson?.top_ten.map((item: UserData, index: number) => (
              <div className="card sm:mx-4 my-2" key={item.id}>
                <div className="flex justify-between items-center">
                  <div className="flex flex-row gap-2 items-center my-3">
                    <div className="num">{index + 1}.</div>
                    <img src={image} alt="Avatar" />
                    <div className="flex flex-col font-semibold gap-1 text-sm text-black-2">
                      <p>{MaskedUsername(item.username)}</p>
                      <div className="inline-flex items-center gap-2 text-orange text-base">
                        {item.points}
                        <img
                          src={gold}
                          className="w-[18px] h-[18px]"
                          alt="Gold Coin"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-sm flex flex-col mr-2 me-5 items-end gap-2">
                    <div className="text-secondary">15/5/2024</div>
                    <div className="text-lightPrimary">1:53 PM</div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="card w-[310px] rounded-none mt-1 fixed bottom-16">
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-2 items-center my-3">
            <div className="num">{topPerson?.user?.ranking}.</div>
            <img src={image} alt="Avatar" />
            <div className="flex flex-col font-semibold gap-1 text-sm text-black-2">
              <p>{topPerson?.user?.username}</p>
              <div className="inline-flex gap-2 text-orange text-base">
                {topPerson?.user?.points}
                <img src={gold} className="w-[24px] h-[24px]" alt="Gold Coin" />
              </div>
            </div>
          </div>
          <div className="text-sm flex flex-col mr-2 me-5 items-end gap-2">
            <div className="text-secondary">15/5/2024</div>
            <div className="text-lightPrimary">1:53 PM</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTopPerson;
