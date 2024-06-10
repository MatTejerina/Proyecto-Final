import { Route, Routes } from "react-router-dom"
import PatientPage from "./pages/PatientPage"
import HomePage from "./pages/HomePage"
import NavbarComponent from "./components/NavbarComponent"


function App() {

  return (
    <>
    <NavbarComponent/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="patientPage" element={<PatientPage/>}/>
      </Routes>      
    </>
  )
}

export default App
