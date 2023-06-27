import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { translations } from '../data';
import img from '../assets/images/not-found.svg';

export const ErrorPage = () => {
  const { local } = useAppContext();

  return (
    <main className="error full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>{translations[local].notFoundTitle}</h3>
        <p>{translations[local].notFoundText}</p>
        <Link to="/">{translations[local].returnLink}</Link>
      </div>
    </main>
  );
};
