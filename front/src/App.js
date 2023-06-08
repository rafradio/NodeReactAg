import React, { useState, useEffect, createContext, useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './stylesAg.css';
import { Button } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AssideMain from "./Aside.js"

// Material Dashboard 2 React themes
// import theme from "assets/theme";
// const UserContext = createContext();

const AppAg = (props) => {
  const dataTable = useContext(props.context);
  // const [rowData, setData] = useState([]);
  var rowData = dataTable;

  let columsName = props.columsName;
  // const [columnDefs, setColumns] = useState([
  //     { field: 'id' },
  //     { field: 'firstName' },
  //     { field: 'lastName' }
  // ]);

  // const [columnDefs, setColumns] = useState([]);

  let myData = props.data;

  // useEffect(() => {
  //   setData(dataTable);
  // }, []);

  return (
      <div className='container_grid'>
        <Button variant="contained">Contained</Button>
        <div className="ag-theme-alpine grid_style" style={{height: 400, width: 600}}>
            <AgGridReact
                rowData={myData}
                columnDefs={columsName}>
            </AgGridReact>
        </div>
        <Button variant="contained">Contained</Button>
      </div>
);
};

export default AppAg;
