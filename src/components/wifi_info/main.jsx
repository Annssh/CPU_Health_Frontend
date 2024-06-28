import React from "react";
import Wifi_quality from "./Wifi_quality";

const Wifi_main = () => {
  return (
    <>
      <div className="bg-gray-900 text-white p-10 font-bold text-[22px]">
        <h2>WIFI Performance Dashboard</h2>
        <Wifi_quality />
      </div>
    </>
  );
};

export default Wifi_main;
