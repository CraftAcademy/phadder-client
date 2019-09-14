import { generateAuthActions } from "redux-token-auth";

let authUrl = "http://localhost:3000/api/auth";

const config = {
  authUrl,
  userAttributes: {
    firstName: "firstName",
    lastName: "lastName",
    email: "email"
  },
  userRegistrationAttributes: {
    first_name: "firstName",
    last_name: "lastName",
    email: "email",
    password_confirmation: "password_confirmation",
    role: 'role'
  }
};

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials
} = generateAuthActions(config);

export { registerUser, signInUser, signOutUser, verifyCredentials };
