import axios from "axios";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [Hostname, setHostname] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/monitor");
      setHostname(response.data);
    };
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const hname = {
    data: Hostname.map((d) => d.hostname),
  };
  const ipaddress = {
    data: Hostname.map((d) => d.ip_address),
  };
  const cputemp = {
    data: Hostname.map((d) => d.cpu_temp),
  };
  const loginTime = {
    data: Hostname.map((d) => d.login_time),
  };
  const loginDate = {
    data: Hostname.map((d) => d.login_date),
  };
  const wifiQuality = {
    data: Hostname.map((d) => d.wifi_quality),
  };
  const lastReboot = {
    data: Hostname.map((d) => d.reboot_time),
  };
  return (
    <div className=" w-[100vw] h-[80px] grid grid-flow-col grid-cols-7 gap-5 bg-gradient-to-b from-black to-[#000038] ">
      <div className=" text-center font-extrabold flex items-center bg-black">
        <i>SYSTEM INFORMATION</i>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <h2>HOSTNAME</h2>
        <p className=" font-extrabold text-[20px]">
          {hname.data[hname.data.length - 1]}
        </p>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <h2>IP ADDRESS</h2>
        <p className=" font-extrabold text-[20px]">
          {ipaddress.data[ipaddress.data.length - 1]}
        </p>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <h2>CPU TEMP in °C</h2>
        <p className=" font-extrabold text-[20px]">
          {cputemp.data[cputemp.data.length - 1]}°C
        </p>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <h2>Last Login Time</h2>
        <p className=" font-extrabold text-[20px]">
          {loginTime.data[loginTime.data.length - 1]}{" "}
        </p>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <h2>Last Login Date</h2>
        <p className=" font-extrabold text-[20px]">
          {loginDate.data[loginDate.data.length - 1]}{" "}
        </p>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <h2>WIFI QUALITY</h2>
        <p className=" font-extrabold text-[20px]">
          {wifiQuality.data[wifiQuality.data.length - 1]}%
        </p>
      </div>
      <div className="flex flex-col justify-evenly items-center mr-5">
        <h2>Last Reboot</h2>
        <p className=" font-extrabold text-[20px]">
          {lastReboot.data[lastReboot.data.length - 1]}
        </p>
      </div>
    </div>
  );
};

export default Header;
