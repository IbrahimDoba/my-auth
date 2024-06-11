"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import BlogList from "./viewBlogs";
import Link from "next/link";
import Image from "next/image";

const UserInfo = () => {
  const { data: session,status } = useSession();
  console.log("session data", session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  
  return (
    <div className="h-auto w-full flex flex-col justify-center items-center bg-[#EEEEEE] py-10 ">
      <div className=" w-[40%] flex flex-col rounded-xl border   justify-center items-center max-med:w-[80%]">
        <Image src={session?.user?.image}/>
        <h2 className="text-3xl mb-5  max-med:text-xl ">
          Welcome!! {session?.user?.email} <p className="text-red-600"></p>{" "}
        </h2>
        <div className="flex justify-center items-center max-med:w-[100%]">
          <button
            onClick={() => signOut()}
            className="rounded-xl ml-4 bg-blue-400 p-2"
          >
            Sign Out
          </button>
          <Link href="/create" className=" p-2 bg-blue-400 m-3 rounded-xl">
            Create Blog
          </Link>
        </div>
      </div>

      <div className="flex h-auto justify-center items-center">
        <BlogList />
      </div>
    </div>
  );
};

export default UserInfo;
