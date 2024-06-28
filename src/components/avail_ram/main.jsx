import React from "react";
import Avail_RAM from "./Avail_RAM";
import Wifi_quality from "../wifi_info/Wifi_quality";

const RAM_main = () => {
  return (
    <div className="bg-gray-900 text-white p-10 font-bold text-[22px]">
      <h2>RAM Performance Dashboard</h2>
      <p>(ram used in GB / 16GB)</p>
      <Avail_RAM />
    </div>
  );
};

export default RAM_main;
