import React from "react";
import UserCard from "../components/UserCard";
import EditForm from "../components/EditForm";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const { isProfilePreview, profileData } = useSelector((store) => store.profile);

  return (
    <div className="flex justify-center items-start gap-8 my-6">
      <EditForm user={user} />
      {isProfilePreview &&  <UserCard {...profileData} cardType="profile" />}
    </div>
  );
};

export default EditProfile;
