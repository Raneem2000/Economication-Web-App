import { FaSearch } from 'react-icons/fa';
import { VscListSelection } from 'react-icons/vsc';
import PaginatedItems from './Pagination';
import { useNavigate } from 'react-router-dom';
import SkeltonCardView from './SkeltonCard';
import { card } from '../Intarface/table';
import noData from '../assets/noData.jpg';
import wrong from '../assets/wrong.jpg';
import logo from '../assets/logo.png';
const CardView: React.FC<card> = ({
  header,
  data,
  ItemAdd,
  limit,
  page,
  setPage,
  setLimit,
  isLoading,
  isSuccess,
  search,
  setSearch,
  totalPages,
  isError,
}) => {
  const navigate = useNavigate();

  // Filter Settings
  const handleSearch = (e: any) => {
    setSearch(e.target.value.toLowerCase());
  };


  const filteredData = data?.filter((item) => {
    return Object.values(item).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(search),
    );
  });
  return (
    <>
      <div className=" m-2 mb-5 rounded-lg bg-white p-5 shadow-lg text-xs md:text-sm lg:text-sm xl:text-base">
        <div className="flex justify-between items-center ">
          <div className="flex justify-between items-center gap-5 flex-wrap">
            <div className="my-5 text-center font-extrabold text-black text-xl">
              Nearby stolen bikes
            </div>
            <div className="text-center  text-purple-600 text-lg">
              Number of Total Stolen Bikes : 50000
            </div>
          </div>
          <div className="flex items-center justify-end flex-1 gap-4 px-1 w-fit">
            <label
              htmlFor="select"
              className="border-2 border-stroke p-1 rounded cursor-pointer"
            >
              <select
                id="select"
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="bg-white dark:bg-strokedark cursor-pointer"
                defaultValue={limit}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
              </select>
            </label>
            <div className="flex  w-60 items-center gap-2 border border-stroke p-1 px-3 rounded ">
              <FaSearch />
              <input
                placeholder="search Any Thing... "
                className="outline-none bg-inherit"
                onChange={handleSearch}
              />
            </div>

            <VscListSelection className="cursor-pointer dark:text-white text-black-2 font-extrabold text-xl animate-none" />
          </div>
        </div>
      </div>
      {isLoading ? (
        Array.from({ length: limit }).map((_) => <SkeltonCardView />)
      ) : filteredData?.length === 0 ? (
        <img className="ms-[40%]" src={noData} />
      ) : isError ? (
        <img className="ms-[40%]" src={wrong} />
      ) : (
        filteredData?.map((item, index) => (
          <>
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-3 mx-5 my-4 font-black rounded shadow-lg h-fit p-3 bg-white hover:bg-purple-200 cursor-pointer"
            >
              <div className="col-span-1 sm:col-span-1">
                {header?.map(
                  (column, key) =>
                    column.name === 'Image' && (
                      <img
                        src={
                          item[column.key] !== null ? item[column.key] : logo
                        }
                        className="w-50 h-50 object-contain rounded-lg mt-4 mx-auto"
                        alt="Image"
                      />
                    ),
                )}
              </div>
              <div className="col-span-2 sm:col-span-1 mt-5 text-black">
                {header?.map(
                  (column, key) =>
                    column.name === 'Title' && (
                      <div>
                        <span className="text-primary">Title</span>:{' '}
                        {item[column.key]}
                      </div>
                    ),
                )}
                {header?.map(
                  (column, key) =>
                    column.name === 'Description' && (
                      <div className="mt-2">
                        <span className="text-green-700">Description</span>:{' '}
                        {item[column.key]}
                      </div>
                    ),
                )}
              </div>
              <div className="col-span-2 sm:col-span-1 mt-5 text-black">
                {header?.map(
                  (column, key) =>
                    column.name === 'Date Stolen' && (
                      <div>
                        <span className="text-red-600">Date Stolen</span>:{' '}
                        {new Date(item[column.key] * 1000).toLocaleDateString()}
                      </div>
                    ),
                )}
                {header?.map(
                  (column, key) =>
                    column.name === 'Date Reported' && (
                      <div className="mt-2">
                        <span className="text-green-700">Date Reported</span>:{' '}
                        {item[column.key]}
                      </div>
                    ),
                )}
                {header?.map(
                  (column, key) =>
                    column.name === 'Stolen Location' && (
                      <div className="mt-2">
                        <span className="text-orange-400">Stolen Location</span>
                        : {item[column.key]}
                      </div>
                    ),
                )}
              </div>
            </div>
          </>
        ))
      )}
      <PaginatedItems
        data={data}
        itemsPerPage={limit}
        setPage={setPage}
        totalPages={totalPages || 0}
      />
    </>
  );
};

export default CardView;
