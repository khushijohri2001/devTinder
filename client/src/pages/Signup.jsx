import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../redux/constants";
import { addUser } from "../redux/userSlice";
import RenderInputField from "../components/common/RenderInputField";

const defaultCredentials = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "Update Gender",
  age: "",
};

const genderList = ["Male", "Female", "Others"];

const Signup = () => {
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

  const createNewUserHandler = async (userData) => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          ...userData,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setFormData(defaultCredentials);
      navigate("/profile", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    createNewUserHandler(formData);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-sm my-12">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Sign Up</h2>

          <form className="flex flex-col gap-6 mt-8" onSubmit={onSubmitHandler}>
            <RenderInputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              handler={onChangeHandler}
              placeholder="Your First Name"
            />

            <RenderInputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              handler={onChangeHandler}
              placeholder="Your Last Name"
            />

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

            <RenderInputField
              label="Age"
              name="age"
              value={formData.age}
              handler={onChangeHandler}
              type="number"
              placeholder="Age must be 18 or more"
            />

            <div>
              <label className="label">Gender</label>
              <select
                name="gender"
                defaultValue={formData.gender}
                onChange={onChangeHandler}
                className="select w-full"
              >
                <option disabled={true}>Update Gender</option>
                {genderList.map((option) => (
                  <option key={option} value={option}>
                    {" "}
                    {option}{" "}
                  </option>
                ))}
              </select>
            </div>

            <div className="card-actions justify-center mt-2">
              <button type="submit" className="btn btn-secondary w-full">
                Submit
              </button>
            </div>
          </form>

          <p className="text-center my-4">
            Already have an Account?{" "}
            <Link to="/login" className="link link-secondary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
