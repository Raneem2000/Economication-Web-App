import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import imagePlaceholder from '../../../assets/Profile/USERE.svg';
import frame from '../../../assets/Profile/Frame (6).png';
import { Form, Formik } from 'formik';
import { Axios } from '../../../Api/axios';
import * as Yup from 'yup';
import Cookie from 'cookie-universal';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import edit from '../../../assets/Profile/Edit.png';
import { SHOWPROFILE, UPDATEPROFILE } from '../../../Api/Api';
import { showError } from '../../../libs/ReactToastify';
import Loader from '../../../components/Loader';
import CustomInput from '../../../components/CustomInput';

const Index = () => {
  const cookie = Cookie();
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState(null);

  const {
    data: showProfile,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const response = await Axios.get(SHOWPROFILE);
      return response?.data?.data;
    },
    queryKey: ['show-profile'],
  });

  const initialValues = {
    phone: showProfile?.phone,
    password: '',
    username: showProfile?.username || '',
    email: showProfile?.email || '',
    date_of_birth: showProfile?.date_of_birth || '',
    address: showProfile?.address || '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('اسم المستخدم مطلوب'),
    email: Yup.string()
      .email('البريد الإلكتروني غير صحيح')
      .required('البريد الإلكتروني مطلوب'),
    date_of_birth: Yup.date().required('تاريخ الميلاد مطلوب'),
    address: Yup.string().required('العنوان مطلوب'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('_method', 'put'); // إضافة حقل _method

      if (newImage && typeof newImage !== 'string') {
        formData.append('media', newImage);
      }

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const res = await Axios.post(`${UPDATEPROFILE}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      localStorage.setItem('username', values?.username);
      setSubmitting(false);
      navigate('/profile');
    } catch (error) {
      showError(error?.response?.data?.message || 'Error Network');
      setSubmitting(false);
    }
  };

  const handleChooseImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file);
    }
  };

  return (
    <Layout hasProfile icon="list">
      <div className="cardProfile sm:mx-4 mt-3 text-black-2 text-base relative h-fit py-1">
        <img
          src={
            newImage
              ? typeof newImage === 'string'
                ? newImage
                : URL.createObjectURL(newImage)
              : showProfile?.media || imagePlaceholder
          }
          className={`absolute top-0  mx-auto translate-x-21 -translate-y-19 ${
            showProfile?.media &&
            ' w-20 h-20 top-6 border border-orange rounded-full translate-x-29 -translate-y-11 object-cover'
          } ${
            newImage
              ? 'border border-orange rounded-full absolute top-0  w-18.5 h-19 mx-5 translate-x-25 -translate-y-10  object-cover'
              : ''
          }`}
          alt="Profile"
        />

        <label htmlFor="imageUpload">
          <img
            src={frame}
            className="absolute top-2 right-28 cursor-pointer"
            alt="Bottom Right Image"
          />
        </label>
        <input
          id="imageUpload"
          type="file"
          style={{ display: 'none' }}
          onChange={handleChooseImage}
        />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col w-full px-5 mt-4 gap-1 font-bold text-xs sm:text-sm md:text-base">
              <CustomInput
                name="username"
                placeholder="الاسم"
                type="text"
                icon={edit}
                label="الاسم"
                imgIcon
              />
              <CustomInput
                name="phone"
                placeholder="رقم الموبايل"
                type="text"
                icon={edit}
                label="رقم الموبايل"
                imgIcon
                disabled
              />
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/change-password`)}
              >
                <CustomInput
                  name="password"
                  placeholder="كلمة المرور"
                  type="text"
                  label="كلمة المرور"
                  textIcon="تغيير"
                />
              </div>
              <CustomInput
                name="email"
                placeholder="البريد الالكتروني"
                type="text"
                icon={edit}
                label="البريد الالكتروني"
                imgIcon
              />
              <CustomInput
                name="date_of_birth"
                placeholder="تاريخ الميلاد"
                type="date"
                icon={edit}
                label="تاريخ الميلاد"
                imgIcon
              />
              <CustomInput
                name="address"
                placeholder="العنوان"
                type="text"
                icon={edit}
                label="العنوان"
                imgIcon
              />
              <div className="flex justify-around my-2">
                <button
                  className="confirm cursor-pointer "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader /> : 'حفظ'}
                </button>
                <button
                  className="cancel cursor-pointer"
                  onClick={() => navigate(`/profile`)}
                >
                  إلغاء
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Index;
