import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { LogoComponent } from '../components';
import main from '../assets/images/main.svg';
import { translations } from '../data';

export const LandingPage = () => {
  const { local, setLocal } = useAppContext();

  useEffect(() => {
    setLocal(localStorage.getItem('local') || 'en');
    // eslint-disable-next-line
  }, []);

  return (
    <main className="landing">
      <nav className="landing-nav-container">
        <div className="landing-nav">
          <LogoComponent />
          <h1>
            <span>Dictionary</span> App
          </h1>
        </div>
        <button
          type="button"
          className="member-btn"
          onClick={() =>
            setLocal(localStorage.getItem('local') === 'en' ? 'ru' : 'en')
          }
        >
          <h4 className="language-title">{local}</h4>
        </button>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>{translations[local].landingTitle}</h1>
          <p>{translations[local].landingText}</p>
          <Link to="/register" className="btn btn-hero">
            {translations[local].loginTitle}/{translations[local].registerTitle}
          </Link>
        </div>
        <img src={main} alt="dictionary app" className="img landing-img" />
      </div>
    </main>
  );
};
