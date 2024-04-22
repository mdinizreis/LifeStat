import React from "react";
import DisplaySleep from "../components/DisplaySleep";
import LineChart from "../charts/LineChart";
import Stippling from "../charts/Stippling";
import TimeSeries from "../charts/TimeSeries";
import Histogram from "../charts/Histogram";

const Main = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/* <DisplaySleep></DisplaySleep> */}
      <LineChart height={400} width={400} />
      <TimeSeries width={400} height={300} />
      <Histogram width={400} height={400} />
      <Stippling></Stippling>
    </div>
  );
};

export default Main;
