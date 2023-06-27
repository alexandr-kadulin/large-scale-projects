import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { FormRowComponent, LogoComponent, AlertComponent } from '../components';
import { translations } from '../data';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

export const RegisterPage = () => {
  const { user, isLoading, showAlert, displayAlert, setupUser, local } =
    useAppContext();

  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };

    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: translations[local].loginSuccessAlert,
      });
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: translations[local].userCreatedAlert,
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <section className="register full-page">
      <form className="form" onSubmit={handleSubmit}>
        <LogoComponent />
        <h3>
          {values.isMember
            ? translations[local].loginTitle
            : translations[local].registerTitle}
        </h3>
        {showAlert && <AlertComponent />}
        {!values.isMember && (
          <FormRowComponent
            labelText={translations[local].nameLabel}
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRowComponent
          labelText={translations[local].emailLabel}
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRowComponent
          labelText={translations[local].passwordLabel}
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {values.isMember
            ? translations[local].loginButton
            : translations[local].registerButton}
        </button>
        <p>
          {values.isMember
            ? translations[local].isNotMemberText
            : translations[local].isMemberText}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember
              ? translations[local].registerButton
              : translations[local].loginButton}
          </button>
        </p>
      </form>
    </section>
  );
};
