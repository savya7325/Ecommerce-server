// import User from "../Models/User.js";
import User from "../models/User.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;



export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Original password:", password);
console.log("Hashed password:", hashedPassword);

    const user = new User({ username, email, password: hashedPassword ,
       role: req.body.role || 'user'
     }); 
    await user.save();
    
   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ message: "User registered successfully",token,
       user: { id: user._id, username: user.username, email: user.email,role: user.role }
     });

  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Received email:", email);
    console.log("Received password:", password);

    const user = await User.findOne({ email });
    console.log("User from DB:", user);

    if (!user) return res.status(401).json({ error: "User not found" });

    console.log("Received password:", password);
console.log("Stored (hashed) password:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
   console.log("Password match:", isMatch); 
   
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user._id , role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful",token,
       user: { id: user._id, username: user.username, email: user.email,role: user.role}
     });
  } catch (err) {
    res.status(500).json({ error: "Login error", details: err.message });
  }
};
