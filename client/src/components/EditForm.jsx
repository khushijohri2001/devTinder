import React, { useEffect, useState } from "react";
import axios from "axios";
import InputTagCard from "./InputTagCard.jsx";
import { BASE_URL } from "../redux/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "../utils/helperFunctions.jsx";
import { profilePreviewToggle, updateProfile } from "../redux/profileSlice.js";
import RenderInputField from "./common/RenderInputField.jsx";
import { addUser } from "../redux/userSlice.js";

const genderList = ["Male", "Female", "Others"];

const EditForm = ({ user }) => {
  const dispatch = useDispatch();
  const { profileData } = useSelector((store) => store.profile);
  const {
    firstName = "",
    lastName = "",
    email = "",
    age,
    gender = "",
    photoUrl = "",
    about = "",
    skills = [],
  } = profileData || {};

  const [newSkillInput, setNewSkillInput] = useState("");
  const [toggleSaveBtn, setToggleSaveBtn] = useState(false);
  const [showToast, setShowToast] = useState(null);

  // -- Handlers --
  const handlePreviewToggle = () => {
    dispatch(profilePreviewToggle());
  };

  const handleSkillChange = (e) => setNewSkillInput(e.target.value);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setToggleSaveBtn(false)
    dispatch(updateProfile({ [name]: value }));
  };

  const handleSkillAdd = (e) => {
    try {
      if (e.key === "Enter") {
        e.preventDefault();
        setToggleSaveBtn(false)
        let newSkill = capitalize(newSkillInput.trim());

        if (!newSkill || skills.includes(newSkill)) {
          throw new Error("Skill already added");
        }

        dispatch(updateProfile({ skills: [...skills, newSkill] }));
        setNewSkillInput("");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSaveProfile = async () => {
    try {
      //age not added
      const res = await axios.patch(
       BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          gender,
          photoUrl,
          about,
          skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setToggleSaveBtn(true);
      setShowToast("Profile Updated successfully!");

      setTimeout(() => {
        setShowToast(null);
      }, 3000);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(updateProfile(user));
    }
  }, [user]);

  // const suggestedSkills = ["Dance", "Sing", "Acting", "Healing", "Scientist", "Tarot Reading", "Astrology", "Travel"]

  return (
    profileData && (
      <div className="card bg-base-200 w-full min-h-[640px] max-w-sm shrink-0 shadow-2xl relative">
        {/* Toast Alert */}
        {showToast && (
          <div className="toast toast-top toast-center mt-6 z-50">
            <div className="alert alert-success">
              <span>{showToast}</span>
            </div>
          </div>
        )}

        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="text-secondary card-title text-xl">Edit Profile</h3>
            <button className="btn btn-warning" onClick={handlePreviewToggle}>
              Preview Profile
            </button>
          </div>

          <fieldset className="fieldset gap-4">
            <RenderInputField
              label="First Name"
              name="firstName"
              value={firstName}
              handler={handleInputChange}
            />
            <RenderInputField
              label="Last Name"
              name="lastName"
              value={lastName}
              handler={handleInputChange}
            />
            <RenderInputField
              label="Photo Url"
              name="photoUrl"
              value={photoUrl}
              handler={handleInputChange}
            />
            <RenderInputField
              label="Email"
              name="email"
              value={email}
              type="email"
            />

            <div>
              <label className="label">About</label>
              <textarea
                type="text"
                name="about"
                value={about}
                onChange={handleInputChange}
                className="textarea w-full"
              />
            </div>

            <div>
              <label className="label">Gender</label>
              <select
                name="gender"
                defaultValue={gender}
                onChange={handleInputChange}
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

            <div>
              <label className="label">Skills</label>
              <input
                type="text"
                name="skills"
                className="input"
                value={newSkillInput}
                onChange={handleSkillChange}
                onKeyDown={handleSkillAdd}
              />
              {skills.length > 0 ? (
                <InputTagCard data={skills} />
              ) : (
                <p className="py-2">No Skills</p>
              )}
            </div>

            <button
              onClick={handleSaveProfile}
              className="btn btn-neutral mt-4 hover:bg-gray-800"
            >
              {toggleSaveBtn ? "Saved" : "Update"}
            </button>
          </fieldset>
        </div>
      </div>
    )
  );
};

export default EditForm;
