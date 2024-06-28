import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
import { data } from "autoprefixer";
import { ChartsText } from "@mui/x-charts";

const Avail_RAM = () => {
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

  const data3 = {
    labels: cpuData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Available RAM (in GB)",
        data: cpuData.map((d) => d.avail_ram),
        fill: true,
        backgroundColor: "rgb(17, 162, 226)",
        borderColor: "rgba(255,255,255, 0.6)",
        tension: 0.4,
      },
    ],
  };
  const data4 = {
    labels: cpuData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Available RAM (in GB)",
        data: cpuData.map((d) => d.total_ram),
      },
    ],
  };

  const l3 = data3.datasets[0].data.length;
  const updateData3 =
    (data3.datasets[0].data[l3 - 1] * 100) / data4.datasets[0].data[0];

  function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();
    if (valueAngle === null) {
      return null;
    }
    const target = {
      x: cx + outerRadius * Math.sin(valueAngle),
      y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
      <g>
        <circle cx={cx} cy={cy} r={3} fill="black" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="black"
          strokeWidth={4}
        />
      </g>
    );
  }

  return (
    <div className="bg-gray-900 p-8">
      <GaugeContainer
        width={200}
        height={200}
        startAngle={-110}
        endAngle={110}
        value={updateData3}
        className=" bg-slate-200 rounded-3xl border border-black m-12"
      >
        <GaugeReferenceArc />
        <GaugeValueArc />
        <GaugePointer />
      </GaugeContainer>
    </div>
  );
};

export default Avail_RAM;
