import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { HttpError } from "../helpers/HttpError.js";




dotenv.config();

const signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, `Email already exist`);
    }
    if (!email || !password || !username) {
      throw HttpError(400, 'Email, password and username are required');
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    const payload = { id: newUser._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await User.findByIdAndUpdate(newUser._id, { token, refreshToken });

  
    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
      token,
      refreshToken 
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const { _id: id } = user;

    const payload = {
      id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    await User.findByIdAndUpdate(id, { token, refreshToken });
    res.json({
      status: "success",
      code: 200,
      token,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getCurrent = (req, res) => {
  const { username, email } = req.user;
  if (!username || !email) {
    return next(HttpError(500, "Failed to get current user"));
  }
  res.json({ username, email });
};

const signout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findOneAndDelete(_id, { token: "", refreshToken: "" });

    res.json({ message: "Signout success" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findOne({ refreshToken });
    if (!user) {
      throw HttpError(403);
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const newRefreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    await User.findByIdAndUpdate(
      id,
      { token, refreshToken: newRefreshToken },
      { new: true }
    );

    res.json({
      token,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default {
  signup,
  signin,
  getCurrent,
  signout,
  refresh,
};
