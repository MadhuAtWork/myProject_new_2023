
import * as React from 'react';
import { useState, useEffect, useHistory, useRef } from "react";
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { fetchUrl } from '../Config';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import NativeSelect from '@mui/material/NativeSelect';
import Autocomplete from '@mui/material/Autocomplete';
import Form from 'react-bootstrap/Form';

const columns = [
    { id: 0, label: 'Meeting Center Code' },
    { id: 1, label: 'Meeting Center Name', },
    { id: 2, label: 'MCL URN', },
    { id: 3, label: 'AMCL URN', },
    { id: 4, label: 'CREC Employee ID', },
    { id: 5, label: 'Status', },
    { id: 6, label: 'Action', },
];

const baseURL = fetchUrl;

const MeetingCenterSearchURL = '/search';
const addMeetingMasterURL = '/addMeetingMaster';
const editMeetingCenter = '/edit';
const cityCodeListURL = '/cityCodeList';
const branchCodeListURL = '/branchCodeList';
const areaCodeListURL = '/areaCodeList';
const statusListURL = '/statusList';

function AddMeetingMaster() {

    const [page, setPage] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState([]);
    const [editDetails, setEditDetails] = React.useState([]);
    const [viewDetails, setViewDetails] = React.useState([]);
    const [editInputesCrec, setEditInputesCrec] = React.useState('');
    const [searchInputes, setSearchInputs] = React.useState([]);
    // const [data, setData] = React.useState([]);
    const [branchCodeList, setbranchCodeList] = React.useState([]);
    const [areaCodeList, setareaCodeList] = React.useState([]);
    const [statusList, setstatusList] = React.useState([]);
    const [branchCodedropdown, setBranchCodeDropdown] = React.useState('');
    const [Statusdropdown, setStatusdropdown] = React.useState(null);
    const [tableData, setTableData] = useState([]);
    const [inputsearchValue, setinputsearchValue] = useState();
    const [editMclUrn, setEditMclUrn] = React.useState(null)
    const [editAMclUrn, setEditAMclUrn] = React.useState(null)
    const [branchCodeSearch, setBranchCodeSearch] = React.useState('');
    const crecRef = useRef(null)


    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    }


    const meetingMasterEdit = editId => () => {
        setEditMclUrn('')
        setEditAMclUrn('')
        setEditInputesCrec('')
        crecRef.current.value = editId.crecName

        setStatusdropdown('')
        setEditDetails(editId)

        if (editId.meetingCenterCode == null) {
            editId.meetingCenterCode = "";
        }

        if (editId.name == null) {
            editId.name = "";
        }

        if (editId.cityCode == null) {
            editId.cityCode = "";
        }

        if (editId.branchCode == null) {
            editId.branchCode = "";
        }

        if (editId.areaCode == null) {
            editId.areaCode = "";
        }

        if (editId.batchCount == null) {
            editId.batchCount = "";
        }

        if (editId.mclUrnNo === null) {
            editId.mclUrnNo = "";
        }

        if (editId.amclUrnNo === null) {
            editId.amclUrnNo = "";
        }
        if (editId.mclLeadID === null) {
            editId.mclLeadID = "";
        }

        if (editId.amclLeadID === null) {
            editId.amclLeadID = "";
        }

        if (editId.mclCisNO == null) {
            editId.mclCisNO = "";
        }

        if (editId.fosMcRefNO == null) {
            editId.fosMcRefNO = "";
        }

        if (editId.crecName == null) {
            editId.crecName = "";
        }

        if (editId.address == null) {
            editId.address = "";
        }

        if (editId.gpsLAT == null) {
            editId.gpsLAT = "";
        }

        if (editId.gpsLON === null) {
            editId.gpsLON = "";

        }

        if (editId.repaymentDay == null) {
            editId.repaymentDay = "";
        }

        if (editId.repaymentTime == null) {
            editId.repaymentTime = "";
        }

        if (editId.repaymentSlot == null) {
            editId.repaymentSlot = "";
        }

        if (editId.status == null) {
            editId.status = "";
        }
    }

    const meetingMasterview = viewId => () => {
        setViewDetails(viewId);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        handleToggle()
        const requestOptionsid = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userId": userName
            }),
        };
        fetch(baseURL + branchCodeListURL, requestOptionsid)
            .then(response => response.json())
            .then((response) => {
                setbranchCodeList(response)
                handleClose()
            })
    }, []);
    const branchCodeListArray = Object.values(branchCodeList);
    const branchCodeListArraykeys = Object.keys(branchCodeList);

    useEffect(() => {
        handleToggle()
        const requestOptionsid = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            }),
        };
        fetch(baseURL + statusListURL, requestOptionsid)
            .then(response => response.json())
            .then((response) => {
                setstatusList(response)
                handleClose()
            })

    }, []);
    const statusListArray = Object.values(statusList);

    const handleSerarchMetingMaster = async (event) => {
        handleToggle()
        event.preventDefault();
        const requestOptionssearch = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "meetingCenterCode": searchInputes.meetingCenterCode,
                "name": searchInputes.meetingCenterName,
                "crecName": searchInputes.CrecName,
                "branchCode": branchCodeSearch
            }),
        };
        await fetch(baseURL + MeetingCenterSearchURL, requestOptionssearch)
            .then(response => response.json())
            .then((response) => {
                if (response == "") {
                    alert('No Record(s) found')
                }
                setSearch(response);
                setTableData(response);
                setBranchCodeDropdown("")
                console.log(response)
                handleClose()
            })
    }


    const onHandelEditMeetingCenter = async (event) => {
        handleToggle();
        event.preventDefault();
        const crecName = crecRef.current.value
        if (crecName === "") {
            alert("Please Enter Crec Name")
            handleClose()
            return;
        }

        if ((editMclUrn === "" || editMclUrn === editDetails.mclUrnNo) && (editAMclUrn === "" || editAMclUrn === editDetails.amclUrnNo)
            && (crecName === "" || crecName === editDetails.crecName) && (Statusdropdown === "" || Statusdropdown === editDetails.status)) {
            alert("Without Changes Meeting center UpDate")
            handleClose()
            return;
        }

        const requestOptionsedit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "mclUrnNo": editMclUrn || editDetails.mclUrnNo,
                "amclUrnNo": editAMclUrn || editDetails.amclUrnNo,
                "crecName": crecName || editDetails.crecName,
                "status": Statusdropdown || editDetails.status,
                "meetingCenterCode": editDetails.meetingCenterCode,
                "userId": userName
            }),
        };
        await fetch(baseURL + editMeetingCenter, requestOptionsedit)
            .then(response => response.json())
            .then((response) => {
                alert(response.Success)
                window.location.reload();
                handleClose()
                setStatusdropdown('');
                setEditInputesCrec('')
                setEditAMclUrn('');
                setEditMclUrn('');
            })
    };


    const onHandleSearchMeetingCenter = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSearchInputs(values => ({ ...values, [name]: value }))
    }

    const requestSearch = (searchedVal) => {
        if (searchedVal.length > 3) {
            const filteredRows = tableData.filter((row) => {
                const searchValue = searchedVal.toString().toLowerCase();
                var val1 = false;
                var val2 = false;
                var val3 = false;
                var val4 = false;
                var val5 = false;
                if (row.meetingCenterCode != null) {
                    val1 = row.meetingCenterCode.toString().toLowerCase().includes(searchValue);
                }
                if (row.name != null) {
                    val2 = row.name.toString().toLowerCase().includes(searchValue);
                }
                if (row.mclUrnNo != null) {
                    val3 = row.mclUrnNo.toString().toLowerCase().includes(searchValue);
                }
                if (row.amclUrnNo != null) {
                    val4 = row.amclUrnNo.toString().toLowerCase().includes(searchValue);
                }
                if (row.crecName != null) {
                    val5 = row.crecName.toString().toLowerCase().includes(searchValue);
                }
                return val1 || val2 || val3 || val4 || val5;
            });
            setSearch(filteredRows);
        }
        else {
            setSearch(tableData);
        }
    };


    const handleAddStatusSelect = (event) => {
        setStatusdropdown(event.target.value)
    }
    const Navigate = useNavigate();
    const location = useLocation();
    const index = location.state;
    const userName = index.username;
    console.log(userName)
    const onHandleExist = () => {
        Navigate('/index', { state: index })
    }


    const handleKeyPress = (event) => {
        if (event.key === " ") {
            event.preventDefault();
        }
    }

    const handleeditMclUrn = (event) => {
        setEditMclUrn(event.target.value)
    }
    const handleeditAMclUrn = (event) => {
        setEditAMclUrn(event.target.value)
    }

    const onHandleSearchClear = () => {
        setSearchInputs('')
        setBranchCodeSearch('')
        setSearch([]);

    }


    const onHandleCloseEditForm = () => {
        setEditMclUrn('')
        setEditAMclUrn('')
        setEditInputesCrec('')

        setStatusdropdown('')
    }


    const handleKeyPressNumber = (event) => {
        if (event.key === " ") {
            event.preventDefault();
        }
    };


    return (
        <>
            <div className='AddMeetingMaster mt-4'>
                <div className='searchBox'>
                    <div className="card">
                        <div className="card-header"> Add Meeting Master </div>
                        <form>
                            <div className="card-body ">
                                <div className='d-flex justify-content-around'>
                                    <div className='col-3 me-1'>
                                        <Form.Group className="mb-3" controlId="formBasicMCC">
                                            <Form.Label >Meeting Center Code</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Meeting Center Code" autoComplete='off'
                                                name="meetingCenterCode" value={searchInputes.meetingCenterCode || ""} maxLength="20" fullWidth
                                                onChange={onHandleSearchMeetingCenter} onKeyPress={handleKeyPress} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-3 me-1'>
                                        <Form.Group className="mb-3" controlId="formBasicMCN">
                                            <Form.Label >Meeting Center Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Meeting Center Name" autoComplete='off'
                                                name="meetingCenterName" value={searchInputes.meetingCenterName || ""} maxLength="100" fullWidth
                                                onChange={onHandleSearchMeetingCenter}
                                            //  onKeyPress={handleKeyPress} 

                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-3 me-1'>
                                        <Form.Group className="mb-3" controlId="formBasiCrecName">
                                            <Form.Label >CREC Employee ID</Form.Label>
                                            <Form.Control type="text" placeholder="Enter CREC Employee ID" autoComplete='off'
                                                name="CrecName" value={searchInputes.CrecName || ""} maxLength="25" fullWidth
                                                onChange={onHandleSearchMeetingCenter}
                                                onKeyPress={handleKeyPress}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-3 me-1'>
                                        <Form.Label >Branch Code</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={branchCodeSearch}
                                            onChange={(e) => setBranchCodeSearch(e.target.value)}
                                        >
                                            <option value="">---select---</option>
                                            {branchCodeListArray.map((branchCode, index) =>
                                                <option key={index} value={branchCodeListArraykeys[index]}>{branchCode}</option>
                                            )};
                                        </Form.Select>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center mt-4'>
                                    <Button className='me-3 bg-orenge' variant="contained" onClick={handleSerarchMetingMaster}
                                    >Search</Button>
                                    <Button className='me-3 bg-orenge' variant="contained" onClick={onHandleSearchClear}>Clear</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='border mt-4'>
                    <div className='p-3'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='col-12 d-flex ' >
                                    <div className='col-9'>
                                        <TextField id="outlined-basic" label="Search" variant="outlined" autoComplete='off' className='me-3' value={inputsearchValue}
                                            onChange={(e) => requestSearch(e.target.value)} type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <span className='d-flex justify-content-end items-center'>
                                    {/* <Button className='me-3 bg-orenge' data-bs-toggle="modal" data-bs-target="#AddMeetingMaster" variant="contained">Add</Button> */}
                                    {/* <Button className='me-3 bg-orenge' variant="contained" onClick={onHandleExist}>Exit</Button> */}
                                </span>
                            </div>
                        </div>
                    </div>
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
                                        {search
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell value={row.meetingCenterCode}>{row.meetingCenterCode}</TableCell>
                                                        <TableCell value={row.name}>{row.name}</TableCell>
                                                        <TableCell>{row.mclUrnNo}</TableCell>
                                                        <TableCell>{row.amclUrnNo}</TableCell>
                                                        <TableCell>{row.crecName}</TableCell>
                                                        <TableCell>{row.status}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.areaCode}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.branchCode}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.cityCode}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.updTime} </TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.productCategory}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.repaymentDay}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.repaymentTime}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.repaymentSlot}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.address}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.fosMcRefNO}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.mclCisNO}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.gpsLAT}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.gpsLON}</TableCell>
                                                        <TableCell  >
                                                            <FontAwesomeIcon className='me-3 fs-5 text-orenge cursor-pointer' data-bs-toggle="modal"
                                                                data-bs-target="#ViewMeetingmaster" variant="contained" icon={faEye} onClick={meetingMasterview(row)} />
                                                            <FontAwesomeIcon className='me-3 fs-5 text-orenge cursor-pointer'
                                                                data-bs-toggle="modal" data-bs-target="#EditMeetingmaster" variant="contained"
                                                                onClick={meetingMasterEdit(row)} icon={faPenToSquare} />
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
                                count={search.length}
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
                    </div>
                    <div className='py-3 d-flex justify-content-end'>
                        <Button className='me-3 bg-orenge' variant="contained" onClick={onHandleExist}>Cancel</Button>
                    </div>
                </div>

                <div className="modal fade" id="EditMeetingmaster" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                        <form onSubmit={onHandelEditMeetingCenter}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Meeting Master</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className='row g-3'>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiMCCedit">
                                                <Form.Label >Meeting Center Code</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.meetingCenterCode || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiMCNedit">
                                                <Form.Label >Meeting Center Name</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.name || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>

                                            <Form.Group className="" controlId="formBasicitycodeedit">
                                                <Form.Label >City Code</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.cityCode || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>

                                            <Form.Group className="" controlId="formBasicBranchcodeedit">
                                                <Form.Label >Branch Code</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.branchCode || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiAreacodeedit">
                                                <Form.Label >Area Code</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.areaCode || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiBatchcountedit">
                                                <Form.Label >Batch Count</Form.Label>
                                                <Form.Control type="number"
                                                    defaultValue={editDetails.batchCount} fullWidth disabled readOnly
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Label >MCL URNF</Form.Label>
                                            <Form.Select aria-label="Default select example"
                                                value={editMclUrn || ""}
                                                onChange={handleeditMclUrn}

                                            >
                                                <option value="" hidden>  {editDetails.mclUrnNo || ""}</option>
                                                {search.map((value, Index) =>
                                                    <option key={Index} value={value.mclUrnNo}>{value.mclUrnNo}</option>
                                                )};
                                            </Form.Select>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Label >AMCL URN</Form.Label>
                                            <Form.Select aria-label="Default select example"
                                                value={editAMclUrn || ""}

                                                onChange={handleeditAMclUrn}
                                            >
                                                <option value="" hidden> {editDetails.amclUrnNo || ""}</option>
                                                {search.map((value, Index) =>
                                                    <option key={Index} value={value.amclUrnNo}>{value.amclUrnNo}</option>
                                                )};
                                            </Form.Select>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasicMCLLEADIDedit">
                                                <Form.Label >MCL Lead ID</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.mclLeadID || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiAMCLLEAdIDedit">
                                                <Form.Label >AMCL Lead ID</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.amclLeadID || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>

                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiMCLCISNOedit">
                                                <Form.Label >MCL CIS No.</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.mclCisNO || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>

                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiFOSREFNOedit">
                                                <Form.Label >FOS MC REF No.</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.fosMcRefNO || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>

                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiCRECIDedit">
                                                <Form.Label >CREC Employee ID</Form.Label>
                                                <Form.Control type="text"
                                                    maxLength="25"
                                                    defaultValue={editDetails.crecName || ""}
                                                    fullWidth
                                                    ref={crecRef}
                                                    onChange={(e) => setEditInputesCrec(e.target.value)}
                                                    // value={editInputesCrec || ""}
                                                    onKeyPress={handleKeyPressNumber}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiAdressedit">
                                                <Form.Label >Address</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.address || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>

                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiGPSLATedit">
                                                <Form.Label >GPS LAT</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.gpsLAT || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiGPSLONedit">
                                                <Form.Label >GPS LON</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.gpsLON || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>

                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasirepaymentdayedit">
                                                <Form.Label >Repayment Day</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.repaymentDay || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiRepaymenttimeedit">
                                                <Form.Label >Repayment Time</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.repaymentTime || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Group className="" controlId="formBasiRepaymentSlotedit">
                                                <Form.Label >Repayment Slot</Form.Label>
                                                <Form.Control type="text"
                                                    defaultValue={editDetails.repaymentSlot || ""} fullWidth disabled readOnly
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Label >Status</Form.Label>
                                            <Form.Select aria-label="Default select example"
                                                value={Statusdropdown || ""}
                                                onChange={handleAddStatusSelect}
                                            >
                                                <option value="" hidden>  {editDetails.status || ""}</option>
                                                {statusListArray.map((value, Index) =>
                                                    <option key={Index} value={value}>{value}</option>
                                                )};
                                            </Form.Select>

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn bg-orenge" data-bs-dismiss="modal" onClick={onHandleCloseEditForm}>Close</button>
                                    <button type="Submit" className="btn bg-orenge">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="modal fade" id="ViewMeetingmaster" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">View Meeting Master</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='row g-3'>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="Meeting Center Code" value={viewDetails.meetingCenterCode || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="Name" value={viewDetails.name || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="City Code" value={viewDetails.cityCode || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="Branch Code" value={viewDetails.branchCode || ""} InputProps={{ readOnly: true, }} variant="filled" /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="Area Code" value={viewDetails.areaCode || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="Batch Count" value={viewDetails.batchCount} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="MCL URN No" value={viewDetails.mclUrnNo || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="AMCL URN No" value={viewDetails.amclUrnNo || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="MCL Lead ID" value={viewDetails.mclCisNO || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="FOS MC REF No" value={viewDetails.fosMcRefNO || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="CREC Employee ID" value={viewDetails.crecName || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="Address" value={viewDetails.address || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="GPS LAT" value={viewDetails.gpsLAT || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="GPS LON" value={viewDetails.gpsLON || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="Repaynent Day" value={viewDetails.repaymentDay || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="Repayment Time" value={viewDetails.repaymentTime || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="Repayment Slot" value={viewDetails.repaymentSlot || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField fullWidth id="outlined-basic" label="Status" value={viewDetails.status || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AddMeetingMaster;

