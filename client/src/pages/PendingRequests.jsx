import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../redux/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addPendingRequest,
  removePendingRequest,
} from "../redux/pendingRequestsSlice";
import RenderListRow from "../components/common/RenderListRow";

const PendingRequests = () => {
  const requestList = useSelector((store) => store.pendingRequests);
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(null);

  const getRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/pending", {
        withCredentials: true,
      });
      dispatch(addPendingRequest(res?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleReviewRequest = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removePendingRequest(id));
      setShowToast(status);

      setTimeout(() => {
        setShowToast(null);
      }, 3000);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  return (
    requestList && (
      <div className="py-10">
         {/* Toast Alert */}
         {showToast && (
          <div className="toast toast-top toast-center mt-6 z-50">
            <div className={`alert ${showToast === "accepted" ? "alert-success":"alert-error"} `}>
              <span>{showToast === "accepted" ? "Request Accepted Successfully!": "Request Rejected!"}</span>
            </div>
          </div>
        )}

        <h2 className="text-3xl text-center"> Pending Connection Requests</h2>

        <div className="w-1/2 mx-auto my-8">
          {requestList.length > 0 ? (
            <ul className="list bg-base-100 rounded-box shadow-md">
              <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                Accept or Reject the pending connection request
              </li>
              {requestList.map((user) => (
                <RenderListRow key={user._id} {...user} listRowType="request" onClickHandler={handleReviewRequest} />
              ))}
            </ul>
          ) : (
            <p>No connections found</p>
          )}
        </div>
      </div>
    )
  );
};

export default PendingRequests;
