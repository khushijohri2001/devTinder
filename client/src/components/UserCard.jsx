import React from "react";
import { trimmedAbout } from "../utils/helperFunctions.jsx";
import { useDispatch } from "react-redux";
import { profilePreviewToggle } from "../redux/profileSlice.js";

const UserCard = ({
  firstName,
  lastName,
  age,
  gender,
  photoUrl,
  about,
  skills,
  cardType,
}) => {
  const dispatch = useDispatch();

  const profilePreviewHandler = () => {
    dispatch(profilePreviewToggle());
  };

  return (
    <div className="card bg-base-200 w-96 shadow-sm max-h-[620px]">
      <div className="p-4 flex justify-between items-center">
        <h2 className="card-title text-xl">
          {firstName} {lastName}
          <div className="badge badge-secondary text-lg">{age}</div>
        </h2>
        {cardType === "profile" && (
          <button className="btn btn-outline btn-secondary" onClick={profilePreviewHandler}>Preview <span className="text-2xl">⤬</span></button>

        )}
      </div>
      <figure>
        <img src={photoUrl} alt={`${firstName} ${lastName}`} className="max-h-80 w-full object-cover" />
      </figure>

      <div className="card-body">
        <p className="text-secondary font-semibold capitalize">{gender}</p>
        {about && <p className="mb-3">{trimmedAbout(about)}</p>}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {skills.map((skill) => (
              <div className="badge badge-outline badge-secondary" key={skill}>
                {skill}
              </div>
            ))}
          </div>
        )}
        {cardType === "feed" && (
          <div className="card-actions justify-between">
            <button className="btn btn-error text-white">⛌ Ignore</button>
            <button className="btn btn-success">Interested ✓</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
