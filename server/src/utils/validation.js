const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password, age, gender } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter correct name");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter correct email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  } else if (Number(age) < 18) {
    throw new Error("Age must be 18 or more");
  } else if (!["male", "female", "others"].includes(value)) {
    throw new Error("Invalid Gender");
  } else {
    true;
  }
};

const validateLoginData = (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Enter correct data");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter correct creds");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter correct creds");
  } else {
    return true;
  }
};

const validatePasswordResetData = (req) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    throw new Error("Enter correct data");
  } else if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Enter strong password");
  } else if (oldPassword === newPassword) {
    throw new Error("Enter a different password");
  } else {
    return true;
  }
};

const validateProfileEditData = (req) => {
  const newUserData = req.body;

  const ALLOWED_ACCESS = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "skills",
    "photoUrl",
  ];
  const isUpdateAllowed = Object.keys(newUserData).every((key) =>
    ALLOWED_ACCESS.includes(key)
  );

  return isUpdateAllowed;
};

module.exports = {
  validateSignupData,
  validateLoginData,
  validatePasswordResetData,
  validateProfileEditData,
};
