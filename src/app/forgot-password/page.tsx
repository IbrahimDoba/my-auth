"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter()

    const [email, setEmail] = useState<string>("");

    const handleForgotPassword = async (e:any) => {
      e.preventDefault()
      const res = await axios.post("http://localhost:5001/user/forgot-password", {
        email: email
      }, );
      if(res.status === 200){
        router.push('/login')
      }    }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
      
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
             Enter your email to reset password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleForgotPassword}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email@gmail.com"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 border  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Send
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
