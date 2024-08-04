import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
import { createHmac, randomBytes } from "crypto";
import { setTokenForUser, validateToken } from "../service/authJwt.js";

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
});

//Password Hashing, before saving
employeeSchema.pre("save", function (next) {
  const user = this; // Current User
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString(); //Random String

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;

  next();
});

//Password Checking and generating JWT Token
employeeSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== userProvidedHash)
      throw new Error("Incorrect Password");

    const token = setTokenForUser(user); //called from service-authJwt
    return token;
  }
);



employeeSchema.plugin(mongooseSequence(mongoose), { inc_field: "employeeId" });

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;