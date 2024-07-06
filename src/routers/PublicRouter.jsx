import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NavbarComponent from '../components/NavbarComponent'
import ErrorPage from '../pages/ErrorPage';
import RegisterPage from '../pages/RegisterPage';
import ContacPage from '../pages/ContacPage';
import AboutPage from '../pages/AboutPage';
import Footer from '../components/FooterComponent';

const PublicRouter = ({ user, setUser }) => {
  return (

    <BrowserRouter>
      <NavbarComponent user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage setUser={setUser} user={user} />} />
        <Route path="/contact" element={<ContacPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="/*" element={<Navigate to='/404' />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  )
}
export default PublicRouter;