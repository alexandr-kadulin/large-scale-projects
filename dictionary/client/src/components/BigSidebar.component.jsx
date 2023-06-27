import { useAppContext } from '../context/appContext';
import { NavLinksComponent, LogoComponent } from '.';

export const BigSidebarComponent = () => {
  const { showSidebar } = useAppContext();

  return (
    <aside className="big-sidebar">
      <div
        className={
          showSidebar
            ? 'big-sidebar-container'
            : 'big-sidebar-container show-big-sidebar'
        }
      >
        <div className="big-sidebar-content">
          <header className="big-sidebar-header">
            <LogoComponent />
          </header>
          <NavLinksComponent />
        </div>
      </div>
    </aside>
  );
};
