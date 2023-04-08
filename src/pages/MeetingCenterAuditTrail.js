import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchUrl } from '../Config';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const baseURL = fetchUrl;
const getMeetingCenterListURL = '/getMeetingCenterList';
const fetchAuditTrailMeetingMasterURL = '/fetchAuditTrailMeetingMaster';

const columns = [
    { id: 'sr_no', label: 'Sr. No' },
    { id: 'Meeting_Center_Code', label: 'Meeting Center Code' },
    { id: 'Meeting_Center_Name', label: 'Meeting Center Name' },
    { id: 'Fied_Name', label: 'Field  Name' },
    { id: 'Old_Value', label: 'Old Value' },
    { id: 'New_Value', label: 'New Value' },
    { id: 'User_ID', label: 'User ID' },
];

function MeetingCenterAuditTrail() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchMCTrail, setsearchMCTrail] = React.useState([]);
    const [mcselect, setMcselect] = React.useState('');
    const [MeetingCenterCode, setMeetingCenterCode] = React.useState([]);
    const [open, setOpen] = React.useState(false);



    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMeetingCenter = async (event) => {
        handleToggle()
        event.preventDefault();
        if (mcselect == "" || mcselect == null || mcselect == undefined) {
            alert("Please Select Meeting Center Code");
            handleClose()
            setsearchMCTrail([])
            return;
        }
        const requestOptionscrecbulk = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "meetingCentreCode": mcselect
            }),
        };
        await fetch(baseURL + fetchAuditTrailMeetingMasterURL, requestOptionscrecbulk)
            .then(response => response.json())
            .then((response) => {
                if (response.length === 0) {
                    alert("No Data Avaialble")
                    window.location.reload();
                }
                setsearchMCTrail(response);
                handleClose()
            })
    }
    //....................drop down list.. start......................//
    React.useEffect(() => {
        handleToggle()
        const requestOptionsid = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userId": userName
            }),
        };
        fetch(baseURL + getMeetingCenterListURL, requestOptionsid)
            .then(response => response.json())
            .then((response) => {
                setMeetingCenterCode(response)
                handleClose()
            })
    }, []);


    const dropdownMeetingValue = Object.values(MeetingCenterCode);
    const dropdownMeetingKeys = Object.keys(MeetingCenterCode);

    //....................drop down list end........................//


    const handleChange = (event) => {
        setMcselect(event.target.value);
    };


    const Navigate = useNavigate()
    const location = useLocation();
    const index = location.state;
    const userName = index.username;
    const onHandleMigrateCancel = () => {
        Navigate('/index', { state: index })
    }

    const handleMeetingCenterClear = () => {
        setMcselect('')
        setsearchMCTrail([])
    }
    
    return (
        <>
            <div className='CrecUpdate'>
                <div className='searchBox mt-4'>
                    <div className="card">
                        <div className="card-header">Meeting Center Audit Trail</div>
                        <div className="card-body py-">
                            {/* <form> */}
                            <div className='mb-4 d-flex'>

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Meeting Center</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='selectMeetingC'
                                        value={mcselect}
                                        label="Select Meeting Center"
                                        onChange={handleChange}
                                    ><MenuItem value="......">------Select------</MenuItem>
                                        {dropdownMeetingKeys.map((mcselect, index) =>
                                            <MenuItem key={index} value={mcselect}
                                            //    onClick={onHandleMigrateMeetingCenter}
                                            >{dropdownMeetingValue[index]}</MenuItem>
                                            
                                        )}; 
                                    </Select>
                                </FormControl>

                                <div className='d-flex align-items-center p-1'>
                                    <Button className='bg-orenge ms-3' variant="contained" type="submit" onClick={handleMeetingCenter}>
                                        Search
                                    </Button>
                                    <Button className='bg-orenge ms-3' variant="contained" type="submit" onClick={handleMeetingCenterClear}>
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='border mt-4'>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
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
                                    {searchMCTrail
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const serialNumber = index + 1 + page * rowsPerPage;
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell >{serialNumber}</TableCell>
                                                    <TableCell >{row.meetingCentreCode}</TableCell>
                                                    <TableCell >{row.meetingCentreName}</TableCell>
                                                    <TableCell >{row.fieldName}</TableCell>
                                                    <TableCell >{row.oldValue}</TableCell>
                                                    <TableCell >{row.newValue}</TableCell>
                                                    <TableCell >{row.userID}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={searchMCTrail.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        <div className='d-flex justify-content-end p-1'>
                            <Button className='bg-orenge ms-3' variant="contained" type="submit" onClick={onHandleMigrateCancel}>
                                Cancel
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        </>
    );
}

export default MeetingCenterAuditTrail; 