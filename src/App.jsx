import { Route, Routes } from "react-router-dom"
import PatientPage from "./pages/PatientPage"
import TurnPage from "./pages/TurnPage"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import ErrorPage from "./pages/ErrorPage"
import PlansPage from "./pages/PlansPage"
import RegisterPage from "./pages/RegisterPage"
import NavbarComponent from "./components/NavbarComponent"


function App() {

  return (
    <>
    <NavbarComponent/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="patientPage" element={<PatientPage/>}/>
        <Route path="aboutPage" element= {<AboutPage/>}/>
        <Route path="contactPage" element= {<ContactPage/>}/>
        <Route path="errorPage" element= {<ErrorPage/>}/>
        <Route path="plansPage" element= {<PlansPage/>}/>
        <Route path="registerPage" element= {<RegisterPage/>}/>
        <Route path="turnPage" element={<TurnPage/>}/>
      </Routes>      
    </>
  )
};

export default App;
