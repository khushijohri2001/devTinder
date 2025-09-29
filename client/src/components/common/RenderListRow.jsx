import React from "react";
import { Link } from "react-router-dom";

const RenderListRow = ({
  _id,
  firstName,
  lastName,
  age,
  gender,
  photoUrl,
  about,
  listRowType,
  onClickHandler,
}) => {
  return (
    <li className="list-row">
      <div>
        <img
          className="size-10 rounded-box object-cover"
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
        />
      </div>
      <div>
        <div>
          {firstName} {lastName}
        </div>

        <div className="text-xs uppercase font-semibold opacity-60">
          {age}, {gender}
        </div>
      </div>

      <p className="list-col-wrap text-xs w-[90%]">{about}</p>

      {listRowType === "connection" && (
       <Link to={`/profile/${_id}`}> <button className="btn btn-soft btn-secondary w-full">
          Open Profile
        </button>
        </Link>
      )}

      {listRowType === "request" && (
        <>
          <button
            className="btn btn-outline btn-success w-full"
            onClick={() => onClickHandler("accepted", _id)}
          >
            Accept <i className="fa-solid fa-check"></i>
          </button>
          <button
            className="btn btn-outline  btn-error w-full"
            onClick={() => onClickHandler("rejected", _id)}
          >
            Reject <i className="fa-solid fa-xmark"></i>
          </button>
        </>
      )}
    </li>
  );
};

export default RenderListRow;
