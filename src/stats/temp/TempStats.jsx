import axios from "axios";
import React, { useEffect, useState } from "react";

const TempStats = () => {
  const [cpuData, setCpuData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/monitor");
      setCpuData(response.data);
    };
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 5 seconds

    return () => clearInterval(interval);
  }, []);
  const cputemp = {
    data: cpuData.map((d) => d.cpu_temp),
  };
  var backgroundColor;
  var text = "Data Not Available";

  if (cputemp.data.length > 0) {
    text = cputemp.data[cputemp.data.length - 1];
  } else {
    text = "Data Not Available";
  }
  if (
    cputemp.data[cputemp.data.length - 1] > 0 &&
    cputemp.data[cputemp.data.length - 1] < 50
  ) {
    backgroundColor = "green";
  } else if (
    cputemp.data[cputemp.data.length - 1] >= 50 &&
    cputemp.data[cputemp.data.length - 1] < 80
  ) {
    backgroundColor = "orange";
  } else {
    backgroundColor = "red";
  }
  console.log(cputemp.data[cputemp.data.length - 1]);

  return (
    <div
      style={{ backgroundColor }}
      className="p-2 mt-5 mb-3 w-[20vw] pr-5 pl-5 border rounded-xl text-center"
    >
      CPU Temp: <b>{text}</b> °C
      {/* {cputemp.data[cputemp.data.length - 1]} */}
    </div>
  );
};

export default TempStats;
