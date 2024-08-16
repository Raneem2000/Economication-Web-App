import Layout from '../../../components/Layout';
import Lock from '../../../assets/Auth/Lock.svg';
import Mobile from '../../../assets/Auth/Mobile.svg';
import Profile from '../../../assets/Auth/profile.svg';
import CustomField from '../../../components/CustomFieldAuth';
import { Form, Formik } from 'formik';
import { Axios } from '../../../Api/axios';
import * as Yup from 'yup';
import Cookie from 'cookie-universal';
import { SIGNUP } from '../../../Api/Api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import logo from '../../../assets/Auth/gif gmame.gif';
import CustomCheckboxField from '../../../components/CheckBox';
import { v4 as uuidv4 } from 'uuid'; // استيراد مكتبة uuid

const index = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let uuid = queryParams.get('uuid');

  // إذا لم يكن uuid موجودًا في رابط URL، قم بتوليد UUID جديد
  if (!uuid) {
    uuid = uuidv4();
    console.log('Generated UUID:', uuid);
  }

  const cookie = Cookie();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
    password_confirmation: '',
    phone: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('كلمة السر مطلوبة')
      .min(4, 'أدخل أكثر من أربع محارف'),
    password_confirmation: Yup.string()
      .min(4, 'أدخل أكثر من أربع محارف')
      .required('التأكيد مطلوب')
      .oneOf([Yup.ref('password')], 'يجب أن تتطابق مع كلمة السر')
      .required('تأكيد كلمة السر مطلوب'),
    username: Yup.string().required('اسم المستخدم مطلوب'),
    phone: Yup.string()
      .required('رقم الهاتف مطلوب')
      .matches(/^01\d{9}$/, 'رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم'),
    acceptTerms: Yup.bool().oneOf(
      [true],
      'الموافقة على الشروط والأحكام مطلوبة',
    ),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: Function },
  ) => {
    try {
      const valuesWithUUID = {
        ...values,
        uuid: uuid, // استخدام uuid من الرابط أو قيمة افتراضية
      };
      const res = await Axios.post(`${SIGNUP}`, valuesWithUUID);
      cookie.set('Gamzie', res.data.data.token);
      localStorage.setItem('username', res?.data?.data?.user?.username);
      console.log(res);
      localStorage.setItem('id', res?.data?.data?.user?.id);
      setSubmitting(false);
      window.location.pathname = '/';
    } catch (error: any) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mb-4">
        <div className="bg-white text-black flex gap-1 flex-col items-center  w-[312px] h-fit mx-auto sm:m-0 rounded-2xl shadow-lg">
          <img src={logo} className=" mt-5 mb-2 w-22" />
          <h3 className="font-semibold">مرحبًا بك</h3>
          <div className="flex justify-center gap-3 text-base">
            <Link to={'/login'} className="text-primary">
              تسجيل الدخول
            </Link>
            <p>لديك حساب بالفعل؟ </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col  w-full px-5 mt-2 gap-4 font-bold text-xs sm:text-sm md:text-base">
                <CustomField
                  name="username"
                  placeholder="ادخل اسم المستخدم"
                  type="text"
                  img={Profile}
                />
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
                <CustomField
                  name="password_confirmation"
                  placeholder="أعد إدخال الباسورد / الرمز"
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
                  className="flex items-center justify-center font-light mx-auto w-30 h-10 px-4 py-4 my-3 rounded-lg bg-primary shadow-md text-white text-lg uppercase cursor-pointer"
                >
                  {isSubmitting ? <Loader /> : 'التسجيل'}
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
