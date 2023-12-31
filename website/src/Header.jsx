import React from "react";
import Linkweb from "@mui/material/Link";
import GitHubButton from "react-github-btn";

const awesomePythonUrl = "https://github.com/vinta/awesome-python";

const csvURL =
  "https://raw.githubusercontent.com/emanuelef/awesome-python-repo-stats/main/analysis-latest.csv";

function Header({ lastUpdate }) {
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px",
    gap: "10px",
    height: "40px",
  };

  const githubButtonStyle = {
    marginTop: "5px", // Push GitHub button to the right
    marginRight: "30px",
  };

  return (
    <div className="header" style={headerStyle}>
      <Linkweb href={awesomePythonUrl} target="_blank">
        Awesome Python
      </Linkweb>
      <Linkweb href={csvURL} download>
        Link to CSV
      </Linkweb>
      <p>Last Update: {lastUpdate}</p>
      <div style={githubButtonStyle}>
        <GitHubButton
          href="https://github.com/emanuelef/awesome-python-repo-stats"
          data-color-scheme="no-preference: dark; light: dark_dimmed; dark: dark_high_contrast;"
          data-size="large"
          data-show-count="true"
          aria-label="Star emanuelef/awesome-python-repo-stats on GitHub"
        >
          Star
        </GitHubButton>
      </div>
    </div>
  );
}

export default Header;
