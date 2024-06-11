import { connectDb } from "@/utils/Db";
import Blog from "@/models/blogModel";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/userModel";

export const GET = async (req: any, res: any) => {
  if (req.method === "GET") {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unautherized", { status: 400 });
    }
    const userEmail = session.user?.email;
    // console.log("USEREMAIL",userEmail)

    try {
      await connectDb();
      const user = await User.findOne({ email: userEmail });
      // console.log("USERHERE",user.blogs)
      const blogs = await Blog.find({ _id: user.blogs });
      // console.log(blogs)
      return NextResponse.json(blogs);
    } catch (err) {
      console.log(err);
      return new NextResponse("There was an error", { status: 500 });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
