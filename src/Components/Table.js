import * as React from 'react';
import { useState,useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fetchUrl } from '../Config';

const applicationDetailsurl = '/applicationDetails';

const columns = [
  { id: 'Product_Code', label: 'Product Code', },
  { id: 'Application_Category', label: 'Application Category', },
  { id: 'Auto_Application_no', label: 'Application No.', },
  { id: 'No_of_Customer', label: 'No. of Customers', },
  { id: 'Application_Status', label: 'Application Status', },
  { id: 'Sanctioned_Date', label: 'Sanctioned Date', },
  { id: 'Last_Modified_By', label: 'Last Modified By', },
  { id: 'Branch_code', label: 'Branch Code', },
];

export default function MyTable(props) {
  const [applicationDetails, setApplicationDetails] = useState([]);
  const F1 = props.data;  

  useEffect(() => {
    const requestApplicationDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "f1":F1
      }),
    };
    fetch( fetchUrl + applicationDetailsurl, requestApplicationDetails)
      .then(response => response.json())
      .then((response) => {
        setApplicationDetails(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 0, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationDetails.slice(0, 1)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" key={index}>
                      <TableCell >{row.productCode}</TableCell>
                      <TableCell >{row.appCategory}</TableCell>
                      <TableCell >{row.appNO}</TableCell>
                      <TableCell >{row.batchCount}</TableCell>
                      <TableCell >{row.status}</TableCell>
                      <TableCell >{row.santionDate}</TableCell>
                      <TableCell >{row.lastModifiedBy}</TableCell>
                      <TableCell >{row.branchCode}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}