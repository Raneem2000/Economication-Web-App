import Layout from '../../components/Layout';
import lodo from '../../assets/Profile/lodo.svg';
import { Axios } from '../../Api/axios';
import { NOTIFICATIONS } from '../../Api/Api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Skelton from './Skelton';

const index = () => {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryFn: async () => {
      const response = await Axios.get(NOTIFICATIONS);
      return response?.data?.data;
    },
    queryKey: ['show-notifications'],
  });

  const markAsReadMutation = useMutation(
    async (notificationId: string) => {
      const response = await Axios.put(
        `${NOTIFICATIONS}/mark-as-read/${notificationId}`,
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('show-notifications');
      },
    },
  );

  const handleMakedRead = (item: any) => {
    if (item?.read_at === null) {
      markAsReadMutation.mutate(item.id);
    }
  };

  return (
    <Layout hasProfile icon="list">
      <div className="cardProfile  sm:mx-4 text-thirdPrimay text-base relative h-fit py-1">
        <div className="change-password-text my-3 font-bold text-[18px]">
          الإشعارات
        </div>
        <div className="h-80 overflow-y-scroll">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <Skelton key={index} />
              ))
            : notifications?.map((item: any, index: number) => (
                <div
                  onClick={() => handleMakedRead(item)}
                  key={index}
                  className={` flex gap-4 rounded mx-2 cursor-pointer items-center justify-end border-b border-gray ${
                    item?.read_at === null ? 'bg-darkgray' : ''
                  }`}
                >
                  <div dir="rtl" className="flex flex-col gap-1 my-3 ">
                    <p className="text-[14px]">{item?.data?.user_name}</p>
                    <p className="text-[12px]">
                      {item?.data?.body} : {item?.data?.title}
                    </p>
                  </div>
                  <img
                    src={item?.data?.image === '' ? lodo : item?.data?.image}
                    className="w-12 h-12 rounded-lg shadow me-6"
                  />
                </div>
              ))}
        </div>
      </div>
    </Layout>
  );
};

export default index;
