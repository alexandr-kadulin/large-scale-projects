import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import { LogoComponent, NavLinksComponent } from '.';

export const SmallSidebarComponent = () => {
  const { toggleSidebar, showSidebar } = useAppContext();

  return (
    <aside className="small-sidebar">
      <div
        className={
          showSidebar
            ? 'small-sidebar-container show-small-sidebar-container'
            : 'small-sidebar-container'
        }
      >
        <div className="small-sidebar-content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <LogoComponent />
          </header>
          <NavLinksComponent toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </aside>
  );
};
