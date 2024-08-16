import Layout from '../../../components/Layout';
import image from '../../../assets/Profile/USERE.svg';
import frame from '../../../assets/Profile/Frame (6).png';
import { Form, Formik } from 'formik';
import { Axios } from '../../../Api/axios';
import * as Yup from 'yup';
import Cookie from 'cookie-universal';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useQuery } from 'react-query';
import edit from '../../../assets/Profile/Edit.png';
import eye from '../../../assets/Profile/Eye.png';
import { CHANGEPASSWORD, SHOWPROFILE, UPDATEPROFILE } from '../../../Api/Api';
import { showError } from '../../../libs/ReactToastify';
import Loader from '../../../components/Loader';
import CustomInput from '../../../components/CustomInput';
const ChangePassword = () => {
  const cookie = Cookie();
  const navigate = useNavigate();

  const initialValues = {
    password: '',
    password_confirmation: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('كلمة السر مطلوبة')
      .min(4, 'أدخل أكثر من أربع محارف'),
    password_confirmation: Yup.string()
      .min(4, 'أدخل أكثر من أربع محارف')
      .required('التأكيد مطلوب')
      .oneOf([Yup.ref('password')], 'يجب أن تتطابق مع كلمة السر'),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: Function },
  ) => {
    try {
      const res = await Axios.put(`${CHANGEPASSWORD}`, values);
      setSubmitting(false);
      navigate('/update-profile');
    } catch (error: any) {
      showError(error?.response?.data?.message || 'Error Network');
      setSubmitting(false);
    }
  };
  return (
    <Layout hasProfile icon="list">
      <div className="cardProfile sm:mx-4 mt-7 text-black-2 text-base relative h-fit py-1">
        <div className="change-password-text my-5 font-bold">
          تعديــل كلمـــة المــــرور
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col  w-full px-5 mt-4 gap-4 font-bold text-xs sm:text-sm md:text-base">
              <CustomInput
                name="password"
                placeholder="كلمة المرور الجديدة"
                type="password"
                icon={eye}
                label="كلمة المرور الجديدة"
                imgIcon
              />
              <CustomInput
                name="password_confirmation"
                placeholder="تـأكيــد كلمة المرور"
                type="password"
                icon={eye}
                label="تـأكيــد كلمة المرور"
                imgIcon
              />
              <span className="flex justify-end font-extralight text-sm text-primary">
                إحرص على إستخدام كلمة مـرور أمنة
              </span>
              <div className="flex justify-around mb-4 mt-7">
                <button
                  className="confirm cursor-pointer "
                  // type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader /> : 'حفظ'}
                </button>
                <button
                  className="cancel cursor-pointer"
                  onClick={() => navigate(`/update-profile`)}
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

export default ChangePassword;
