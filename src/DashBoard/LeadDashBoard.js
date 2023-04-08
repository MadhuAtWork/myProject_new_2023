import * as React from 'react';
import { useState, useEffect, useHistory, useRef } from "react";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchUrl } from '../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import LeadDashBoardDetailsTabs from '../DashBoard/LeadDashBoardDetails'

const baseURL = fetchUrl;
const leadDashSearchURL = '/leadDash';

const columns = [
    { id: 'Product_code', label: 'Product Code', },
    { id: 'Loan_Account_No', label: 'Loan Account No.', },
    { id: 'URN', label: 'URN', },
    { id: 'Opportunity_Status', label: 'Opportunity Status', },
    { id: 'Credit_Bureau_Status', label: 'Credit Bureau Status', },
    { id: 'Client_Name', label: 'Client Name', },
    { id: 'Loan_Amount', label: 'Loan Amount', },
    { id: 'Action', label: 'Action', },
];
function LeadDashBoard() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState([]);
    const [searchInputes, setSearchInputs] = useState([]);
    const [leadDetails, setLeadDetails] = useState(false)
    const [leadDashData, setLeadDashData] = useState([])
    const [fromData, setFromData] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    }

    const UserMasterview = () => {
        setLeadDetails(true)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
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
        handleToggle()
        if (searchInputes.Lead_ID === "" || searchInputes.Lead_ID === null || searchInputes.Lead_ID === undefined) {
            alert("Please Enter Lead ID")
            setFromData(false)
            handleClose();
            return;
        }

        const requestOptionssearch = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "leadId": searchInputes.Lead_ID
            }),
        };
        await fetch(baseURL + leadDashSearchURL, requestOptionssearch)
            .then(response => response.json())
            .then((response) => {
                console.log(response)
                if (response.length === 0) {
                    alert("No Data Available")
                    setLeadDashData({});
                    setFromData(false)
                    handleClose()
                } else {
                    setLeadDashData(response[0]);
                    setFromData(true)
                    handleClose()
                }
                setSearch(response);
                handleClose()
            }).catch((error) => {
                alert("Service Unavailable ")
                // Navigate("error");
                handleClose();
            });
    }
    const onHandleSearcchClear = () => {
        // setSearchInputs('')
        // setFromData(false)
        // setLeadDashData({});
        window.location.reload()

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
                        <div className="card-header">Lead Dashboard</div>
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
                                            autoComplete= "off"
                                        />
                                    </div>
                                    {/* <div className='col-5'>
                                        <TextField fullWidth id="outlined-basic" label="URN" variant="outlined"
                                            name='URN'
                                            value={searchInputes.URN || ""}
                                            onChange={onHandlechange}
                                        />
                                    </div> */}
                                    <div className='col-2 d-flex align-item-center p-1'>
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
            <div className={fromData ? "card" : "LeadDashboardfalse"}>
                <div className="card-header bg-orenge py-2">
                    Lead Details
                </div>
                <LeadDashBoardDetailsTabs leadRecord={leadDashData} ></LeadDashBoardDetailsTabs>
            </div>
            <div className='d-flex justify-content-end items-center p-1'>
                <Button className='mt-4 bg-orenge' variant="contained" onClick={onhandlecancel}>Cancel</Button>
            </div>
            <Backdrop
                sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}
export default LeadDashBoard;