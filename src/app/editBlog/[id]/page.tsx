"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

const EditBlog = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
        console.log(id)
      const fetchBlogs = async () => {
        try {
          const res = await axios.get(`/api/viewBlog/${id}`);
          console.log(res);
          setTitle(res.data.title);
          setContent(res.data.content);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchBlogs();
    }
  }, [id]);


  const handleDelete = async(e:any) => {
      e.preventDefault()
      if (!session) {
        setError("You must be logged in to delete a blog");
        return;
      }
      const res = await axios.delete(`/api/deleteBlog/${id}`)
      if(res.status === 200){
        router.push('/dashboard')
      } else {
        setError('There was an error delete your blog')
      }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!session) {
      setError("You must be logged in to edit a blog");
      return;
    }
    try {
      const res = await axios.put(`/api/editblog/${id}`, { title, content });
      if (res.status === 200) {
      } else {
        setError(res.data.message || "Failed to update Blog");
      }
      router.push("/dashboard");

    } catch (err) {
      console.log(err);
    }
    if (loading) {
      return <p>Loading...</p>;
    }
  };



  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={10}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
