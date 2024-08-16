// src/App.js

import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Play from './Pages/Play';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import TopPerson from './Pages/TopPerson';
import Roles from './Pages/Roles';
import Notification from './Pages/Notification';
import Profile from './Pages/Profile/ProfileUser';
import UpdateProfile from './Pages/Profile/ProfileUser/UpdateProfile';
import ChargePoints from './Pages/userPoints/ChargePoints';
import PlayPoints from './Pages/userPoints/PlayPoints';
import Settings from './Pages/Profile/Settings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from './Pages/Profile/ProfileUser/ChangePassword';
import { showSuccess } from './libs/ReactToastify';
import Support from './Pages/Support';
import DisableZoom from './components/DisableZoom DisableZoom';
import usePusher from './hook/usePusher';

function App() {
  const userId = localStorage.getItem('id');

  // Use the usePusher hook to subscribe to Pusher events
  usePusher(userId, showSuccess);

  return (
    <>
      <DisableZoom />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/play" element={<Play />} />
        <Route path="/top-person" element={<TopPerson />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/charge-points" element={<ChargePoints />} />
        <Route path="/play-points" element={<PlayPoints />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
