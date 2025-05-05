import React from "react";

const UserCard = ({
  firstName,
  lastName,
  age,
  gender,
  photoUrl,
  about,
  skills,
}) => {
  const trimmedAbout = (str) => {
    const strArr = str.split(" ");

    if (strArr.length > 15) {
      about = strArr.slice(0, 15).join(" ") + "...";
    }
    return about;
  };

  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <div className="p-4 flex justify-between items-center">
        <h2 className="card-title text-xl">
          {firstName} {lastName}
          <div className="badge badge-secondary text-lg">{age}</div>
        </h2>
        <p className="text-secondary font-semibold">{gender}</p>
      </div>
      <figure>
        <img src={photoUrl} alt={`${firstName} ${lastName}`} />
      </figure>

      <div className="card-body">
        <p>{trimmedAbout(about)}</p>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 mb-6">
            {skills.map((skill) => (
              <div className="badge badge-outline badge-secondary" key={skill}>
                {skill}
              </div>
            ))}
          </div>
        )}
        <div className="card-actions justify-between">
        <button className="btn btn-error text-white">⛌ Ignore</button>
        <button className="btn btn-success">Interested ✓</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
