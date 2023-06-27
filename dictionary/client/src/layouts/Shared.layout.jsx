import { Outlet } from 'react-router-dom';
import {
  NavbarComponent,
  SmallSidebarComponent,
  BigSidebarComponent,
} from '../components';

export const SharedLayout = () => {
  return (
    <section className="shared-layout">
      <main className="dashboard">
        <SmallSidebarComponent />
        <BigSidebarComponent />
        <div>
          <NavbarComponent />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </section>
  );
};
