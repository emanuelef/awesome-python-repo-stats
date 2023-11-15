import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import TextField from "@mui/material/TextField";

const logBase = (n, base) => Math.log(n) / Math.log(base);

const mapCategoryToColor = (category) => {
  const colorMappings = {
    Sandbox: "rgb(93, 164, 214)",
    Archived: "rgb(255, 144, 14)",
    Incubating: "rgb(44, 160, 101)",
    Graduated: "rgb(244, 60, 101)",
  };

  // Return the color for the given category, or a default color if not found
  return colorMappings[category] || "rgb(0, 0, 0)"; // Default to black if not found
};

const BubbleChart = ({ dataRows }) => {
  const [minDaysLastCommit, setMinDaysLastCommit] = useState("30");
  const [minStars, setMinStars] = useState("10");
  const [minMentionableUsers, setMinMentionableUsers] = useState("10");
  const [data, setData] = useState([]);

  const handleInputChange = (event, setStateFunction) => {
    const inputText = event.target.value;

    // Use a regular expression to check if the input contains only digits
    if (/^\d*$/.test(inputText)) {
      setStateFunction(inputText);
    }
  };

  const handleBubbleClick = (event) => {
    // Extract information about the clicked point from the event
    console.log(event);
    const pointIndex = event.points[0].pointIndex;
    const clickedRepo = event.points[0].data.text[pointIndex];

    // Replace this with the URL or action you want to perform
    const url = `https://github.com/${clickedRepo}`;
    window.open(url, "_blank");
  };

  const loadData = () => {
    let updatedData = [];

    dataRows.forEach((element) => {
      if (
        parseInt(element["days-last-commit"]) > parseInt(minDaysLastCommit) &&
        parseInt(element["stars"]) > parseInt(minStars) &&
        parseInt(element["mentionable-users"]) > parseInt(minMentionableUsers)
      ) {
        updatedData.push(element);
      }
    });
    console.log(updatedData);

    const trace = {
      x: updatedData.map((row) => row["new-stars-last-7d"]),
      y: updatedData.map((row) => row["mentionable-users"]),
      text: updatedData.map((row) => row.repo),
      mode: "markers",
      marker: {
        size: updatedData.map((row) => Math.log(row["stars"])),
        sizemode: "diameter",
        sizeref: 0.22,
        color: "orange",
      },
      type: "scatter",
      //name: "ciao",
    };

    setData([trace]);
  };

  useEffect(() => {
    loadData();
  }, [minDaysLastCommit, minStars, minMentionableUsers]);

  const layout = {
    xaxis: {
      type: "log",
      title: "New Stars Last 14 Days",
      gridcolor: "rgba(150, 150, 150, 0.6)",
    },
    yaxis: {
      type: "log",
      title: "Mentionable Users",
      gridcolor: "rgba(150, 150, 150, 0.6)",
    },
    size: "stars",
    color: "main-category",
    hovermode: "closest",
    hover_name: "repo",
    showlegend: true,
    paper_bgcolor: "rgb(0, 0, 0, 0.7)", // Transparent background
    plot_bgcolor: "rgba(38, 42, 51, 0.8)", // Dark background
    font: { color: "white" }, // White text
  };

  return (
    <div
      style={{
        marginLeft: "10px",
        marginTop: "10px",
        marginRight: "10px",
        height: "90%",
      }}
    >
      <TextField
        style={{ marginTop: "20px", marginRight: "20px", marginLeft: "20px" }}
        label="Min days since last commit"
        variant="outlined"
        size="small"
        value={minDaysLastCommit}
        onChange={(e) => handleInputChange(e, setMinDaysLastCommit)}
        InputProps={{
          inputProps: {
            pattern: "[0-9]*",
            inputMode: "numeric",
          },
        }}
      />
      <TextField
        style={{ marginTop: "20px", marginRight: "20px" }}
        label="Min stars"
        variant="outlined"
        size="small"
        value={minStars}
        onChange={(e) => handleInputChange(e, setMinStars)}
        InputProps={{
          inputProps: {
            pattern: "[0-9]*",
            inputMode: "numeric",
          },
        }}
      />
      <TextField
        style={{ marginTop: "20px" }}
        label="Min men. users"
        variant="outlined"
        size="small"
        value={minMentionableUsers}
        onChange={(e) => handleInputChange(e, setMinMentionableUsers)}
        InputProps={{
          inputProps: {
            pattern: "[0-9]*",
            inputMode: "numeric",
          },
        }}
      />
      <Plot
        data={data}
        layout={layout}
        style={{ width: "100%", height: "90%" }}
        onClick={(event) => handleBubbleClick(event)}
      />
    </div>
  );
};

export default BubbleChart;