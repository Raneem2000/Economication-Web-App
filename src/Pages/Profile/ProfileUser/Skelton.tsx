import React from 'react';

const Skelton = () => {
  return (
    <>
      <p className="bg-stroke w-24 h-6 rounded animate-pulse"></p>
      <span className="bg-stroke w-24 h-4 rounded animate-pulse"></span>
      <div className="cardPoint flex gap-2 justify-center items-center font-bold">
        <div className="bg-stroke w-6 h-6 rounded-full animate-pulse"></div>
        <span className="bg-stroke w-32 h-6 rounded animate-pulse"></span>
      </div>
      <p className="bg-stroke text-sm w-[248px] h-6 rounded animate-pulse"></p>
      <div className="line mb-22 flex flex-col gap-2">
        <div className="bg-stroke w-6 h-6 rounded-full animate-pulse"></div>
        <div className="flex gap-2 justify-end text-sm mx-4">
          <p className="bg-stroke w-32 h-6 rounded animate-pulse"></p>
          <div className="bg-stroke w-6 h-6 rounded-full animate-pulse"></div>
        </div>
        <div className="bg-stroke w-6 h-6 rounded-full animate-pulse"></div>
        <div className="flex gap-2 justify-end text-sm mx-4">
          <p className="bg-stroke w-32 h-6 rounded animate-pulse"></p>
          <div className="bg-stroke w-6 h-6 rounded-full animate-pulse"></div>
        </div>
        <div className="bg-stroke w-6 h-6 rounded-full animate-pulse"></div>
        <div className="flex gap-2 justify-end text-sm mx-4">
          <p className="bg-stroke w-32 h-6 rounded animate-pulse"></p>
          <div className="bg-stroke w-6 h-6 rounded-full animate-pulse"></div>
        </div>
        <div className="bg-stroke w-6 h-6 rounded-full animate-pulse"></div>
      </div>
      <div className="flex justify-center gap-2 text-primary mt-8 items-center">
        <div className="bg-stroke w-6 h-6 rounded-full animate-pulse"></div>
        <p className="bg-stroke w-32 h-6 rounded animate-pulse"></p>
      </div>
    </>
  );
};

export default Skelton;
