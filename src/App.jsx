import Header from "./header/Header";
import AllData from "./allData/AllData";
import CacheData from "./cacheData/CacheData";
import Footer from "./footer/Footer";
// import { Box } from "@mui/material";
// import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

const App = () => {
  return (
    <div className="text-white pointer-events-auto">
      <Header />
      <h2 className="text-[30px] font-semibold pt-5 pb-2 bg-gray-700 w-[100vw] text-center">
        CPU Performance Dashboard
      </h2>
      <div className=" bg-gray-700 h-[63vh] w-[100vw] flex justify-center items-center">
        <div className="bg-white">
          <AllData />
        </div>
        <div className=" bg-white">
          <CacheData />
        </div>
      </div>
      <div className=" bg-gradient-to-b from-black to-[#000038]">
        <Footer />
      </div>
      {/* <div>
        <Box sx={{ flexGrow: 1 }}>
          <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6, 7]} width={100} height={100} />
        </Box>
      </div> */}
    </div>
  );
};

export default App;
