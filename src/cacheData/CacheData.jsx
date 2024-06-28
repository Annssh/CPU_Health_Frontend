import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function CacheData() {
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

  const cache_mem_data = {
    labels: cpuData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    data: cpuData.map((d) => d.cache_mem),
  };

  return (
    <LineChart
      series={[
        {
          curve: "natural",
          data: cache_mem_data.data,
          label: "Cache Usage in MB",
        },
      ]}
      width={640}
      height={400}
      margin={{ left: 30 }}
      grid={{ horizontal: true }}
    />
  );
}
