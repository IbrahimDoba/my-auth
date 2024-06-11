"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Blog from "@/models/blogModel";
export interface blogProps {
  _id: any;
  title: string;
  content: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<blogProps[]>([]);
  const [error, setError] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // console.log("test");
        const response = await axios.get("/api/viewBlog");
        // console.log(response);
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/deleteBlog/${id}`);
      if (res.status === 200) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-bold text-lg">{blog.title}</h3>
            <p className="mt-2">{blog.content.substring(0, 100)}...</p>
            {/* Add more details or actions like edit/delete */}

            <div className="flex mt-3 justify-between items-center">
              <Link
                className="bg-blue-400 p-2 rounded-lg mr-3"
                href={`/editBlog/${blog._id}`}
              >
                Edit{" "}
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-400 p-2 rounded-lg "
              >
                Delete{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
