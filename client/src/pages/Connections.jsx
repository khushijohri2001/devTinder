import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../redux/constants";
import RenderListRow from "../components/common/RenderListRow";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/connectionsSlice";

const Connections = () => {
  const connectionList = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return connectionList && (
    <div className="py-10">
      <h2 className="text-3xl text-center"> My Connections</h2>

      <div className="w-1/2 mx-auto my-8">
        {connectionList.length > 0 ? (
          <ul className="list bg-base-100 rounded-box shadow-md">
            {connectionList.map((user) => (
              <RenderListRow key={user._id} {...user} listRowType="connection" />
            ))}
          </ul>
        ) : (
          <p>No connections found</p>
        )}
      </div>
    </div>
  );
};

export default Connections;
