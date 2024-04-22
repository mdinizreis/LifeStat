import React, { useState, useEffect } from "react";
import useGetOura from "../hooks/useGetOura";

const DisplaySleep = () => {
  const { ouraData } = useGetOura();
  const [ouraSleepData, setOuraSleepData] = useState([]);

  useEffect(() => {
    if (ouraData && ouraData.data) {
      // Check if ouraData and ouraData.data are not undefined
      setOuraSleepData(ouraData.data);
      // setOuraSleepData(JSON.stringify(ouraData.data));
    }
    // setOuraSleepData(ouraData);
  }, [ouraData]);

  return (
    <div>
      {/* {JSON.stringify(ouraSleepData)} */}

      {ouraSleepData.map((sleepData, index) => (
        <p key={index}>{sleepData}</p>
      ))}
    </div>
  );
};

export default DisplaySleep;
