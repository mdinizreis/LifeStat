import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const useGetOura = () => {
  // const navigate = useNavigate(); //useNavigate hook to handle navigation programmatically.
  // const [ingredientsQuery, setIngredientsQuery] = useState(
  //   props.ingredientsString
  // );

  const [ouraData, setOuraData] = useState();

  async function fetchData() {
    try {
      const url = new URL(import.meta.env.VITE_OURA_API_SLEEP_URL);
      url.searchParams.append("start_date", "2023-11-01");
      url.searchParams.append("end_date", "2023-12-01");
      // console.log(url);

      // Use a CORS proxy URL to bypass CORS restrictions
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const apiUrl = proxyUrl + url; // Append the API URL to the proxy URL

      console.log(apiUrl);

      const ouraDataRes = await fetch(apiUrl, {
        method: "GET",
        headers: {
          // "x-api-key": import.meta.env.VITE_OURA_API_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_OURA_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (ouraDataRes.ok) {
        console.log("Succesfully loaded oura data!");
        const data = await ouraDataRes.json();
        setOuraData(data);
        console.log(data);
      } else {
        console.log("Failed to load oura data!");
        alert("Failed to load oura data!");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return { ouraData };
};

export default useGetOura;
