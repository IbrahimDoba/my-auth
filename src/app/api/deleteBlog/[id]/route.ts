import { NextResponse } from "next/server";
import User from "@/models/userModel";
import Blog from "@/models/blogModel";
import { getServerSession } from "next-auth";
import { connectDb } from "@/utils/Db";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const blogId = params.id;
  try {
    await connectDb();

    const deleteBlog = await Blog.findByIdAndDelete(blogId);

    if (!deleteBlog) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json("there was an error");
  }
};
