import React, { useState, useEffect, useContext } from "react";
import useGetOura from "../hooks/useGetOura";
import UserContext from "../context/user";

const DisplaySleep = () => {
  const { ouraData } = useGetOura();
  const [ouraSleepData, setOuraSleepData] = useState([]);
  const userCtx = useContext(UserContext);
  const [requestBodies, setRequestBodies] = useState([]);

  //Whenever we retrieve data from useGetOura hook (ouraData) assign its value to ouraSleepData
  useEffect(() => {
    // Check if ouraData and ouraData.data are not undefined
    if (ouraData && ouraData.data) {
      setOuraSleepData(ouraData.data);
      console.log(ouraData.data);
    }
  }, [ouraData]);

  //Whenever there are changes to ouraSleepData loop through its content to build the requestBody using the prepareDataForRequest function
  //calls addEntry so it can be stored in the database
  useEffect(() => {
    if (ouraSleepData.length > 0) {
      const newRequestBodies = [];
      ouraSleepData.forEach((data) => {
        const requestBody = prepareDataForRequest(data);
        newRequestBodies.push(requestBody);
      });
      setRequestBodies(newRequestBodies);
    }
  }, [ouraSleepData]);

  const prepareDataForRequest = (jsonData) => {
    // List of attributes to search for in the JSON data
    const attributesToSearch = [
      "average_heart_rate",
      "deep_sleep_duration",
      "light_sleep_duration",
      "rem_sleep_duration",
      "time_in_bed",
      "total_sleep_duration",
    ];

    // Loop through each JSON data object
    const requestBodies = [];
    // Iterate over each attribute to search for
    attributesToSearch.forEach((attribute) => {
      // Check if the attribute exists in the current data object
      if (jsonData.hasOwnProperty(attribute)) {
        const dataValue = jsonData[attribute];
        // const category_name = attribute.replace(/_/g, " ");
        const category_name = attribute;
        const requestBody = {
          user_id: userCtx.loggedUserId,
          source_name: "oura",
          data_type: "sleep",
          category_name,
          data_timestamp: jsonData.day,
          data_value: dataValue.toString(),
        };
        requestBodies.push(requestBody);
      }
    });

    console.log(requestBodies);
    return requestBodies;
  };

  return (
    <div>
      {requestBodies.map((requestBody, index) => (
        <div key={index}>{JSON.stringify(requestBody)}</div>
      ))}
    </div>
  );
};

export default DisplaySleep;
