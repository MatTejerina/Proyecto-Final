import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';
import RegisterPage from '../pages/RegisterPage';
import ContactPage from '../pages/ContactPage';
import AboutPage from '../pages/AboutPage';
import Footer from '../components/FooterComponent';
import NavbarComponent from '../components/NavbarComponent';

const PublicRouter = ({ user, setUser }) => {
  return (

    <>
      <NavbarComponent user={user} setUser={setUser} />
      <Routes>
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/homePage" />} />
        <Route path="/loginPage" element={<LoginPage setUser={setUser} />} />
        <Route path="/registerPage" element={<RegisterPage setUser={setUser} user={user} />} />
        <Route path="/contactPage" element={<ContactPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/errorPage" element={<ErrorPage />} />
        <Route path="/*" element={<Navigate to='/errorPage' />} />
      </Routes>
      <Footer />
    </>

  )
}
export default PublicRouter;