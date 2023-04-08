// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';


// const columns = [
//     { id: 'Batch_No', label: 'Batch No' },
//     { id: 'Branch_Code', label: 'Branch Code' },
//     { id: 'Product_Code', label: 'Product Code' },
//     { id: 'Application_ID', label: 'Application ID' },
//     { id: 'Meeting_Center_Name', label: 'Meeting Center Name' },
//     { id: 'Meeting_Center_Leader_ID', label: 'Meeting Center Leader ID' },
//     { id: 'Alternate_Meeting_Center', label: 'Alternate Meeting Center' },
//     { id: 'Action', label: 'Action', align: 'center' },
// ];


// export default function StickyHeadTable() {
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//     const [mytask, setmytask] = React.useState([]);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };


//     React.useEffect(() => {
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 "executorID": "Ashish",
//                 "flag": "all",
//                 "queueID": ""
//             }),
//         };
//         fetch('http://192.168.0.196:8090/fetchMyTasks', requestOptions)
//             .then(response => response.json())
//             .then((response) => {
//                 console.log(response.data)
//                 setmytask(response.data)
//             })
//     }, []);


//     return (<>
//         <div className='MyTaskDetails'>
//             <div className="card mt-3">
//                 <div className="card-header">
//                     My Task List ( Application Details )
//                 </div>
//                 <div className="card-body p-3">
//                     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                         <TableContainer sx={{ maxHeight: 440 }}>
//                             <Table stickyHeader aria-label="sticky table">
//                                 <TableHead>
//                                     <TableRow>
//                                         {columns.map((column) => (
//                                             <TableCell
//                                                 key={column.id}
//                                                 align={column.align}
//                                                 style={{ minWidth: column.minWidth }}
//                                             >
//                                                 {column.label}
//                                             </TableCell>
//                                         ))}
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {mytask
//                                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                         .map((row) => {
//                                             return (
//                                                 <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                                                     <TableCell
//                                                         component="th"
//                                                         // id={labelId}
//                                                         scope="row"
//                                                         padding="none"
//                                                     >
//                                                         {row.f1}
//                                                     </TableCell>
//                                                     <TableCell>{row.f2}</TableCell>
//                                                     <TableCell>{row.f4}</TableCell>
//                                                     <TableCell>{row.f6}</TableCell>
//                                                     <TableCell>{row.f7}</TableCell>
//                                                     <TableCell>{row.f8}</TableCell>
//                                                     <TableCell>{row.f10}</TableCell>
//                                                     <TableCell><button>edit</button></TableCell>
//                                                 </TableRow>
//                                             );
//                                         })}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                         <TablePagination
//                             rowsPerPageOptions={[5, 10, 25, 100]}
//                             component="div"
//                             count={mytask.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             onPageChange={handleChangePage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                         />
//                     </Paper>
//                 </div>
//                 <div className='d-flex justify-content-end'>
//                     <button type="button" className="btn m-2 bg-orenge col-1 ">Cancel</button>
//                 </div>
//             </div>
//         </div>

//     </>
//     );
// }