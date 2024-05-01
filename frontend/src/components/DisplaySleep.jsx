import React, { useState, useEffect, useContext } from "react";
import useGetOura from "../hooks/useGetOura";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const DisplaySleep = () => {
  const { ouraData } = useGetOura();
  const [ouraSleepData, setOuraSleepData] = useState([]);
  const userCtx = useContext(UserContext);
  // const [requestBodies, setRequestBodies] = useState([]);
  const fetchData = useFetch();

  //Whenever we retrieve data from useGetOura hook (ouraData) assign its value to ouraSleepData
  useEffect(() => {
    // Check if ouraData and ouraData.data are not undefined
    if (ouraData && ouraData.data) {
      setOuraSleepData(ouraData.data);
      console.log(ouraData.data);
    }
  }, [ouraData]);

  //Whenever there are changes to ouraSleepData loop through its content to build the requestBody using the prepareDataForRequest function
  useEffect(() => {
    if (ouraSleepData.length > 0) {
      ouraSleepData.forEach((data) => {
        const requestBodies = prepareDataForRequest(data);
        if (requestBodies.length > 0) {
          // Check if requestBodies is not empty
          requestBodies.forEach((requestBody) => {
            addEntry(requestBody);
          });
        }
      });
    }
  }, [ouraSleepData]);

  //parse data from oura response and prepare for insert in database
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
        const category_name = attribute;
        const requestBody = {
          user_id: userCtx.loggedUserId,
          source_name: "oura",
          entry_type: "sleep",
          category_name,
          entry_day: jsonData.day,
          entry_value: dataValue.toString(),
        };
        requestBodies.push(requestBody);
      }
    });

    return requestBodies;
  };

  //call endpoint to add parsed data (on prepareDataForRequest) to the database
  const addEntry = async (requestBody) => {
    // console.log(requestBody);
    const res = await fetchData("/addEntry", "PUT", requestBody);
    if (res.ok) {
      console.log("All data inserted successfuly");
    } else {
      console.error("Error inserting data:", res.data);
    }
  };

  return (
    <div>
      {/* {requestBodies.map((requestBody, index) => (
        <div key={index}>{JSON.stringify(requestBody)}</div>
      ))} */}
    </div>
  );
};

export default DisplaySleep;
