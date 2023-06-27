export const FormRowComponent = ({
  labelText,
  type,
  name,
  value,
  handleChange,
  handleBlur,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      {type ? (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
          className="form-input"
          maxLength="20"
        />
      ) : (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
          className="form-textarea"
          maxLength="80"
        />
      )}
    </div>
  );
};
