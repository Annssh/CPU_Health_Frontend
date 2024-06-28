import React, { useEffect, useState } from "react";
import axios from "axios";

const Login_date = () => {
  const [loginData, setLoginData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/monitor");
      setLoginData(response.data);
    };
    fetchData();
  }, []);
  const data2 = {
    labels: loginData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "CPU Load (in %)",
        data: loginData.map((d) => d.login_date),
        fill: true,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(255,255,255, 0.6)",
        tension: 0.4,
      },
    ],
  };

  const l2 = data2.datasets[0].data.length;
  const updateData2 = data2.datasets[0].data[l2 - 1];

  return <div>{updateData2}</div>;
};

export default Login_date;
