import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../redux/constants";
import { Link, useNavigate } from "react-router-dom";
import RenderInputField from "../components/common/RenderInputField";

const defaultCredentials = {
  email: "",
  password: "",
};

const guestCredentials = {
  email: "taylor@swift.com",
  password: "Taylor@1234",
};

const Login = () => {
  const [formData, setFormData] = useState(defaultCredentials);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginUserHandler = async (credentials) => {
    try {
      console.log("I'm in Login page");
      
      const res = await axios.post(
        BASE_URL + "/login",
        {
          ...credentials,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      setFormData(defaultCredentials);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    loginUserHandler(formData);
  };

  const onSubmitGuestHandler = () => {
    loginUserHandler(guestCredentials);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-sm my-12">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>

          <form className="flex flex-col gap-6 mt-8" onSubmit={onSubmitHandler}>
            <RenderInputField
              label="Email"
              name="email"
              value={formData.email}
              handler={onChangeHandler}
              type="email"
              placeholder="you@example.com"
            />

            <RenderInputField
              label="Password"
              name="password"
              value={formData.password}
              handler={onChangeHandler}
              type="password"
              placeholder="Enter 6 character or more"
            />

            <div className="card-actions justify-center mt-2">
              <button type="submit" className="btn btn-secondary w-full">
                Submit
              </button>
            </div>
          </form>

          <div className="divider my-6">OR</div>

          <button
            className="btn bg-[#2F2F2F] text-white border-black"
            onClick={onSubmitGuestHandler}
          >
            Login as a Guest
          </button>

          <p className="text-center my-4">
            Create a new Account <Link to="/signup" className="link link-secondary">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
