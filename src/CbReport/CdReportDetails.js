


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

const columns = [
    { id: 'Sr', label: 'Sr. No', },
    { id: 'Product_code', label: 'Product Code', },
    { id: 'Loan_Account_No', label: 'Customer Name', },
    { id: 'URN', label: 'Branch Code', },
    { id: 'Opportunity_Status', label: 'Borrower Type', },
    { id: 'Credit_Bureau_Status', label: 'Credit Bureau Status', },
    { id: 'Action', label: 'Action', },
];

function CbReportDetails(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState([]);
    const [uRNdisable, setURNdisable] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // React.useEffect(() => {
        console.log(props.leadRecord)

        // props.leadRecord.forEach(element => {
            if (props.leadRecord.imgUrl == "" || props.leadRecord.imgUrl == null) {
                setURNdisable(false)
            } else {
                setURNdisable(true)
    
            }
        // })

       
    // }, [])


    const meetingMasterview = (imgUrl) => () => {
        window.open(
            imgUrl
        )
    }

    return (
        <>
            <div className='TableDiv '>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead className="tableHead">
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.leadRecord
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const serialNumber = index + 1 + page * rowsPerPage;

                                        return (
                                            <TableRow key={index}>
                                                <TableCell >{serialNumber}</TableCell>
                                                <TableCell >{row.productCode}</TableCell>
                                                <TableCell>{row.customerName}</TableCell>
                                                <TableCell>{row.branchCode}</TableCell>
                                                <TableCell>{row.borrowerType}</TableCell>
                                                <TableCell>{row.status}</TableCell>
                                                <TableCell  >
                                                    <FontAwesomeIcon
                                                        className=
                                                        {uRNdisable ?
                                                         'me-3 fs-5 text-orenge cursor-pointer' 
                                                         : "CBURNViewdisable"}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#ViewMeetingmaster" variant="contained" icon={faEye}
                                                        //  disabled ={uRNdisable ? false : true} 
                                                        onClick={meetingMasterview(row.imgUrl)}
                                                    />

                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 10, 25, 100]}
                        component="div"
                        count={props.leadRecord.length}
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
export default CbReportDetails;