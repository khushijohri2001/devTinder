import React from "react";

const InputTag = ({value, closeTagHandler}) => {
  return (
    <div>
      <div className="badge badge-soft ">
        {value}
         <i className="fa-solid fa-xmark text-md hover:text-secondary" 
         onClick={() => closeTagHandler(value)}
         ></i>
      </div>
    </div>
  );
};

export default InputTag;
