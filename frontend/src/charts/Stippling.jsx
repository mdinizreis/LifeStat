//Algorithm Credit voronoi Stipling: https://observablehq.com/d/2b4663a35eca248f

import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";
// import { Delaunay } from "d3-delaunay";

const Stippling = () => {
  const canvasRef = useRef(null);
  const width = 600; // Define the width
  const height = 695; // Define the height
  const n = Math.round((width * height) / 40);

  const loadImage = (url) => {
    return fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      //   const imageUrl = "../assets/marcos.jpeg";
      const imageUrl = "https://i.imgur.com/eVFhxMk.jpg"; //marcos
      //   const imageUrl = "https://i.imgur.com/5ZbfBg0.jpg"; //amanda
      //   const imageUrl = "https://i.imgur.com/Lqp92n0.jpeg"; //senna
      // const imageUrl =
      //   "https://ga-core.s3.amazonaws.com/production/uploads/instructor/image/26939/webp_thumbnail_desmond.png.webp"; //desmond

      loadImage(imageUrl)
        .then((base64Image) => {
          // Image loaded successfully, can now use the Base64-encoded image
          console.log("Image loaded:", base64Image);

          const image = new Image();
          image.src = base64Image;

          image.onload = () => {
            const imageHeight = Math.floor(
              (width * image.height) / image.width
            );
            const context = canvasRef.current.getContext("2d");
            context.drawImage(
              image,
              0,
              0,
              image.width,
              image.height,
              0,
              0,
              width,
              imageHeight
            );

            const { data: rgba } = context.getImageData(
              0,
              0,
              width,
              imageHeight
            );
            const data = new Float64Array(width * imageHeight);
            for (let i = 0, len = rgba.length / 4; i < len; ++i) {
              data[i] = Math.max(0, 1 - rgba[i * 4] / 254);
            }
            data.width = width;
            data.height = imageHeight;

            getScriptURL()
              .then((scriptURL) => {
                const worker = new Worker(scriptURL);
                worker.postMessage({ data, width, height, n });
                worker.onmessage = (event) => {
                  const points = event.data;
                  const context = canvasRef.current.getContext("2d");
                  context.fillStyle = "#fff";
                  context.fillRect(0, 0, width, height);
                  context.beginPath();
                  for (let i = 0, len = points.length; i < len; i += 2) {
                    const x = points[i],
                      y = points[i + 1];
                    context.moveTo(x + 1.5, y);
                    context.arc(x, y, 1.5, 0, 2 * Math.PI);
                  }
                  context.fillStyle = "#000";
                  context.fill();
                };
              })
              .catch((error) => {
                console.error("Error getting script URL:", error);
              });
          };
        })
        .catch((error) => {
          // Error occurred while loading the image
          console.error("Error loading image:", error);
        });
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, []); // Empty dependency array to run the effect only once

  const getScriptURL = async () => {
    const scriptContent = `
      importScripts('https://d3js.org/d3.v7.min.js');
      onmessage = event => {
        const { data, width, height, n } = event.data;
        const points = new Float64Array(n * 2);
        const c = new Float64Array(n * 2);
        const s = new Float64Array(n);
      
        // Initialize the points using rejection sampling.
        for (let i = 0; i < n; ++i) {
          for (let j = 0; j < 30; ++j) {
            const x = points[i * 2] = Math.floor(Math.random() * width);
            const y = points[i * 2 + 1] = Math.floor(Math.random() * height);
            if (Math.random() < data[y * width + x]) break;
          }
        }

        const delaunay = new d3.Delaunay(points);
        const voronoi = delaunay.voronoi([0, 0, width, height]);
      
        for (let k = 0; k < 80; ++k) {
          // Compute the weighted centroid for each Voronoi cell.
          c.fill(0);
          s.fill(0);
          for (let y = 0, i = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
              const w = data[y * width + x];
              i = delaunay.find(x + 0.5, y + 0.5, i);
              s[i] += w;
              c[i * 2] += w * (x + 0.5);
              c[i * 2 + 1] += w * (y + 0.5);
            }
          }

          // Relax the diagram by moving points to the weighted centroid.
          // Wiggle the points a little bit so they don’t get stuck.
          const w = Math.pow(k + 1, -0.8) * 10;
          for (let i = 0; i < n; ++i) {
            const x0 = points[i * 2], y0 = points[i * 2 + 1];
            const x1 = s[i] ? c[i * 2] / s[i] : x0, y1 = s[i] ? c[i * 2 + 1] / s[i] : y0;
            points[i * 2] = x0 + (x1 - x0) * 1.8 + (Math.random() - 0.5) * w;
            points[i * 2 + 1] = y0 + (y1 - y0) * 1.8 + (Math.random() - 0.5) * w;
          }
      
          postMessage(points);
          voronoi.update();
        }
      
        close();
      };
    `;
    const blob = new Blob([scriptContent], { type: "text/javascript" });
    console.log(blob);
    return URL.createObjectURL(blob);
  };

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Stippling;
