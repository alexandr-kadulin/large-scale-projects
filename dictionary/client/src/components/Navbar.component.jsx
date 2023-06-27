import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import { LogoComponent } from '.';
import { translations } from '../data';

export const NavbarComponent = () => {
  const { toggleSidebar, logoutUser, user, local } = useAppContext();

  const [showLogout, setShowLogout] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <LogoComponent />
          <h3 className="logo-text">{translations[local].dashboardTitle}</h3>
        </div>
        <div className="nav-btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              {translations[local].logoutButton}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
