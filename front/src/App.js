import React, { useState, useEffect, createContext, useContext, useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './stylesAg.css';
import { CellClickedEvent } from "ag-grid-community";
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
  const gridRef = useRef();

  var rowData = dataTable;

  let columsName = props.columsName;

  let myData = props.data;

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      sortable: true,
      filter: true,
    };
  }, []);

  const onCellClicked = (CellClickedEvent) => console.log('Cell was clicked');
  const onGridReady = useCallback(() => {
    gridRef.current.api.showLoadingOverlay();
  }, []);
  // useEffect(() => {
  //   setData(dataTable);
  // }, []);

  return (
      <div className='container_grid'>
        <div className="ag-theme-alpine grid_style" style={{height: 400, width: 600}}>
            <AgGridReact
                onCellClicked={onCellClicked}
                onGridReady={onGridReady}
                className="ag-theme-alpine"
                ref={gridRef}
                animateRows={true}
                rowData={myData}
                columnDefs={columsName}>
            </AgGridReact>
        </div>
      </div>
  );
};

export default AppAg;
