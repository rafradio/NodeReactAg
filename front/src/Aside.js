import React, { useState, createContext, useEffect, useRef  } from 'react';
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


const AssideMain = (props) => {
    let columnsName = [
        { field: 'id', maxWidth: 80 },
        { field: 'bookName' },
        { field: 'writer' }
    ];


    let dataTable = [];
    // let dataTable = [
    //     {id: "VW", firstName: "Celica", lastName: 35000},
    //     {id: "Ford", firstName: "Mondeo", lastName: 32000},
    //     {id: "Porsche", firstName: "Boxster", lastName: 72000}
    // ];

    const [dataT, setDataT] = useState(dataTable);
    const [columN, setColumN] = useState(columnsName);

    const [tableNameCurrent, setTableNameCurrent] = useState("new");

    useEffect(() => {
        takeData('join').then(myData => {
            let dataTableNew1 = [];
            myData.forEach(element => {
                dataTableNew1.push(
                    {id: element.id, bookName: element.bookname, writer: element.writer}
                )
            });
            console.log("main module", dataTableNew1);
            setColumN(columnsName);
            setDataT(dataTableNew1);
            setTableNameCurrent("join");
        });

    }, []);
    

    const makeAction = (tableName) => {
        
        takeData(tableName).then(myData => {
            let dataTableNew1 = [];
            if (tableName == 'authors') {
                let columnNew = [
                    { field: 'id' },
                    { field: 'first_name' },
                    { field: 'last_name' }
                ];
                myData.forEach(element => {
                    dataTableNew1.push(
                        {id: element.id, first_name: element.first_name, last_name: element.last_name}
                    )
                });
                setColumN(columnNew);
                setDataT(dataTableNew1);
                setTableNameCurrent(tableName);
            } else {
                let columnNew = [
                    { field: 'id' },
                    { field: 'bookname' },
                    { field: 'author' }
                ];
                myData.forEach(element => {
                    dataTableNew1.push(
                        {id: element.id, bookname: element.bookname, author: element.author}
                    )
                });
                setColumN(columnNew);
                setDataT(dataTableNew1);
                setTableNameCurrent(tableName);
            }
            
        });

        
    }


    return (
        <div className='container'>
            <div className='container_button'>
                <div className='wrap_button'>
                    <Button variant="contained" className='buttons' onClick={() => makeAction('authors')}>Table 1</Button>
                    <Button variant="contained" className='buttons' onClick={() => makeAction('books')}>Table 2</Button>
                </div>
            </div>
            <AppAg data={dataT} columsName={columN} tableName={tableNameCurrent} makeAction={makeAction}/>

        </div>
    )
}

const takeData = async (tableName) => {
  
    try {
        let url = window.location.href + "data/" + tableName;
        console.log("React ", url);
        const response = await fetch(url);
        const textData = await response.json();
        return textData;
        
    } catch (error) {
        console.error(error);
    }

    

}


export default AssideMain;
