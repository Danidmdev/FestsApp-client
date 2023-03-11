import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'
import SideNavBar from './components/SideNavBar/SideNavBar';
import UserMessage from './components/UserMessage/UserMessage';
import AppRoutes from './routes/AppRoutes'

const App = () => {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isContentShifted, setIsContentShifted] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavOpen(!isNavOpen);
    setIsContentShifted(!isNavOpen);
  }

  return (
    <div className="App">
      <div className='row'>
        <div className=''>
          <SideNavBar isOpen={isNavOpen} onToggle={handleNavbarToggle} />
          <div className={`content-container ${isNavOpen ? "is-nav-open" : ""} ${isContentShifted ? "shifted" : ""}`}>
            <AppRoutes />
            <Footer />
            <UserMessage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
