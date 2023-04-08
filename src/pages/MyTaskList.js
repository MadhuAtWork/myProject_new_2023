
// import { useState } from "react";
// import Header from './Header';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileLines } from '@fortawesome/free-solid-svg-icons';
// import MyTaskDetails from "./MyTaskDetails";
// import React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { useNavigate } from 'react-router-dom';
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
// import MyTaskDetailsDashboard from "./MyTaskDetailsDashboard";
// import { Outlet, Link } from "react-router-dom";
// import { useLocation } from 'react-router-dom';



// const columns = [
//     { id: 'Product_Code', label: 'Product Code' },
//     { id: 'Appliction_No', label: 'Application No' },
//     { id: 'No_of_Customer', label: 'No of Customer' },
//     { id: 'Application_Status', label: 'Application Status' },
//     { id: 'Sanctioned_Date', label: 'Sanctioned Date' },
//     { id: 'Last_Modified_By', label: 'Last Modified By' },
//     { id: 'Branch_Code', label: 'Branch Code' },
//     { id: 'Action', label: 'Action', align: 'center' },
// ];


// function MyTaskLisst(props) {
//     const [navbar, setnavbar] = useState(false);
//     const [Mytasklead, setMytasklead] = useState([]);
//     const [mytaskQueue, setmytaskQueue] = useState({});
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//     const [mytask, setmytask] = React.useState([]);
//     const [mytaskTitle, setMytaskTitle] = React.useState('My Task List ( Application Details )');
//     // const [data, setdata] = useState(data);
//     // const [mytaskapplist, setMytaskapplist] = useState(true);
//     const Navigate = useNavigate();
//     const location = useLocation();

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };

//     const onhandlechange = () => {
//         setnavbar(!navbar);
//     }

//     React.useEffect(() => {
//         const requestOptionsQueue = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 "executorID": "Ashish",
//                 "flag": "all",
//                 "queueID": ""
//             }),
//         };
//         fetch('http://192.168.0.196:8090/fetchMyTasks', requestOptionsQueue)
//             .then(response => response.json())
//             .then((response) => {
//                 console.log(response)
//                 setmytaskQueue(response.dataMap)
//             })
//     }, []);

//     const onMenuClick = menuName => (e) => {
//         e.preventDefault();
//         setMytaskTitle(menuName)

//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 "executorID": "Ashish",
//                 "flag": "all",
//                 "queueID": "",
//                 "queueName": menuName
//             }),
//         };
//         fetch('http://192.168.0.196:8090/fetchMyTasks', requestOptions)
//             .then(response => response.json())
//             .then((response) => {
//                 console.log(response.data)

//                 setmytask(response.data)
//             })
//     }

//     const onHandleeditMytask = F1 => (e) => {
//         e.preventDefault();
//         console.log(F1)
//         console.log(menu);

//         // setMytaskapplist(false)
//         Navigate("/index/MyTask/MyTaskDetails", { state:{ batch: F1 , menu: menu}});
//     }

//     const QueueList = Object.keys(mytaskQueue);
//     const Queuevalue = Object.values(mytaskQueue);

   
//     console.log(location.state);
//     const menu = location.state;
//     const onHnadleCancelMytask = () => {
//         Navigate('/index', { state: menu })
//     }

//     return (
//         <>
//             <div className="main2">
//                 <div className="menu2">
//                     <div className={navbar ? "sidenav" : "unset_sidenav"}>
//                         <div className="menuIcon" onClick={onhandlechange}>&#9776;</div>
//                         {
//                             navbar ? <> <div className="holder"></div>
//                                 <div>
//                                     {
//                                         QueueList.map((value, i) =>
//                                             <div className="holder myTaskList1" onClick={onMenuClick(value)} key={i}>
//                                                 <span className="ms- badge rounded-pill bg-white">{Queuevalue[i]}</span>
//                                                 <span className="ms-2">{value}
//                                                 </span>
//                                             </div>
//                                         )
//                                     }
//                                 </div>
//                             </>
//                                 : <>
//                                     <div>
//                                         {
//                                             QueueList.map((value, i) =>
//                                                 <div className="holder"
//                                                     onClick={onMenuClick(value)}
//                                                     key={i}>
//                                                     <span className="ms"><span className="badge rounded-pill bg-white">{Queuevalue[i]}</span></span></div>
//                                             )
//                                         }
//                                     </div>
//                                 </>
//                         }
//                     </div>
//                 </div>
//                 <div className="section2">
//                     <div className='MyTaskDetails'>
//                         <div className="card mt-4">
//                             <div className="card-header ">
//                                 {mytaskTitle}
//                             </div>
//                             <div className="card-body p-3">
//                                 <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                                     <TableContainer sx={{ maxHeight: 440 }}>
//                                         <Table stickyHeader aria-label="sticky table">
//                                             <TableHead>
//                                                 <TableRow>
//                                                     {columns.map((column) => (
//                                                         <TableCell
//                                                             key={column.id}
//                                                             align={column.align}
//                                                             style={{ minWidth: column.minWidth }}
//                                                         >
//                                                             {column.label}
//                                                         </TableCell>
//                                                     ))}
//                                                 </TableRow>
//                                             </TableHead>
//                                             <TableBody>
//                                                 {mytask
//                                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                                     .map((row, value, i) => {
//                                                         return (
//                                                             <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                                                                 <TableCell
//                                                                     component="th"
//                                                                     scope="row"
//                                                                     padding="none"
//                                                                 >
//                                                                     {row.f3}
//                                                                 </TableCell>
//                                                                 <TableCell>{row.f4}</TableCell>
//                                                                 <TableCell>{row.f12}</TableCell>
//                                                                 <TableCell>{row.f11}</TableCell>
//                                                                 <TableCell>{row.f13}</TableCell>
//                                                                 <TableCell>{row.f14}</TableCell>
//                                                                 <TableCell>{row.f2}</TableCell>
//                                                                 <TableCell className="text-center editicon"><FontAwesomeIcon className='fs-5 text-orenge cursor-pointer'
//                                                                     onClick={onHandleeditMytask(row.f1)} icon={faPenToSquare} />
//                                                                 </TableCell>
//                                                             </TableRow>
//                                                         );
//                                                     })}
//                                             </TableBody>
//                                         </Table>
//                                     </TableContainer>
//                                     <TablePagination
//                                         rowsPerPageOptions={[5, 10, 25, 100]}
//                                         component="div"
//                                         count={mytask.length}
//                                         rowsPerPage={rowsPerPage}
//                                         page={page}
//                                         onPageChange={handleChangePage}
//                                         onRowsPerPageChange={handleChangeRowsPerPage}
//                                     />
//                                 </Paper>
//                             </div>
//                             <div className='d-flex justify-content-end'>
//                                 <button type="button" className="btn m-2 bg-orenge col-1 " onClick={onHnadleCancelMytask}>
//                                     <p>Cancel</p>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default MyTaskLisst; 