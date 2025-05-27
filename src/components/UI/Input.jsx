const Input = ({ label, type = 'text', value, onChange, name, required = false, ...props }) => {
    return (
      <div className="input-group">
        {label && <label className="input-label">{label}</label>}
        {type === 'textarea' ? (
          <textarea
            className="input-field textarea-field"
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            {...props}
          />
        ) : (
          <input
            className="input-field"
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            {...props}
          />
        )}
      </div>
    );
  };
  
  export default Input;