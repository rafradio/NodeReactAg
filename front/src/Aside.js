import React, { useState, createContext  } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './stylesAg.css';
import { Button } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppAg from './App';

const UserContext = createContext();

const AssideMain = (props) => {
    let dataTable = [
        {make: "VW", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxster", price: 72000}
    ];
    const [dataT, setData] = useState(dataTable);

    const makeAction = () => {
        let dataTableNew = [
            {make: "Lada", model: "Celica", price: 35000},
            {make: "Cherry", model: "Mondeo", price: 32000},
            {make: "Porsche", model: "Boxster", price: 72000}
        ];
        setData(dataTableNew);
        console.log("Hello world");
        console.log(dataT);
    }

    return (
        <UserContext.Provider value={dataT}>
            <div className='container'>
                <div className='container_button'>
                    <div className='wrap_button'>
                        <Button variant="contained" className='buttons' onClick={makeAction}>Table 1</Button>
                        <Button variant="contained" className='buttons'>Table 2</Button>
                    </div>
                </div>
                <AppAg data = {dataT} context={UserContext}/>

            </div>
        </UserContext.Provider>
    )
}


export default AssideMain;
