import axios from "axios";
import React, { useEffect, useState } from "react";

const SystemHealth = () => {
  const [cpuData, setCpuData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios({
        method: "get",
        url: "/api/monitor",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your-token",
        },
        data: {
          key: "value",
        },
        withCredentials: true,
      });
      setCpuData(response.data);
    };
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 5 secon
    return () => clearInterval(interval);
  }, []);
  const cpu_usage_data = {
    labels: cpuData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    data: cpuData.map((d) => d.cpu_usage),
  };

  const cpu_speed_data = {
    labels: cpuData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    data: cpuData.map((d) => d.cpu_speed),
  };

  const cpu_avail_ram_data = {
    labels: cpuData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    data: cpuData.map((d) => d.avail_ram),
  };

  const allData =
    (cpu_usage_data.data[cpu_usage_data.data.length - 1] +
      cpu_speed_data.data[cpu_speed_data.data.length - 1] +
      cpu_avail_ram_data.data[cpu_avail_ram_data.data.length - 1]) /
    3;

  if (allData) {
    text = Math.round(allData);
  } else {
    text = "Data Not Available";
  }
  var backgroundColor;
  var text;
  if (allData > 70) {
    backgroundColor = "red";
  } else if (allData > 50 && allData <= 70) {
    backgroundColor = "orange";
  } else {
    backgroundColor = "green";
  }

  return (
    <div
      style={{ backgroundColor }}
      className="p-2 mt-5 mb-3 w-[20vw] pr-5 pl-5 border rounded-xl text-center"
    >
      System Health: <b>{text}</b> %
    </div>
  );
};

export default SystemHealth;
