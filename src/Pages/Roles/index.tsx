import React from 'react';
import Layout from '../../components/Layout';
import './style.css';
import image from '../../assets/Home/lb 1 (1).png';
import { useQuery } from 'react-query';
import { Axios } from '../../Api/axios';
import { ROLES } from '../../Api/Api';
import Loader from '../../components/Loader';
const index = () => {
  const {
    data: roles,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const response = await Axios.get(ROLES);
      return response?.data?.data;
    },
    queryKey: ['show-profile'],
  });
  return (
    <Layout hasProfile>
      <div className="cardRole w-75 relative my-30 h-dvh py-1 sm:mx-4">
        <p className="absolute top-0 left-1/2 transform z-10 -translate-x-1/2 -translate-y-5 text-center">
          الشروط والأحكــام
        </p>
        <img
          src={image}
          className="absolute top-0 mx-5 -translate-y-6"
          alt="Profile"
        />
        <div className="custom-list mt-8 mb-2 h-full overflow-y-scroll">
          {isLoading ? (
            <div>
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-stroke mx-auto my-8 h-10 rounded animate-pulse w-60 mb-2"
                ></div>
              ))}
            </div>
          ) : (
            <div className=" ">{roles?.term_condition}</div>
          )}
          {/* <ul>
            <li>هذه الخدمة متاحة لجميع عملاء الموبايل.</li>
            <li>
              ليك 20 وحدة يمكنك استخدمها مكالمات أو جيجابايت بالإضافة إلى 500
              نقطة عند إرسال 1 في رسالة ل 2345 مرة واحدة فقط.
            </li>
            <li>يتم إضافة 100 نقطة في حسابك في حالة الإجابة الصحيحة.</li>
            <li>يتم إضافة 10 نقاط في حسابك في حالة الإجابة الخاطئة.</li>
            <li>كل قرش يتم خصمه من الرصيد يتم تحويله إلى نقطة ايضاً.</li>
          </ul> */}
        </div>
      </div>{' '}
    </Layout>
  );
};

export default index;
