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
  return (

    <BrowserRouter>
      <NavbarComponent user={user} setUser={setUser} />
      <Routes>
        {
          user.isAdmin ? <Route path="/adminPage" element={<AdminPage />} /> : null
        }
        <Route path="/appointmentPage" element={<AppointmentsPage />} />
        <Route path="/plansPage" element={<PlansPage />} />
        <Route path="/contactPage" element={<ContactPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/patientPage" element={<PatientPage />} />
        <Route path="/homePage" element={<HomePage setUser={setUser} />} />
        <Route path="/errorPage" element={<ErrorPage />} />
        <Route path="/*" element={<Navigate to='/errorPage' />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
export default PrivateRouter;