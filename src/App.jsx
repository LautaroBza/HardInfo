import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginRegisterPage from './pages/LoginRegisterPage.jsx';
import Navbar from './components/Navbar.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import HardwareDetail from './pages/HardwareDetail';
import ComparePage from './pages/ComparePage';
import Favoritos from './pages/FavoritosPage';
import ProductosDestacados from './pages/ProductosDestacados.jsx';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos-destacados" element={<ProductosDestacados />} />
        <Route path="/login" element={<LoginRegisterPage mode="login" />} />
        <Route path="/register" element={<LoginRegisterPage mode="register" />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/hardware/:id" element={<HardwareDetail />} />
        <Route path="/comparar" element={<ComparePage />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </>
  );
}

export default App;
