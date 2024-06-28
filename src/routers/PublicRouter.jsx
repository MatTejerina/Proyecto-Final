import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NavbarComponent from '../components/NavbarComponent'
import ErrorPage from '../pages/ErrorPage';
import RegisterPage from '../pages/RegisterPage';
import ContacPage from '../pages/ContacPage';
import AboutPage from '../pages/AboutPage';

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
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>

  )
}
export default PublicRouter;