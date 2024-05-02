import React, { useContext } from "react";
import DisplaySleep from "../components/DisplaySleep";
import LineChart from "../charts/LineChart";
import TimeSeries from "../charts/TimeSeries";
import Histogram from "../charts/Histogram";
import Landing from "../components/Landing";
import UserContext from "../context/user";

const Main = () => {
  const userCtx = useContext(UserContext);

  return (
    <>
      {!userCtx.accessToken ? (
        <Landing></Landing>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <DisplaySleep></DisplaySleep>
          {/* <LineChart height={400} width={400} /> */}
          {/* <TimeSeries width={400} height={300} /> */}
          <Histogram width={800} height={800} />
        </div>
      )}
    </>
  );
};

export default Main;
