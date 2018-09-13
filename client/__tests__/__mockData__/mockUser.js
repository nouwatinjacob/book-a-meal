/* eslint max-len: ["error", { "ignoreUrls": true }] */
/* eslint max-len: ["error", { "ignoreStrings": true }] */

const loginResponse = {
  message: 'Log in successful',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjYXRlcmVyMUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImNhdGVyZXIiLCJpYXQiOjE1MzYyNjU4ODh9.2Od48KLm8cSKHuLtaOhV8I6Xyr2NMEL6HUOu-oQI6_U',
  user: {
    id: 1,
    email: 'caterer1@gmail.com',
    userType: 'caterer'
  }
};

const loginDetail = {
  email: 'caterer1@gmail.com',
  password: 'password'
};

const signupDetails = {
  businessName: "Yakoyo Restaurant",
  ownerName: "Ben Olowonla",
  businessAddress: "12, Adigbe str. Kosoko, Lagos",
  email: "caterer1@gmail.com",
  password: "password",
  confirmPassword: "password",
  userType: "caterer"
};

const signupResponse = {
  message: 'Log in successful',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjYXRlcmVyMUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImNhdGVyZXIiLCJpYXQiOjE1MzYyNjU4ODh9.2Od48KLm8cSKHuLtaOhV8I6Xyr2NMEL6HUOu-oQI6_U',
  user: {
    id: 1,
    email: 'caterer1@gmail.com',
    userType: 'caterer'
  }
};

export {
  loginResponse,
  loginDetail,
  signupDetails,
  signupResponse
};