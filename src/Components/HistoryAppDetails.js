


import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { fetchUrl } from '../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Historycolumns = [
    { id: 'Sr', label: 'Sr.No.', },
    { id: 'Task_Namr', label: 'Task Name', },
    { id: 'Start Time', label: 'Start Time', },
    { id: 'End_Time', label: 'End Time', },
    { id: 'Time_Diffrencs', label: 'Time Diff (In minutes)', },
    { id: 'User', label: 'User', },
    { id: 'Remark', label: 'Remark', },
];

function HistoryAppDetails(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    console.log(props.historyData)
    return (
        <>
            <div className='TableDiv '>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {Historycolumns.map((column) => (
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
                                {props.historyData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const serialNumber = index + 1 + page * rowsPerPage;
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell >{serialNumber}</TableCell>
                                                <TableCell >{row.taskName}</TableCell>
                                                <TableCell >{row.startTime}</TableCell>
                                                <TableCell >{row.endTime}</TableCell>
                                                <TableCell>{Math.floor(row.timeDiff / 60)}</TableCell>
                                                <TableCell >{row.assignee}</TableCell>
                                                <TableCell className='w-25'>{row.remarks}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 10, 25, 100]}
                        component="div"
                        count={props.historyData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </>
    )
}
export default HistoryAppDetails;