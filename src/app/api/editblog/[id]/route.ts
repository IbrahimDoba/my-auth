import { connectDb } from "@/utils/Db";
import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";

export const PUT = async (req: any, { params }: { params: { id: string } }) => {
  const blogId = params.id;
  const { title, content } = await req.json();

  try {
    await connectDb();

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content },
      { new: true }
    );

    if (!blog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};