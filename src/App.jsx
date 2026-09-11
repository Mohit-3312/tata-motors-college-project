import './App.css'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Home from './components/hOME'
import Cars from './components/Cars'
import ElectricVehicles from './components/ElectricVehicles'
import Offers from './components/Offers'
import Finance from './components/Finance'
import Service from './components/Service'
import About from './components/About'
import Contact from './components/Contact'
import BookTestDrive from './components/BookTestDrive'
import Invalid from './components/Invalid'
import Footer from './components/Footer'
import Admin from './components/Admin'

function App() {
  return (
    <>
      {/* Persistent Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="pt-20"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/ev" element={<ElectricVehicles />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-test-drive" element={<BookTestDrive />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Invalid />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App