import { useState } from 'react';
import { useAppContext } from '../context/appContext';
import { translations } from '../data';
import img from '../assets/images/developer.jpg';

import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
} from 'react-icons/fa';

const initialInfo = {
  image: img,
  phone: '+372-5631-6070',
  email: 'alexandr-kadulin@hotmail.com',
  age: 32,
  address: 'Tallinn, Estonia',
  name: 'Alexandr Kadulin',
};

export const DevelopersTeamPage = () => {
  const { local } = useAppContext();

  const [info, setInfo] = useState(initialInfo);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('Alexandr Kadulin');

  const handleMouseOver = (e) => {
    if (e.target.classList.contains('about-icon')) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(info[newValue]);
    }
  };

  return (
    <section className="section about">
      <h3>{translations[local].aboutTitle}</h3>
      <div className="about-center">
        <div className="about-container">
          <img src={info.image} alt="developer" className="about-img" />
          <div className="about-title">{title}</div>
          <div className="about-value">{value}</div>
          <div className="values-list">
            <button
              className="about-icon"
              data-label="name"
              onMouseOver={handleMouseOver}
            >
              <FaUser />
            </button>
            <button
              className="about-icon"
              data-label="email"
              onMouseOver={handleMouseOver}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="about-icon"
              data-label="age"
              onMouseOver={handleMouseOver}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="about-icon"
              data-label="address"
              onMouseOver={handleMouseOver}
            >
              <FaMap />
            </button>
            <button
              className="about-icon"
              data-label="phone"
              onMouseOver={handleMouseOver}
            >
              <FaPhone />
            </button>
          </div>
        </div>
      </div>
      <div className="about-center-small">
        <div className="about-title-small">{title}</div>
        <div className="about-value-small">{value}</div>
      </div>
    </section>
  );
};
