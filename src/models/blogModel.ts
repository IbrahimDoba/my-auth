import mongoose, { Schema, models } from "mongoose";


const userSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
     
  },
  { timestamps: true }
);

const Blog = models.userBlog || mongoose.model("userBlog", userSchema);
export default Blog;