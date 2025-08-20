import mongoose from 'mongoose';
import bcrypt from "bcrypt"; 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type:String, unique:true ,required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user'}
});


const User = mongoose.model('User', userSchema);
export default User;
