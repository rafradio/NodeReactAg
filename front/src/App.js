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



const AppAg = (props) => {

  const gridRef = useRef();

  // const rowData = dataTable;

  let columsName = props.columsName;
  let tableName = props.tableName;
  let myData = props.data;


  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      filter: true,
    };
  }, []);

  const onCellClicked = (event) => console.log(event.colDef.field + " " + event.rowIndex);
  const onGridReady = useCallback(() => {
    gridRef.current.api.showLoadingOverlay();
  }, []);

  const onCellValueChanged = useCallback((event, tablename) => {
 
    let rownode = gridRef.current.api.getRowNode(event.rowIndex);
    
    console.log(
      'onCellValueChanged: ' + rownode.data.id + " " + event.colDef.field + ' ' + event.newValue + " " + tablename.tableName
    );
    updateDataAtDB(tablename.tableName, rownode.data.id, event.colDef.field, event.newValue);
  }, []);

  const updateDataAtDB = (tableName, id, column, newValue) => {
    // let str = window.location.href + "edit";
    let url = new URL(window.location.href + "edit");
    url.searchParams.set('tableName', tableName);
    url.searchParams.append('id', id);
    url.searchParams.append('column', column);
    url.searchParams.append('newValue', newValue);
    fetch(url)
      .then(response => response.text())
      .catch((error) => {
        console.log(error)
      });

  }

  const onBtStartEditing = useCallback((columsName) => {
    let rownode = gridRef.current.api.getSelectedNodes();
    let rowIndex = 0;
    // gridRef.current.api.forEachNode((node, index) => {
    //   if (node.isSelected) {rowIndex = index}
    // });
    // console.log(columsName);
    gridRef.current.api.startEditingCell({
      rowIndex: rownode[0].rowIndex,
      colKey: columsName[1].field,
    });
    console.log(rownode[0].rowIndex);
    // for (let propert in rownode[0]) {console.log(propert)};
  },[]);

  const onBtStopEditing = useCallback(() => {
  });

  

  return (
      <div className='container_grid'>
        {tableName != 'join' &&
        <div style={{ marginBottom: '5px' }}>
          <button style={{ fontSize: '12px' }} onClick={() => onBtStartEditing(columsName)}>
            Редактировать
          </button>
          <button style={{ fontSize: '12px' }} onClick={onBtStopEditing}>
            Удалить
          </button>
        </div>
        }
        <div className="ag-theme-alpine grid_style" style={{height: 400, width: 600}}>
            <AgGridReact
                onCellClicked={onCellClicked}
                onGridReady={onGridReady}
                className="ag-theme-alpine"
                ref={gridRef}
                defaultColDef={defaultColDef}
                animateRows={true}
                editType={'fullRow'}
                onCellValueChanged={(event) => onCellValueChanged(event, {tableName})}
                rowData={myData}
                columnDefs={columsName}
                rowSelection={'single'}>
            </AgGridReact>
        </div>
      </div>
  );
};

export default AppAg;
