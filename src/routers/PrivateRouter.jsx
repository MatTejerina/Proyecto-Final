import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavbarComponent from '../components/NavbarComponent'
import AdminPage from '../pages/AdminPage';
import HomePage from '../pages/HomePage';
import AppointmentsPage from '../pages/AppointmentsPage';
import PatientPage from '../pages/PatientPage';
import PlansPage from '../pages/PlansPage';
import ContactPage from '../pages/ContactPage';
import AboutPage from '../pages/AboutPage';
import ErrorPage from '../pages/ErrorPage';
import Footer from '../components/FooterComponent';


const PrivateRouter = ({ user, setUser }) => {
  const isAdminPage = window.location.pathname === '/adminPage';
  return (

    <>
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
        <Route path="/*" element={<Navigate to='/errorPage' />} />
      </Routes>
      <Footer />
    </>
  )
}
export default PrivateRouter;