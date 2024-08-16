import React from 'react';

const Skelton = () => {
  return (
    <div className="flex flex-col gap-5 mt-3">
      {/* Skeleton for admin message */}
      <div className="flex items-end gap-1 w-50 mx-4 animate-pulse">
        <div className="w-7 h-7 bg-gray rounded-full "></div>
        <div
          className="flex-1 py-2.5 px-4 h-10 bg-gray rounded-es-none rounded-xl"
        ></div>
      </div>

      {/* Skeleton for user message */}
      <div className="flex items-end gap-1 mx-3 justify-end animate-pulse">
        <div
          className="flex-1 py-2.5 px-4 h-10 bg-gray rounded-ee-none rounded-xl"
        ></div>
        <div className="w-7 h-7 bg-gray rounded-full"></div>
      </div>
    </div>
  );
};

export default Skelton;
