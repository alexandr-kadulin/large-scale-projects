import { useAppContext } from '../context/appContext';

export const AlertComponent = () => {
  const { alertType, alertText } = useAppContext();

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
