import React, { useState, useEffect, useCallback } from "react";
import Linkweb from "@mui/material/Link";
import Papa from "papaparse";
import "./App.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const pypiURL = "https://pypi.org/project/";
const csvURL =
  "https://raw.githubusercontent.com/emanuelef/awesome-python-repo-stats/main/dep-repo-latest.csv";

const columns: GridColDef[] = [
  {
    field: "dep",
    headerName: "Module",
    width: 220,
    renderCell: (params) => (
      <Linkweb href={pypiURL + params.value} target="_blank">
        {params.value}
      </Linkweb>
    ),
  },
  {
    field: "awesome_python_repos_using_dep",
    headerName: "Repos #",
    width: 100,
    valueGetter: (val) => parseInt(val),
  },
];

function DepsChart() {
  const [dataRows, setDataRows] = useState([]);

  const loadData = async () => {
    fetch(csvURL)
      .then((response) => response.text())
      .then((text) => Papa.parse(text, { header: true, skipEmptyLines: true }))
      .then(function (result) {
        console.log(result);
        setDataRows(result.data);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      style={{
        marginLeft: "10px",
        marginTop: "10px",
        width: "400px",
      }}
    >
      <DataGrid
        getRowId={(row) => row.dep}
        rows={dataRows}
        columns={columns}
        rowHeight={30}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
          sorting: {
            sortModel: [
              { field: "awesome_python_repos_using_dep", sort: "desc" },
            ],
          },
        }}
        pageSizeOptions={[5, 10, 50]}
      />
    </div>
  );
}

export default DepsChart;
