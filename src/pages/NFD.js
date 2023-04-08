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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchUrl } from '../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import dayjs from 'dayjs';

const branchCodeListURL = '/branchCodeList';
const getMeetingCenterListURL = '/getMeetingCenterListByBranch';
const baseURL = fetchUrl;
const searchURL = '/search'
const nfdUpdateURL = '/nfdUpdate'

const columns = [
    { id: 'Meeting Center Name', label: 'Meeting Center Name', },
    { id: 'CREC Name', label: 'CREC Employee ID', },
    { id: 'Repayment Slot', label: 'Repayment Slot', },
    { id: 'Repayment Time', label: 'Repayment Time', },
    { id: 'Repayment Date', label: ' Repayment Day', },
    { id: 'Action', label: 'Action', }

];

function NFD() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [branchCodeList, setbranchCodeList] = React.useState([])
    const [meetingCenterCode, setMeetingCenterCode] = React.useState([])
    const [branchdatavalue, setBranchdatavalue] = React.useState()
    const [meetingCenterValue, setMeetingCenterValue] = React.useState()
    const [nfdtableData, setNfdtableData] = React.useState([]);
    const [editMCForm, setEditMCForm] = React.useState([])
    const [RPDayEdit, setRPDayEdit] = React.useState("")
    const [RPYimeEdit, setRPYimeEdit] = React.useState("")
    const [RPSlotEdit, setRPSlotEdit] = React.useState("")
    const [editInputesCrec, setEditInputesCrec] = React.useState(null)

    const crecNameEditRef = React.useRef("")
    const repaymentDayEditRef = React.useRef('')
    const repaymentTimeEditRef = React.useRef('')
    const repaymentSlotEditRef = React.useRef('')

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    }

    React.useEffect(() => {
        onHandleBranchDatya()
    }, []);


    const onHandleBranchDatya = async () => {
        handleToggle()
        const requestOptionsid = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userName
            }),
        };
        await fetch(baseURL + branchCodeListURL, requestOptionsid)
            .then(response => response.json())
            .then((response) => {
                if (response.length === 0) {
                    alert("No Data Avaialble")
                }
                setbranchCodeList(response)
                handleClose()
            })
    }

    const branchCodeListArray = Object.values(branchCodeList);
    const branchCodeListKeys = Object.keys(branchCodeList);

    const handleBranchSearch = async (event) => {
        handleToggle()

        event.preventDefault();
        if (branchdatavalue == "" || branchdatavalue == null || branchdatavalue == undefined) {
            alert("Please Select Branch Name")
            handleClose()
            return;
        }
        const requestOptionsid = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "branchCode": branchdatavalue
            }),
        };
        fetch(baseURL + getMeetingCenterListURL, requestOptionsid)
            .then(response => response.json())
            .then((response) => {
                if (response.length === 0) {
                    alert("No Data Avaialble")
                }
                console.log(response)
                setMeetingCenterCode(response)
                handleClose()
            })
    }
    const dropdownMeetingValue = Object.values(meetingCenterCode);
    const dropdownMeetingKeys = Object.keys(meetingCenterCode);

    const handleMeetingCenterSearch = async (event) => {

        handleToggle()
        event.preventDefault();
        if (meetingCenterValue == "" || meetingCenterValue == null || meetingCenterValue == undefined) {
            alert("Select Meeting Center Name")
            handleClose()
            return;
        }
        const requestOptionsid = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "meetingCenterCode": meetingCenterValue,
            }),
        };
        fetch(baseURL + searchURL, requestOptionsid)
            .then(response => response.json())
            .then((response) => {
                if (response.length === 0) {
                    alert("No Data Available")
                }
                console.log(response)
                setNfdtableData(response)
                handleClose()
            })
    }

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
    const userName = index.username;
    const onhandlecancel = () => {
        Navigate('/index', { state: index })
    }

    const meetingMasterEdit = (editData) => () => {
        crecNameEditRef.current.value = editData.crecName
        repaymentDayEditRef.current.value = editData.repaymentDay
        repaymentTimeEditRef.current.value = editData.repaymentTime
        repaymentSlotEditRef.current.value = editData.repaymentSlot
        setEditMCForm(editData)
    }


    const onHandleUpDateNfd = async (event) => {

        handleToggle()
        event.preventDefault();
        console.log(editInputesCrec)
        console.log(RPDayEdit)
        console.log(RPSlotEdit)
        console.log(RPYimeEdit)

        if (editInputesCrec === "" || crecNameEditRef.current.value === "") {
            alert("Please Enter CrecName")
            handleClose()
            return
        }


        if (repaymentDayEditRef.current.value === "") {
            alert("Please Enter RePaymentDay")
            handleClose()
            return
        }
        if (repaymentTimeEditRef.current.value == "") {
            alert("Please Enter RePaymentTime")
            handleClose()
            return
        }
        if (repaymentSlotEditRef.current.value == "") {
            alert("Please Enter RePaymentSlot")
            handleClose()
            return
        }


        if ((RPDayEdit === "" || RPDayEdit === editMCForm.repaymentDay) &&
            (RPYimeEdit === "" || RPYimeEdit === editMCForm.repaymentTime) &&
            (RPSlotEdit === "" || RPSlotEdit === editMCForm.repaymentSlot) &&
            (editInputesCrec === null || editInputesCrec === editMCForm.crecName)) {
            alert("With Out changes Save")
            handleClose()
            return
        }

        const requestOptionsid = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "meetingCenterCode": meetingCenterValue,
                "name": editMCForm.name,
                "repaymentDay": RPDayEdit || editMCForm.repaymentDay,
                "repaymentTime": RPYimeEdit || editMCForm.repaymentTime,
                "repaymentSlot": RPSlotEdit || editMCForm.repaymentSlot,
                "crecName": editInputesCrec || editMCForm.crecName,
                "userId": userName
            }),

        };
        await fetch(baseURL + nfdUpdateURL, requestOptionsid)
            .then(response => response.json())
            .then((response) => {
                alert(response.SUCCESS)
                window.location.reload();
                handleClose()
            })
    }
    const handleKeyPressNumber = (event) => {
        if (event.key === " ") {
            event.preventDefault();
        }
    };

    return (
        <>
            <form >
                <div className='NFD'>
                    <div className='searchBox mt-4'>
                        <div className="card">
                            <div className="card-header ">NFD</div>
                            <div className="card-body py-">
                                <div className=' d-flex mb-3'>
                                    <div className='col-11 me-1  '>
                                        <Form.Label >Select Branch Name</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            fullWidth
                                            onChange={(e) => setBranchdatavalue(e.target.value)}
                                        >
                                            <option value="">---select---</option>
                                            {branchCodeListArray.map((branchCode, index) =>
                                                <option key={index} value={branchCodeListKeys[index]}>{branchCode}</option>
                                            )};
                                        </Form.Select>
                                    </div>
                                    <div className='col-1 d-flex align-items-end p-1'>
                                        <Button className='bg-orenge ms-3' variant="contained" type="submit" onClick={handleBranchSearch}>Search</Button>
                                    </div>
                                </div>
                                <div className='mb-3 d-flex'>

                                    <div className='col-11 me-1'>
                                        <Form.Label >Select Meeting Center Name</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            fullWidth
                                            onChange={(e) => setMeetingCenterValue(e.target.value)}
                                        >
                                            <option value="">---select---</option>
                                            {dropdownMeetingKeys.map((value, index) =>
                                                <option key={index} value={value}>{dropdownMeetingValue[index]}</option>
                                            )};
                                        </Form.Select>
                                    </div>
                                    <div className='d-flex align-items-end p-1'>
                                        <Button className='bg-orenge ms-3' variant="contained" type="submit"
                                            onClick={handleMeetingCenterSearch}
                                        >Search</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
                                {nfdtableData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell >{row.name}</TableCell>
                                                <TableCell >{row.crecName}</TableCell>
                                                <TableCell >{row.repaymentSlot}</TableCell>
                                                <TableCell >{row.repaymentTime}</TableCell>
                                                <TableCell >{row.repaymentDay}</TableCell>

                                                <TableCell >
                                                    <FontAwesomeIcon className='fs-5 text-orenge cursor-pointer'
                                                        data-bs-toggle="modal" data-bs-target="#EditMeetingmaster" variant="contained"
                                                        icon={faPenToSquare}
                                                        onClick={meetingMasterEdit(row)}
                                                    />
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={nfdtableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <Backdrop
                    sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div className='col-12 d-flex align-item-center justify-content-end'>
                    <div className='d-flex align-items-center p-1'>
                        <Button className='bg-orenge' variant="contained" type="submit"
                            onClick={onhandlecancel}
                        >Cancel</Button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="EditMeetingmaster" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <form
                    // onSubmit={onHandelEditMeetingCenter}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit NFD</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='row g-3'>

                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasiMCNedit">
                                            <Form.Label >Meeting Center Name</Form.Label>
                                            <Form.Control type="text" fullWidth disabled readOnly
                                                defaultValue={editMCForm.name || ""}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasiCRECIDedit">
                                            <Form.Label >CREC Employee ID</Form.Label>
                                            <Form.Control type="text" maxLength="25"
                                                defaultValue={editMCForm.crecName || ""}
                                                fullWidth
                                                ref={crecNameEditRef}
                                                onChange={(e) => setEditInputesCrec(e.target.value)}
                                                onKeyPress={handleKeyPressNumber}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className='col-6'>

                                        <Form.Label >Repayment Day</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            onChange={(event) =>
                                                setRPDayEdit(event.target.value)
                                            }
                                            ref={repaymentDayEditRef}

                                        >
                                            <option value="" hidden>{editMCForm.repaymentDay || ""}</option>
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                            <option value="Saturday">Saturday</option>
                                            <option value="Sunday">Sunday</option>
                                        </Form.Select>
                                    </div>


                                    <div className='col-6'>

                                        <Form.Group className="" controlId="formBasiRepaymenttimeedit">
                                            <Form.Label >Repayment Time</Form.Label>
                                            <Form.Control type="text"
                                                defaultValue={editMCForm.repaymentTime || ""}
                                                fullWidth
                                                onChange={(e) => setRPYimeEdit(e.target.value)}
                                                ref={repaymentTimeEditRef}

                                            />
                                        </Form.Group>

                                    </div>

                                    <div className='col-6'>
                                        <Form.Label >Repayment Slot</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            onChange={(event) =>
                                                setRPSlotEdit(event.target.value)
                                            }
                                            ref={repaymentSlotEditRef}

                                        >
                                            <option value="" hidden>{editMCForm.repaymentSlot || ""}</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </Form.Select>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn bg-orenge" data-bs-dismiss="modal">Close</button>
                                <button type="Submit" className="btn bg-orenge" onClick={onHandleUpDateNfd}>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default NFD;
