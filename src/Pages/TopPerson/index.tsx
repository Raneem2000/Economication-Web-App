import React from 'react';
import Layout from '../../components/Layout';
import image from '../../assets/Home/lb 1.png';
import line from '../../assets/Home/shreet.svg';
import taj from '../../assets/Home/taj.svg';

import CardTopPerson from '../../components/CardTopPerson/CardTopPerson';

const index = () => {
  return (
    <Layout hasProfile>
      <div className=" relative w-80.5 h-dvh my-20  flex flex-col gap-1 justify-center items-center ">
        <img
          src={taj}
          className="absolute top-0 mx-5 -translate-y-6"
          alt="Profile"
        />

        <p className="absolute top-12 left-1/2 transform z-10 -translate-x-1/2 -translate-y-5 text-center">
          قائمة المتصدرين
        </p>
        <img
          src={line}
          className="absolute top-12 mx-5 -translate-y-6"
          alt="Profile"
        />

        <CardTopPerson />
      </div>
    </Layout>
  );
};

export default index;
