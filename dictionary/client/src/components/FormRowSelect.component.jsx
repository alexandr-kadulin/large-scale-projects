import { useAppContext } from '../context/appContext';

export const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
}) => {
  const { isEditing } = useAppContext();

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
        disabled={isEditing}
      >
        {list.map((item) => {
          return (
            <option
              key={item.value}
              value={item.value}
              className="form-select-option"
            >
              {item.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};
