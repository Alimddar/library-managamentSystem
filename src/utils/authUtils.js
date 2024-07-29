import jwt from "jsonwebtoken";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });
  return token;
};
