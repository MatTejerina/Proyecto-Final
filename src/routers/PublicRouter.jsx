import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NavbarComponent from '../components/NavbarComponent'
import ErrorPage from '../pages/ErrorPage';
import RegisterPage from '../pages/RegisterPage';
import ContactPage from '../pages/ContactPage';
import AboutPage from '../pages/AboutPage';
import Footer from '../components/FooterComponent';

const PublicRouter = ({ user, setUser }) => {
  return (

    <BrowserRouter>
      <NavbarComponent user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/loginPage" element={<LoginPage setUser={setUser} />} />
        <Route path="/registerPage" element={<RegisterPage setUser={setUser} user={user} />} />
        <Route path="/contactPage" element={<ContactPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/errorPage" element={<ErrorPage />} />
        <Route path="/*" element={<Navigate to='/errorPage' />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  )
}
export default PublicRouter;