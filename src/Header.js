import React, { useState } from 'react';
import Modal from './Modal';
import Login from './Login';
import SignUp from './SignUp';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentMode, setCurrentMode] = useState('login');

  const toggleModal = (mode) => {
    setShowModal(!showModal);
    setCurrentMode(mode);
  };

  return (
    <header className="header-container">
      <div className="menu-container">
        <nav>
          <ul>
            <li>
              <a href="https://www.flyhigh.ai/" target="_blank" rel="noopener noreferrer">About</a>
            </li>
            <li>
              <button onClick={() => toggleModal('login')}>Login</button>
            </li>
            <li>
              <button onClick={() => toggleModal('signup')}>Signup</button>
            </li>
          </ul>
        </nav>
      </div>
      {showModal && (
        <Modal show>
          {currentMode === 'login' ? (
            <Login />
          ) : currentMode === 'signup' ? (
            <SignUp />
          ) : null}
        </Modal>
      )}
    </header>
  );
};

export default Header;
