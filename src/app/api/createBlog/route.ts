import { connectDb } from "@/utils/Db";
import User from "@/models/userModel";
import Blog from "@/models/blogModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  if (req.method === "POST") {
    const session = await getServerSession(); // Make sure to pass req to getServerSession
    console.log("Session:", session);
    if (!session) { 
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); // Use NextResponse
    }

    const { title, content } = await req.json(); // Use req.json() to parse the body
    const userEmail = session.user?.email;

    try {
      await connectDb();

      // Find the user by email to get the user's ObjectId
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      const newBlog = new Blog({
        title,
        content,
        author: user._id, // Use the user's ObjectId
      });

      const saveBlog = await newBlog.save();
      await User.findByIdAndUpdate(user._id, { $push: { blogs: saveBlog._id } });
      console.log("save", saveBlog);
      return NextResponse.json(saveBlog, { status: 201 }); // Use NextResponse
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 }); // Use NextResponse
    }
  } else {
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405, headers: { Allow: "POST" } });
  }
};
