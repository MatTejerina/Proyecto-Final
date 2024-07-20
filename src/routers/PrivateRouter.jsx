import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AdminPage from '../pages/AdminPage';
import '../App.css';
import HomePage from '../pages/HomePage';
import AppointmentsPage from '../pages/AppointmentsPage';
import PatientPage from '../pages/PatientPage';
import PlansPage from '../pages/PlansPage';
import ContactPage from '../pages/ContactPage';
import AboutPage from '../pages/AboutPage';
import ErrorPage from '../pages/ErrorPage';
import Footer from '../components/FooterComponent';
import NavbarComponent from '../components/NavbarComponent';


const PrivateRouter = ({ user, setUser }) => {
  const isAdminPage = window.location.pathname === '/adminPage';
  const location = useLocation();

  const isErrorPage = location.pathname === "/errorPage" || !isValidRoute(location.pathname);

  function isValidRoute(pathname) {
    const validRoutes = [
      "/",
      "/patientPage",
      "/homePage",
      "/aboutPage",
      "/contactPage",
      "/adminPage",
      "/errorPage",
      "/plansPage",
      "/aboutPage",
      "/appointmentPage"
    ];

    return validRoutes.includes(pathname);
  }
  return (

    <>
      <div className={`app ${isErrorPage ? "no-styles" : ""}`}>
        {!isErrorPage && <NavbarComponent user={user} setUser={setUser} />}
        <div className="main-content">
          <Routes>
            {user.isAdmin ? <Route path="/adminPage" element={<AdminPage />} /> : null}
            {user.isAdmin ? <Route path="/appointmentPage" element={<AppointmentsPage />} /> : null}
            {user.isAdmin ? <Route path="/patientPage" element={<PatientPage />} /> : null
            }

            <Route path="/plansPage" element={<PlansPage />} />
            <Route path="/contactPage" element={<ContactPage />} />
            <Route path="/aboutPage" element={<AboutPage />} />
            <Route path="/homePage" element={<HomePage setUser={setUser} />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/errorPage" element={<ErrorPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
        {!isErrorPage && <Footer />}
      </div>
    </>
  )
}
export default PrivateRouter;