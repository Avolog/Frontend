import './Input.css';

function Input({ type = 'text', placeholder, icon, value, onChange, name }) {
  return (
    <div className="input-wrapper">
      {icon && <span className="input-icon">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="input-field"
      />
    </div>
  );
}

export default Input;
