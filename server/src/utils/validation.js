const validator = require("validator");

const validateSignupData = async (req) => {
  const { firstName, lastName, email, password, age, gender } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter correct name");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter correct email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter correct password");
  } else if (Number(age) < 18) {
    throw new Error("Age must be 18 or more");
  } else if(!["male", "female", "others"].includes(value)){
    throw new Error("Invalid Gender")
}
};

const validateLoginData = async (req) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      throw new Error("Enter correct data");
    } else if (!validator.isEmail(email)) {
      throw new Error("Enter correct creds");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Enter correct creds");
    }
  };


const validateProfileEditData = async (req) => {
  const newUserData = req.body;
  
    const ALLOWED_ACCESS = ["firstName", "lastName", "age", "gender", "about", "skills", "photoUrl"];
    const isUpdateAllowed = Object.keys(newUserData).every((key) =>
      ALLOWED_ACCESS.includes(key)
    );

    return isUpdateAllowed
  
}

module.exports = { validateSignupData, validateLoginData, validateProfileEditData };
