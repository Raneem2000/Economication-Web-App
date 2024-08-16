import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import admin from '../../assets/Profile/Group-1.svg';
import user from '../../assets/Profile/image 1.svg';
import arrow from '../../assets/Profile/Group.svg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Axios } from '../../Api/axios';
import { SUPPORTMESSAGE } from '../../Api/Api';
import Skelton from './Skelton';

const index = () => {
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const queryClient = useQueryClient();

  // Fetch messages for the current page
  const { isLoading, isFetching } = useQuery(
    ['show-support', page],
    async () => {
      const response = await Axios.get(`${SUPPORTMESSAGE}?page=${page}`);
      return response.data.data;
    },
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        // Append new messages to existing messages
        setMessages((prevMessages) => [...prevMessages, ...data.data]);

        // Determine if there are more pages to load
        setHasMore(data.current_page < data.total_pages);
      },
    },
  );

  // Mutation for sending a message
  const mutation = useMutation(
    async (newMessage) => {
      const response = await Axios.post(`${SUPPORTMESSAGE}/send`, {
        message: newMessage,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        setMessage('');
        queryClient.invalidateQueries('show-support');
      },
      onError: (error) => {
        console.error('Error sending message:', error);
      },
    },
  );

  // Handle message submit
  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(message);
  };

  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isFetching) scrollToBottom();
  }, [messages, isFetching]);

  // Handle scrolling to load more messages
  const handleScroll = () => {
    if (
      messageContainerRef.current.scrollTop <= 0.01 &&
      hasMore &&
      !isFetching
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const container = messageContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasMore, isFetching]);

  return (
    <Layout hasProfile icon="list">
      <div className="cardProfile text-sm mt-15 text-thirdPrimay relative h-fit py-1">
        <div className="change-password-text my-3 font-bold text-[18px]">
          الدعم
        </div>
        <div
          id="message"
          ref={messageContainerRef}
          className="h-100 flex flex-col my-2 mt-8 gap-6 overflow-y-scroll"
        >
          {isLoading && messages.length === 0
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skelton key={index} />
              ))
            : messages
                ?.slice()
                .reverse()
                .map((item) => (
                  <div key={item.message_id}>
                    {item?.is_admin && (
                      <div className="flex items-end gap-1 mx-4">
                        <img
                          src={
                            item?.user?.image_path === ''
                              ? admin
                              : item?.user?.image_path
                          }
                          alt="Admin"
                        />
                        <div
                          style={{ background: '#9D86BE' }}
                          className="w-fit py-2.5 px-4 rounded-es-none rounded-xl h-fit text-center items-center"
                        >
                          {item?.message}
                        </div>
                      </div>
                    )}
                    {item?.is_admin === false && (
                      <div className="flex items-end gap-1 mx-3 justify-end">
                        <div
                          style={{ background: '#C6BADB' }}
                          className="w-fit py-2.5 px-4 rounded-ee-none rounded-xl h-fit text-center items-center"
                        >
                          {item?.message}
                        </div>
                        <img
                          src={
                            item?.user?.image_path === ''
                              ? user
                              : item?.user?.image_path
                          }
                          alt="User"
                          className="w-7 h-7 rounded-full"
                        />
                      </div>
                    )}
                  </div>
                ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex mb-14 items-center gap-1 mx-4 "
        >
          <button type="submit" className="border-none bg-transparent">
            <img src={arrow} alt="Submit" />
          </button>
          <input
            required
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="...إرسال رسالة"
            className="border-yellow focus:outline-none focus:border-primary border text-black w-full text-end px-3 py-1 h-fit rounded-xl"
          />
        </form>
      </div>
    </Layout>
  );
};
export default index;
