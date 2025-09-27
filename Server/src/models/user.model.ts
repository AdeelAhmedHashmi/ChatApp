import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import VAR from "../config/constants";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  description: string;
  avatar: string;
  generateToken(): any;
  isPasswordCorrect(password: string): string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      trim: true,
      require: false,
    },
    avatar: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.isPasswordCorrect = async function (
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name },
    VAR.JWT_SECRET as string,
    {
      expiresIn: VAR.JWT_EXPIRES_IN as StringValue,
    }
  );
  return token;
};

userSchema.methods.verifyToken = function (userPassword: string) {
  return jwt.verify(userPassword, VAR.JWT_SECRET as StringValue);
};

const User = mongoose.model("User", userSchema);

export default User;
