"use client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { useUser } from "../hooks/userContext";
import { useRouter } from "next/navigation";
import Loader from "../loader";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const LoginForm = () => {
  // const { login } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isloading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  // const session = useSession();

  // useEffect(() => {
  //   if(session?.status === "authenticated") {
  //     router.replace('/dashboard')
  //   }
  // }, [session, router])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const isValidEmail = (email: string) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
      setError("This email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log(res)
    if (res?.url) router.push("/dashboard");
    if (res?.error) {
      setError("invalid Email or Password");
    } else {
      setError("");
    }
  };

  return (
    <section className="bg-gray-900 h-screen justify-center items-center flex">
      <div className="flex flex-col w-full items-center justify-center px-6 py-8 mx-auto">
        <div className="w-[50%]  bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700 max-med:w-[90%]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
                {/* <a
                  href="/forgot-password"
                  className="text-sm font-medium text-white hover:underline "
                >
                  Forgot password?
                </a> */}
              </div>
              <button
                type="submit"
                // onClick={(e) => {e.preventDefault()}}

                className="w-full text-white   bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <button
            
                onClick={() => signIn("google")}

                className="w-full text-white   bg-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
               Google sign in
              </button>
              <p className="text-sm font-light text-gray-500 text-primary-600 dark:text-primary-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="font-medium hover:underline text-black dark:text-white "
                >
                  Sign up
                </Link>
              </p>
              <div className="text-red-600 bg-white text-md w-full">
                {error && <p>{error}</p>}
                {isloading && (
                  <div>
                    <Loader />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

