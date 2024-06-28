import React from "react";
import CPU_Load from "./CPU_Load";
import CPU_Usage from "./CPU_Usage";
// import CPU_Temp from "./CPU_Temp";

const CPU_Main = () => {
  return (
    <div className="grid grid-flow-row row-span-2 max-w-fit p-8">
      <CPU_Load />
      <CPU_Usage />
      {/* <CPU_Temp /> */}
    </div>
  );
};

export default CPU_Main;
