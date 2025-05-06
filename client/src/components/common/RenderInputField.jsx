 // -- Utility for rendering input fields --
 const RenderInputField = ({ label, name, value, handler,  type = "text"}) => {
    return (
      <div>
        <label className="label">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handler}
          className={`input w-full ${
            name === "email" && "disabled:border disabled:border-gray-300"
          }`}
          disabled={name === "email"}
        />
      </div>
    );
  };

  export default RenderInputField