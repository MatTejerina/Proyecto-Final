import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import '../App.css';
import ErrorPage from '../pages/ErrorPage';
import RegisterPage from '../pages/RegisterPage';
import PlansPage from '../pages/PlansPage';
import ContactPage from '../pages/ContactPage';
import AboutPage from '../pages/AboutPage';
import Footer from '../components/FooterComponent';
import NavbarComponent from '../components/NavbarComponent';


const PublicRouter = ({ user, setUser }) => {
  const location = useLocation();

  const isErrorPage = location.pathname === "/errorPage" || !isValidRoute(location.pathname);

  function isValidRoute(pathname) {
    const validRoutes = [
      "/",
      "/loginPage",
      "/aboutPage",
      "/contactPage",
      "/errorPage",
      "/plansPage",
      "/registerPage",
      "/homePage"
    ];

    return validRoutes.includes(pathname);
  }
  return (

    <>
      <div className={`app ${isErrorPage ? "no-styles" : ""}`}>
        {!isErrorPage && <NavbarComponent user={user} setUser={setUser} />}
        <div className="main-content">
          <Routes>
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/" element={<Navigate to="/homePage" />} />
            <Route path="/loginPage" element={<LoginPage setUser={setUser} />} />
            <Route path="/registerPage" element={<RegisterPage setUser={setUser} user={user} />} />
            <Route path="/contactPage" element={<ContactPage />} />
            <Route path="/aboutPage" element={<AboutPage />} />
            <Route path="/errorPage" element={<ErrorPage />} />
            <Route path="/plansPage" element={<PlansPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
        {!isErrorPage && <Footer />}
      </div>
    </>

  )
}
export default PublicRouter;