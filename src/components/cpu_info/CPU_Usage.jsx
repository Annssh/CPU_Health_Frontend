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

const CPU_Usage = () => {
  const [cpuData, setCpuData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/monitor");
      setCpuData(response.data);
    };
    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const data1 = {
    labels: cpuData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Total CPU Usage (%)",
        data: cpuData.map((d) => d.cpu_usage),
        fill: true,
        backgroundColor: "rgb(226, 143, 17)",
        borderColor: "rgba(255,255,255, 0.6)",
        tension: 0.4,
      },
    ],
  };

  const l1 = data1.datasets[0].data.length;
  const updateData1 = data1.datasets[0].data[l1 - 1];

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
    <div className="flex bg-gray-700">
      <Line data={data1} />
      <GaugeContainer
        width={200}
        height={200}
        startAngle={-110}
        endAngle={110}
        value={updateData1}
        className=" bg-slate-200 rounded-3xl border border-black m-12"
      >
        <GaugeReferenceArc />
        <GaugeValueArc />
        <GaugePointer />
      </GaugeContainer>
    </div>
  );
};

export default CPU_Usage;
