import React from 'react';

const Skelton = () => {
  return (
    <div className="card  bg-stroke ">
      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-2 items-center my-3">
          <div className="num bg-white animate-pulse w-4 h-4 rounded"></div>
          <div className="bg-white animate-pulse w-10 h-10 rounded-full"></div>
          <div className="flex flex-col gap-1 text-sm text-black-2">
            <p className="bg-white animate-pulse w-24 h-4 rounded"></p>
            <div className="inline-flex gap-2 text-orange text-base">
              <div className="bg-white animate-pulse w-12 h-4 rounded"></div>
              <div className="bg-white animate-pulse w-6 h-6 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="text-sm flex flex-col mr-2 me-5 items-end gap-2">
          <div className="bg-white animate-pulse w-16 h-4 rounded"></div>
          <div className="bg-white animate-pulse w-12 h-4 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Skelton;
