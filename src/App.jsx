import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginRegisterPage from './pages/LoginRegisterPage.jsx';
import Navbar from './components/Navbar.jsx'; // o donde esté tu navbar
import ProfilePage from './pages/ProfilePage.jsx';
import HardwareDetail from './pages/HardwareDetail';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginRegisterPage mode="login" />} />
        <Route path="/register" element={<LoginRegisterPage mode="register" />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/hardware/:id" element={<HardwareDetail />} />
        
      </Routes>
    </>
  );
}

export default App;
