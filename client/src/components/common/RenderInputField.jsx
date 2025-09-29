 // -- Utility for rendering input fields --
 const RenderInputField = ({ label, name, value, handler, disable, placeholder, classes, type = "text"}) => {
    return (
      <div className="flex-1">
        <label className="label">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handler}
          className={`input w-full ${classes && classes} ${
            disable && "disabled:border disabled:border-gray-300"
          }`}
          disabled={disable}
        />
      </div>
    );
  };

  export default RenderInputField