import React from "react";
import Login_date from "./Login_date";
import Login_time from "./Login_time";

const Login_main = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-gray-950 text-white">
        <div className="font-bold text-[22px]"> User's Last Login Data and Time</div>
        <div className="flex ">
          <div className="p-5 pl-20 font-bold flex">
            <span className="pr-2">DATE (yyyy : mm : dd):</span>
            <Login_date />
          </div>
          <div className="p-5 pl-20 font-bold flex">
            <span className="pr-2">TIME (hh : mm : ss):</span>
            <Login_time />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login_main;
