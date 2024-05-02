import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { timeFormat } from "d3"; // Import time format function from d3

const Histogram = (props) => {
  const { width, height } = props;
  const svgRef = useRef();
  const fetchData = useFetch(); // Use the useFetch hook
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch data from the backend
    fetchData("/getTotalSleepDuration", "GET").then((response) => {
      if (response.ok) {
        setData(response.data.data); // Set the retrieved data
        setLoading(false); // Set loading to false when data is fetched
        drawChart();
      } else {
        console.error("Error fetching data:", response.data);
        setLoading(false); // Set loading to false in case of error
      }
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Customize time format for x-axis labels
    const dateFormatter = timeFormat("%a %b %d");

    // declare margins
    const margin = { top: 70, right: 50, bottom: 70, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // create the svg that holds the chart
    console.log(svgRef.current);
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .style("background-color", "white")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // create X axis scale
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => new Date(d.entry_day)))
      .range([0, innerWidth])
      .padding(0.1);

    // create the y axis scale
    const yScale = d3
      .scaleLinear()
      // .domain([0, d3.max(data, (d) => d.total_sleep_duration)])
      .domain([0, 28000])
      .range([innerHeight, 0]);

    // set the x axis on the bottom.
    // tilts the axis text so it's readable and not smushed.
    svg
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      // .call(d3.axisBottom(xScale))
      .call(d3.axisBottom(xScale).tickFormat(dateFormatter))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // set the y axis on the left
    svg.append("g").call(d3.axisLeft(yScale));

    // Add a horizontal red dotted line at y-axis value of 25200 (7h of Sleep)
    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", yScale(25200))
      .attr("x2", innerWidth)
      .attr("y2", yScale(25200))
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4"); // Make the line dotted

    // create the actual bars on the graph, appends a 'rect' for every data element
    // sets the x and y positions relative to the scales already established
    // sets the height according to the yscale
    // static bar width, color is scaled on the y axis
    // finally the bars have an outline
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(new Date(d.entry_day)))
      .attr("y", (d) => yScale(d.total_sleep_duration))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.total_sleep_duration))
      .attr("fill", "blue")
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    // Display value within each bar
    svg
      .selectAll(".bar-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d) => xScale(new Date(d.entry_day)) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.total_sleep_duration) - 5) // Adjust position
      .attr("text-anchor", "middle")
      .text((d) => d.total_sleep_duration);
  };

  return (
    <div>
      <h4> Histogram - Total Sleep Duration </h4>
      {loading ? <p>Loading...</p> : <div id="histogram" ref={svgRef} />}
    </div>
  );
};

export default Histogram;
