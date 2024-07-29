import User from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { validateEmail, generateToken } from "../utils/authUtils.js";

export const signUp = async (req, res) => {
  const { email, username, last_name, first_name, password, confirmPassword } = req.body;
  try {
    // Validate the email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    
    // Check if the user already exists by username
    const existingUser = await User.findOne({
      where: { username: req.body.username.toLowerCase() },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Username already in use" });
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(password);
    
    // Create a new user
    const newUser = new User({
      email,
      username,
      last_name,
      first_name,
      password: hashedPassword,
    });
    
    // Save the user to the database
    await newUser.save();
    
    // Send response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists by username
    const user = await User.findOne({
      where: { username: username.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate a token for the user
    const token = generateToken(user.id);

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600000,
    });

    // Send response
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};