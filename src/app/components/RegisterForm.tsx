"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../loader";

const RegisterFrom = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("This email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");

      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (err) {
      setError("Error, try again");
      console.log(err);
    }
  };

  return (
    <section className="  bg-gray-900 h-screen justify-center items-center flex">
      <div className="flex flex-col w-full items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-[50%]  bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700 max-med:w-[90%]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email@gmail.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  // onChange={(e) => setPassword(e.target.value)}
                  // value={password}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  value={confirmPass}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg f block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div> */}
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                // onClick={(e) => {e.preventDefault()}}
                className="w-full text-white  bg-blue-700 transition-all focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center border "
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium dark:text-white text-black hover:underline  "
                >
                  Login
                </a>
              </p>
              <div className="text-red-600 text-md w-full">
                {isloading && (
                  <div>
                    <Loader />
                  </div>
                )}
                <p className="p-3  text-red-600 w-full">{error && error}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterFrom;
