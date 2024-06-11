import mongoose, { Schema, models } from "mongoose";


const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    blogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    }],
  },
  { timestamps: true }
);

const User = models.newUser || mongoose.model("newUser", userSchema);
export default User;