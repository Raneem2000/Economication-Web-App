import React from 'react';
import Layout from '../../components/Layout';
import image1 from '../../assets/Play/image 3.png';
import image2 from '../../assets/Play/unnamed (2).png';
import frame from '../../assets/Play/Frame (2).png';

const index = () => {
  return (
    <Layout hasProfile>
      <div className="flex flex-col gap-2 sm:mx-4 w-75 items-center text-center">
        <div className="relative">
          <img src={image1} className="object-contain rounded-lg" />
          <img
            src={frame}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 object-contain rounded-lg"
            style={{ zIndex: 10 }}
          />
        </div>
        <div className="relative">
          <img src={image2} className="object-contain rounded-lg" />
          <img
            src={frame}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 object-contain rounded-lg"
            style={{ zIndex: 10 }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default index;
