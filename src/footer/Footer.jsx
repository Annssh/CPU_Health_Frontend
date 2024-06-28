import React from "react";
import TempStats from "../stats/temp/TempStats";
import SystemHealth from "../stats/systemHealth/SystemHealth";

const Footer = () => {
  return (
    <div className="grid grid-flow-col grid-cols-3 gap-5 w-[100vw] h-[12.7vh]">
      <h2 className=" text-[22px] bg-black mr-[100px] mt-1 font-extrabold flex items-center justify-center">
        <i>HEALTH PANEL</i>
      </h2>
      {/* <div className="  bg-black"></div> */}
      <SystemHealth />
      <TempStats />
    </div>
  );
};

export default Footer;
