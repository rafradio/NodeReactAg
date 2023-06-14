import React, { useState, useEffect, createContext, useContext, useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './stylesAg.css';
import { CellClickedEvent } from "ag-grid-community";
import Box from '@mui/material/Box';



const AppAg = (props) => {

  const gridRef = useRef();

  // const rowData = dataTable;

  let columsName = props.columsName;
  let tableName = props.tableName;
  let myData = props.data;
  const makeAction = props.makeAction;
  


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

  const onCellValueChanged = useCallback((event, tablename, makeAction) => {
 
    let rownode = gridRef.current.api.getRowNode(event.rowIndex);
    // for (let proper in event) {console.log(proper)};
    // console.log(
    //   'onCellValueChanged: ' + rownode.data.id + " " + event.colDef.field + ' ' + event.newValue + " " + tablename.tableName
    // );
    console.log(event.rowPinned);
    if (event.rowPinned != "top") {
      updateDataAtDB(tablename.tableName, rownode.data.id, event.colDef.field, event.newValue);
      makeAction(tablename.tableName);
    } else {
      let url = new URL(window.location.href + "new");
      let data = event.data;
      // if (event.data.id == '') {data.id = 1;}
      data.tableName = tablename.tableName;
      console.log("hello pinned row", JSON.stringify(data));
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (response.ok) {
            let rows = [];
            gridRef.current.api.setPinnedTopRowData(rows);
            makeAction(tablename.tableName);
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
    
  }, []);

  const updateDataAtDB = (tableName, id, column, newValue) => {
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
 
    gridRef.current.api.startEditingCell({
      rowIndex: rownode[0].rowIndex,
      colKey: columsName[1].field,
    });


  },[]);

  const onBtDeleting = useCallback((tableName, makeAction) => {
    let rownode = gridRef.current.api.getSelectedRows();
    if (rownode.length > 0) {
      let url = new URL(window.location.href + "delete");
      url.searchParams.set('tableName', tableName.tableName);
      url.searchParams.append('id', rownode[0].id);
      fetch(url)
        .then(response => {
          if (response.ok) {
            makeAction(tableName.tableName);
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
  });

  const onPinnedRow = useCallback((columsName) => {

    let data = {};
    columsName.forEach(element => {
      data[element.field] = "";
    });
    let rows = new Array(data);

    gridRef.current.api.setPinnedTopRowData(rows);
  });

  

  return (
      <Box component="div" className='container_grid'>
        {tableName != 'join' &&
          <Box component="div" style={{ marginBottom: '5px' }}>
            <button style={{ fontSize: '12px' }} onClick={() => onBtStartEditing(columsName)}>
              Редактировать
            </button>
            <button style={{ fontSize: '12px' }} onClick={() => onBtDeleting({tableName}, makeAction)}>
              Удалить
            </button>
            <button style={{ fontSize: '12px' }} onClick={() => onPinnedRow(columsName)}>
              Добавить запись
            </button>
          </Box>
        }
        <Box component="div" className="ag-theme-alpine grid_style" style={{height: 400, width: 600}}>
            <AgGridReact
                onCellClicked={onCellClicked}
                onGridReady={onGridReady}
                className="ag-theme-alpine"
                ref={gridRef}
                defaultColDef={defaultColDef}
                animateRows={true}
                editType={'fullRow'}
                onCellValueChanged={(event) => onCellValueChanged(event, {tableName}, makeAction)}
                rowData={myData}
                columnDefs={columsName}
                // rowModelType={'infinite'}
                rowSelection={'single'}>
            </AgGridReact>
        </Box>
      </Box>
  );
};

export default AppAg;
