import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div  className="bg-slate-400">
      <ul className="flex justify-around  items-center p-10">
        <div className="flex flex-1">
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex flex-1 justify-around ">
          <div>
            <Link href="/dashboard">
              <li>Dashboard</li>
            </Link>
          </div>
          <div>
            <Link href="/login">
              <li>login</li>
            </Link>
          </div>
          <div>
            <Link href="/signup">
              <li>signup</li>
            </Link>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
