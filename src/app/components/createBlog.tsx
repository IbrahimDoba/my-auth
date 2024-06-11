"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateBlogForm = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const router = useRouter();
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/createBlog', { title:title, content:content });
      console.log(response.data); // Handle success, e.g., redirect or show message
      router.push('/dashboard')

    } catch (error) {
      console.error(error); // Handle errors
    }

  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
    <div className="md:flex">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Create Blog</div>
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="shadow appearance-none border rounded w-full h-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default CreateBlogForm;