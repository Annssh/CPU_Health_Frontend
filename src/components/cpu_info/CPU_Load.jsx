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

const CPU_Load = () => {
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

  const data2 = {
    labels: cpuData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "CPU Load (in %)",
        data: cpuData.map((d) => d.cpu_speed),
        fill: true,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(255,255,255, 0.6)",
        tension: 0.4,
      },
    ],
  };

  const l2 = data2.datasets[0].data.length;
  const updateData2 = data2.datasets[0].data[l2 - 1];

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
        <circle cx={cx} cy={cy} r={6} fill="black" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="black"
          strokeWidth={4}
        />
      </g>
    );
  }

  return (
    <div className="grid grid-flow-col col-span-2 gap-11 bg-gray-700">
      <Line data={data2} className="w-fit" />
      <GaugeContainer
        width={200}
        height={200}
        startAngle={-110}
        endAngle={110}
        value={updateData2}
        className=" bg-slate-200 rounded-3xl border border-black"
      >
        <GaugeReferenceArc />
        <GaugeValueArc />
        <GaugePointer />
      </GaugeContainer>
    </div>
  );
};

export default CPU_Load;
