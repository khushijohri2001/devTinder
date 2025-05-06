import React, { memo } from "react";
import InputTag from "./InputTag";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/profileSlice";

const InputTagCard = memo(({ data }) => {

  const dispatch = useDispatch();

  const closeTagHandler = (closeTagValue) => {
    const updatedTagList = data.filter(
      (item) => item !== closeTagValue
    );
    dispatch(updateProfile({ skills: updatedTagList }));
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {data.map((value) => (
        <InputTag key={value} value={value} closeTagHandler={closeTagHandler} />
      ))}
    </div>
  );
});

export default InputTagCard;
