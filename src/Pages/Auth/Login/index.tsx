import React from 'react';
import Layout from '../../../components/Layout';
import Lock from '../../../assets/Auth/Lock.svg';
import Mobile from '../../../assets/Auth/Mobile.svg';
import CustomField from '../../../components/CustomFieldAuth';
import CustomCheckboxField from '../../../components/CheckBox'
import { Form, Formik } from 'formik';
import { Axios } from '../../../Api/axios';
import * as Yup from 'yup';
import Cookie from 'cookie-universal';
import { SIGNIN } from '../../../Api/Api';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import logo from '../../../assets/Auth/gif gmame.gif';
import { showError } from '../../../libs/ReactToastify';

const index = () => {
  const cookie = Cookie();
  const navigate = useNavigate();
  const initialValues = {
    password: '',
    phone: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('كلمة السر مطلوبة')
      .min(4, 'أدخل أكثر من 4 محارف'),
    phone: Yup.string()
      .required('رقم الهاتف مطلوب')
      .matches(/^01\d{9}$/, 'رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم'),
    acceptTerms: Yup.bool().oneOf([true], 'الموافقة على الشروط والأحكام مطلوبة'),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: Function },
  ) => {
    try {
      const res = await Axios.post(`${SIGNIN}`, values);
      cookie.set('Gamzie', res?.data?.data?.token);
      localStorage.setItem('username', res?.data?.data?.user?.username);
      localStorage.setItem('id', res?.data?.data?.user?.id);
      setSubmitting(false);
      window.location.pathname = '/';
    } catch (error: any) {
      showError(error?.response?.data?.message || 'Error Network');
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mb-4 ">
        <div className="bg-white text-black flex gap-1 flex-col items-center  w-[312px] h-fit mx-auto sm:m-0 rounded-2xl shadow-lg">
          <img src={logo} className=" mt-5 mb-2 w-22" />
          <h3 className="font-semibold">مرحبًا بعودتك</h3>
          <div className="flex justify-center gap-3 text-base">
            <Link to={'/register'} className="text-primary">
              إشتـرك الأن
            </Link>
            <p>لا تملك حساباً حتى الأن؟</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col  w-full px-5 mt-2 gap-4 font-bold text-xs sm:text-sm md:text-base">
                <CustomField
                  name="phone"
                  placeholder="ادخل رقم الموبايل"
                  type="text"
                  img={Mobile}
                />
                <CustomField
                  name="password"
                  placeholder="ادخل الباسورد / الرمز"
                  type="password"
                  img={Lock}
                />
                <CustomCheckboxField
                  name="acceptTerms"
                  label="موافق على الشروط والأحكام"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    boxShadow: '0px 4px 12px 0px rgba(16, 3, 51, 0.40)',
                  }}
                  className="flex items-center justify-center  mx-auto w-auto h-10 px-4 py-4 my-4 rounded-lg bg-primary shadow-md text-white sm:text-lg uppercase cursor-pointer"
                >
                  {isSubmitting ? <Loader /> : 'تسجيل الدخول'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default index;
