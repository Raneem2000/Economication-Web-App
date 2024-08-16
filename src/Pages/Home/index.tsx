import Frame from '../../assets/Home/Frame.svg';
import Frame9 from '../../assets/Home/Frame 9.png';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import Cookie from 'cookie-universal';

const index = () => {
  const cookie = Cookie();

  return (
    <Layout hasProfile>
      <div className="sm:mx-4 items-center  text-center flex flex-col ">
        <p className="mb-4">أهلا بيك في مسابقة</p>
        <img src={Frame} />
        <p className="w-60 text-center">
          يلا العب دلوقتي وزود نقاطك وفرص الفوز بالجائزة الكبرى معانا ب{' '}
        </p>
        <div className="text-yellow inline-flex gap-2 text-center ">
          <span>ألف جنيه</span> <span> 50</span>{' '}
        </div>
        <Link to={`${cookie.get('Gamzie') ? '/play' : '/login'}`}>
          <img src={Frame9} className="h-12 w-40 mt-4" />
        </Link>
      </div>
    </Layout>
  );
};

export default index;
