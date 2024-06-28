import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

fetch("http://localhost:3000/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your-token",
  },
  body: JSON.stringify({ key: "value" }),
});

export default function AllData() {
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

  return (
    <LineChart
      series={[
        {
          curve: "natural",
          data: cpu_avail_ram_data.data,
          label: "CPU AVAILABLE RAM %",
        },
        { curve: "natural", data: cpu_speed_data.data, label: "CPU Speed %" },
        { curve: "natural", data: cpu_usage_data.data, label: "CPU Usage %" },
      ]}
      width={640}
      height={400}
      colors={["#00d4ff", "#f20f8a", "#edf20f"]}
      margin={{ left: 30 }}
      grid={{ horizontal: true }}
    />
  );
}
