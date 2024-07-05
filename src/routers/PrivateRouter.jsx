import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavbarComponent from '../components/NavbarComponent'
import AdminPage from '../pages/AdminPage';
import HomePage from '../pages/HomePage';
import TurnPage from '../pages/TurnPage';
import PatientPage from '../pages/PatientPage';
import PlansPage from '../pages/PlansPage';
import ContacPage from '../pages/ContacPage';
import AboutPage from '../pages/AboutPage';
import ErrorPage from '../pages/ErrorPage';
import Footer from '../components/FooterComponent';


const PrivateRouter = ({ user, setUser }) => {
  return (

    <BrowserRouter>
      <NavbarComponent user={user} setUser={setUser} />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/turns" element={<TurnPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/contact" element={<ContacPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/patients" element={<PatientPage />} />
        <Route path="/home" element={<HomePage setUser={setUser} />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
export default PrivateRouter;