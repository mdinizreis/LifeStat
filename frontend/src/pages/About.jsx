import React from "react";
import Stippling from "../charts/Stippling";

const About = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Stippling></Stippling>
      <div style={{ marginLeft: "20px" }}>
        <strong> Hey there! I'm Marcos </strong> - part-time GIF guru, full-time
        meme maestro, proud purveyor of dad jokes, and future software
        engineering wiz (fingers crossed for that graduation cap!). Remember, as
        you navigate through this app, always keep in mind: "It's not a bug,
        it's a feature!" 🚀
        <br />
        <br />
        <br />
        This cool pixels drawing of me was an adaptation of{" "}
        <a href="https://observablehq.com/@mbostock/voronoi-stippling">
          Weighted Voronoi Stippling by Adrian Secord{" "}
        </a>{" "}
        Algorithm.
      </div>
    </div>
  );
};

export default About;
