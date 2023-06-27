import { useEffect, useState } from 'react';
import { FormRowComponent, AlertComponent } from '../components';
import { useAppContext } from '../context/appContext';
import { translations } from '../data';

export const ProfilePage = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, local } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [shouldUpdatePassword, setShouldUpdatePassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      displayAlert();
      return;
    }

    if (shouldUpdatePassword && (!oldPassword || !newPassword)) {
      displayAlert();
      return;
    }

    updateUser({ name, email, shouldUpdatePassword, oldPassword, newPassword });

    setShouldUpdatePassword(false);
  };

  useEffect(() => {
    if (shouldUpdatePassword === false) {
      setOldPassword('');
      setNewPassword('');
    }
  }, [shouldUpdatePassword]);

  return (
    <section className="section profile">
      <form onSubmit={handleSubmit}>
        <h3>{translations[local].profileTitle}</h3>
        {showAlert && <AlertComponent />}
        <div className="form-center">
          <FormRowComponent
            labelText={translations[local].nameLabel}
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRowComponent
            labelText={translations[local].emailLabel}
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          {shouldUpdatePassword && (
            <>
              <FormRowComponent
                labelText={translations[local].oldPasswordLabel}
                type="password"
                name="oldPassword"
                value={oldPassword}
                handleChange={(e) => setOldPassword(e.target.value)}
              />
              <FormRowComponent
                labelText={translations[local].newPasswordLabel}
                type="password"
                name="newPassword"
                value={newPassword}
                handleChange={(e) => setNewPassword(e.target.value)}
              />
            </>
          )}
          <div className="btn-container">
            <button
              type="button"
              className={
                shouldUpdatePassword ? 'btn clear-btn' : 'btn edit-btn'
              }
              onClick={() => setShouldUpdatePassword(!shouldUpdatePassword)}
              disabled={isLoading}
            >
              {shouldUpdatePassword
                ? translations[local].cancelButton
                : translations[local].changePasswordButton}
            </button>
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading
                ? translations[local].isLoadingButton
                : translations[local].saveButton}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
