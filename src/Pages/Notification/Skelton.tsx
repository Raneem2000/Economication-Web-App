
const Skelton = () => {
  return (
    <div className="flex gap-4 items-center mx-3 justify-end border-b border-gray animate-pulse">
      <div dir="rtl" className="flex flex-col gap-1 my-3 w-full">
        <div className="bg-stroke h-4 w-1/4 mb-2 rounded"></div>
        <div className="bg-stroke h-3 w-3/4 rounded"></div>
      </div>
      <div className="w-12 h-12 rounded-lg shadow bg-stroke"></div>
    </div>
  );
};

export default Skelton;
