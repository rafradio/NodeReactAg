import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './stylesAg.css';
import { Button } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React themes
// import theme from "assets/theme";

const AppAg = () => {
  const [rowData, setData] = useState([
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxster", price: 72000}
  ]);
  
  const [columnDefs, setColumns] = useState([
      { field: 'make' },
      { field: 'model' },
      { field: 'price' }
  ]);

  return (
        <div className='container'>
          <div className='container_button'></div>
          <div className='container_grid'>
            <Button variant="contained">Contained</Button>
            <div className="ag-theme-alpine grid_style" style={{height: 400, width: 600}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}>
                </AgGridReact>
            </div>
            <Button variant="contained">Contained</Button>
          </div>
        </div>
  );
};

export default AppAg;
