import React, { useState, createContext, useEffect  } from 'react';
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
    let columnsName = [
        { field: 'id' },
        { field: 'bookName' },
        { field: 'writer' }
    ];
    
    let dataTable = [
        {id: "VW", firstName: "Celica", lastName: 35000},
        {id: "Ford", firstName: "Mondeo", lastName: 32000},
        {id: "Porsche", firstName: "Boxster", lastName: 72000}
    ];

    const [dataT, setData] = useState(dataTable);
    const [columN, setColumn] = useState(columnsName);
    // const [request, setRequest] = useState('join')

    useEffect(() => {
        takeData('join').then(myData => {
            let dataTableNew1 = [];
            myData.forEach(element => {
                dataTableNew1.push(
                    {id: element.id, bookName: element.bookname, writer: element.writer}
                )
            });
            console.log("main module", dataTableNew1);
            // setColumn(columnNew);
            setData(dataTableNew1);
        });

    }, []);

    // takeData(request).then(myData => {
    //     let dataTableNew1 = [];
    //     myData.forEach(element => {
    //         dataTableNew1.push(
    //             {id: element.id, bookName: element.bookname, writer: element.writer}
    //         )
    //     });
    //     console.log("main module", dataTableNew1);
    //     // setColumn(columnNew);
    //     setData(dataTableNew1);
    // });
    

    const makeAction = (tableName) => {
        takeData(tableName).then(myData => {
            let dataTableNew1 = [];
            if (tableName == 'authors') {
                let columnNew = [
                    { field: 'id' },
                    { field: 'firstName' },
                    { field: 'lastName' }
                ];
                myData.forEach(element => {
                    dataTableNew1.push(
                        {id: element.id, firstName: element.first_name, lastName: element.last_name}
                    )
                });
                console.log("main module", dataTableNew1);
                setColumn(columnNew);
                setData(dataTableNew1);
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
                console.log("main module", dataTableNew1);
                setColumn(columnNew);
                setData(dataTableNew1);
            }
            
        });

        // makeAction('join');
        
    }

    // makeAction('join');

    return (
        <UserContext.Provider value={dataT}>
            <div className='container'>
                <div className='container_button'>
                    <div className='wrap_button'>
                        <Button variant="contained" className='buttons' onClick={() => makeAction('authors')}>Table 1</Button>
                        <Button variant="contained" className='buttons' onClick={() => makeAction('books')}>Table 2</Button>
                    </div>
                </div>
                <AppAg data={dataT} context={UserContext} columsName={columN}/>

            </div>
        </UserContext.Provider>
    )
}

const takeData = async (tableName) => {
    // const textData = '';
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
