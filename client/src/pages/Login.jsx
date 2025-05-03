import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../redux/constants";

const defaultCredentials = {
  email: "",
  password: "",
}

const guestCredentials = {
  email: "taylor@swift.com",
  password: "Taylor@1234",
}

const Login = () => {
  const [formData, setFormData] = useState(defaultCredentials);
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginUserHandler = async (credentials) => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          ...credentials
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      setFormData(defaultCredentials);
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      loginUserHandler(formData)
  };

  const onSubmitGuestHandler = () => {
    loginUserHandler(guestCredentials)
  };

  return (
    <div className="flex items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-sm my-12">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>

          <form className="flex flex-col gap-6 mt-8" onSubmit={onSubmitHandler}>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Enter 6 character or more"
                name="password"
                value={formData.password}
                onChange={onChangeHandler}
              />
            </div>

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
            Create a new Account <a className="link link-secondary">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
