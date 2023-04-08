import * as React from 'react';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { fetchUrl } from '../Config';
// import CbReportDetails from './CdReportDetails';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const baseURL = fetchUrl;
const leadDashSearchURL = '/cbReport';


const columns = [
    { id: 'Sr', label: 'Sr. No', },
    { id: 'Product_code', label: 'Product Code', },
    { id: 'Loan_Account_No', label: 'Customer Name', },
    { id: 'URN', label: 'Branch Code', },
    { id: 'Opportunity_Status', label: 'Borrower Type', },
    { id: 'Credit_Bureau_Status', label: 'Credit Bureau Status', },
    { id: 'Action', label: 'Action', },
];
function CbReports() {
    const [searchInputes, setSearchInputs] = useState([]);
    const [leadDashData, setLeadDashData] = useState([])
    const [fromData, setFromData] = useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState([]);
    const [uRNdisable, setURNdisable] = React.useState(true);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const Navigate = useNavigate()
    const location = useLocation();
    const index = location.state;
    const onhandlecancel = () => {
        Navigate('/index', { state: index })
    }

    const onHandlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSearchInputs(values => ({ ...values, [name]: value }))
    }

    const onHandleSearchUserMaster = async (event) => {
        event.preventDefault();

        if (searchInputes.Lead_ID == "" || searchInputes.Lead_ID == null || searchInputes.Lead_ID == undefined) {
            alert("Please Enter Lead ID")
        }

        const requestOptionssearch = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "leadId": searchInputes.Lead_ID,
            }),
        };
        await fetch(baseURL + leadDashSearchURL, requestOptionssearch)
            .then(response => response.json())
            .then((response) => {
                console.log(response)

                //                 response.map(element => {
                //     if (element.status == "ACCEPT") {
                //         setURNdisable(true)
                // return;

                //     } else {
                //         setURNdisable(false)
                //     }
                // })

                if (response.length === 0) {
                    setLeadDashData([]);
                    setFromData(false)

                } else {
                    setLeadDashData(response);
                    setFromData(true)
                }
            })
    }
    const onHandleSearcchClear = () => {
        setSearchInputs('')
        setLeadDashData([])
    }

    const meetingMasterview = (imgUrl) => () => {
        window.open(
            imgUrl
        )
    }

    const handleKeyPressNumber = (event) => {
        const regex = /^[0-9\b]+$/;
        if (!regex.test(event.key)) {
            event.preventDefault();
        }
    };

    return (
        <>
            <div className='usermaster '>
                <div className='searchBox mt-3'>
                    <div className="card">
                        <div className="card-header">CB Report</div>
                        <form >
                            <div className="card-body py-4">
                                <div className='row'>
                                    <div className='col-10'>
                                        <TextField fullWidth id="outlined-basic" label="Lead ID" variant="outlined"
                                            name='Lead_ID'
                                            value={searchInputes.Lead_ID || ""}
                                            onChange={onHandlechange}
                                            inputProps={{ maxLength: 20 }}
                                            onKeyPress={handleKeyPressNumber}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className='col-2 d-flex   p-1'>
                                        <Button className='bg-orenge ms-3' variant="contained" onClick={onHandleSearchUserMaster}
                                        >Search</Button>

                                        <Button className='bg-orenge ms-3' variant="contained" onClick={onHandleSearcchClear}
                                        >Clear</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="card">
                {/* <CbReportDetails leadRecord={leadDashData} ></CbReportDetails> */}
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
                                    {leadDashData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const serialNumber = index + 1 + page * rowsPerPage;
                                            const isAccepted = row.status === "ACCEPT";
                                            const isReject = row.status === "REJECT";

                                            return (
                                                <TableRow key={index}>
                                                    <TableCell >{serialNumber}</TableCell>
                                                    <TableCell >{row.productCode}</TableCell>
                                                    <TableCell>{row.customerName}</TableCell>
                                                    <TableCell>{row.branchCode}</TableCell>
                                                    <TableCell>{row.borrowerType}</TableCell>
                                                    <TableCell>{row.status}</TableCell>
                                                    <TableCell>
                                                        {(isAccepted || isReject) && (
                                                            <FontAwesomeIcon
                                                                className="me-3 fs-5 text-orenge cursor-pointer"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#ViewMeetingmaster"
                                                                variant="contained"
                                                                icon={faEye}
                                                                onClick={meetingMasterview(row.imgUrl)}
                                                            />
                                                        )}
                                                        {!(isAccepted || isReject) && (
                                                            <FontAwesomeIcon
                                                                className="CBURNViewdisable"
                                                                icon={faEye}
                                                                onClick={event => event.preventDefault()}
                                                            />
                                                        )}
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
                            count={leadDashData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>

                </div>
            </div>
            <div className='d-flex justify-content-end items-center p-1'>
                <Button className='mt-4 bg-orenge' variant="contained" onClick={onhandlecancel}>Cancel</Button>
            </div>
        </>
    )
}
export default CbReports;