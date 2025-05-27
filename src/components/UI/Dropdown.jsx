const Dropdown = ({ label, name, value, onChange, options, required = false }) => {
    return (
      <div className="input-group">
        {label && <label className="input-label">{label}</label>}
        <select
          className="input-field"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Dropdown;