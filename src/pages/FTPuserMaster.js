import * as React from 'react';
import { useState, useEffect, useHistory, useRef } from "react";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchUrl } from '../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import FormHelperText from '@mui/material/FormHelperText';
import Form from 'react-bootstrap/Form';
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';


const baseURL = fetchUrl;
const UserMasterSearchURL = '/searchUser';
const addUserMasterURL = '/saveUser';
const EditUserMaster = '/editUser'
const statusListURL = '/statusList';
const fetchBranchdetailURL = '/fetchBranchdetail';
const fetchRoleURL = '/fetchRole';

const columns = [

    { id: ' User ID', label: ' User ID' },
    { id: 'User Name', label: 'User Name' },
    { id: 'Role', label: 'Role', },
    { id: 'Branch', label: 'Branch' },
    { id: 'Ldap_Flag', label: 'Ldap Flag', },
    { id: 'Active_Flag', label: 'Active Flag', },
    { id: 'Action', label: 'Action', }
];
function FTPuserMaster() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState([]);
    const [addDetails, setAddDetails] = React.useState([]);
    const [editInputes, setEditInputes] = React.useState([]);
    const [searchInputes, setSearchInputs] = React.useState([]);
    const [Roledropdown, setRoledropdown] = React.useState('');
    const [Branchdropdown, setBranchDropdown] = React.useState('');
    const [Disable_Userdropdown, setDisable_Userdropdown] = React.useState();
    const [Ldapdropdown, setLDAPdropdown] = React.useState();
    const [Statusdropdown, setStatusdropdown] = React.useState('');
    const [disableBranch, setdisableBranch] = React.useState(true);
    const [branchlist, setBranchlist] = React.useState([])
    const [rolelist, setROlelist] = React.useState([])
    const [userAddActiveFlag, setUserAddActiveFlag] = React.useState()
    const [edituseActiveFlag, setEdituseActiveFlag] = React.useState()
    const [viewDetails, setViewDetails] = React.useState([]);
    const [editDetails, setEditDetails] = React.useState([]);
    const [addUserClose, setAddUserClose] = React.useState();
    const [editLadap, setEditLadap] = useState('')
    const [editRole, setEditRole] = useState('')
    const [editBranch, setEditBranch] = useState('')
    const [editDisableflag, setEditDisableflag] = useState('')
    const [editStatus, setEditStatus] = useState('')
    const userNameRef = useRef(null)
    const dateEditRef = useRef(null)
    const emailIdRef = useRef(null);
    const mobileEditRef = useRef(null)
    const [editValiddtaeUpto, setEditValiddtaeUpto] = useState('')
    const [validUptoEdit, setValidUptoEdit] = useState('');
    const [viewValidUpto, setViewValidUpto] = useState()


    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    }


    const handleAddRoleSelect = (event) => {
        setRoledropdown(event.target.value);

        if (event.target.value == "20") {
            setdisableBranch(false);
        } else {
            setdisableBranch(true);
        }
    }



    const UserMasterview = (row) => () => {
        setViewDetails(row)
        // if(row.branchCode == null){
        //     row.branchCode = ''
        // }
        const today = new Date(row.validUpTo).toISOString().split('T')[0];
        setViewValidUpto(today)
    }


    const UserMasterEdit = (row) => () => {

        dateEditRef.current.value = row.validUpTo
        userNameRef.current.value = row.userName
        emailIdRef.current.value = row.emailID
        mobileEditRef.current.value = row.mobileNO
        setEditRole('')
        setEditDisableflag('')
        setEditLadap('')
        setEditBranch('')
        setEdituseActiveFlag('')
        setEditValiddtaeUpto('')
        setValidUptoEdit("")

        setEditDetails(row)

        if (row.userRoleId == "20") {
            setdisableBranch(false);
        } else {
            setdisableBranch(true);
        }
    }
    const handleAddBranchSelect = (event) => {
        setBranchDropdown(event.target.value)

    }
    const handleAddLdapSelect = (event) => {
        setLDAPdropdown(event.target.value)
    }



    const handleEditRoleSelect = (event) => {
        setEditRole(event.target.value)
        if (event.target.value == "20") {
            setdisableBranch(false);
        } else {
            setdisableBranch(true);
        }
    }

    const handleEditLdapSelect = (event) => {
        setEditLadap(event.target.value)
    }

    const handleEditBranchSelect = (event) => {
        setEditBranch(event.target.value)
    }

    const handleEditStatusSelect = (event) => {
        setEditStatus(event.target.value)
    }

    const handleEditDisableFlagSelect = (event) => {
        setEditDisableflag(event.target.value)
    }

    const handleAddDisable_userSelect = (event) => {
        setDisable_Userdropdown(event.target.value)
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

    const handleAddInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAddDetails(values => ({ ...values, [name]: value }))
        console.log('addDetails.ValidUpto:', addDetails.ValidUpto);
    }

    const onHandlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSearchInputs(values => ({ ...values, [name]: value }))
    }

    const handleEditInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditInputes(values => ({ ...values, [name]: value }))

    }

    const onHandleSearchUserMaster = async (event) => {

        event.preventDefault();
        const requestOptionssearch = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userId": searchInputes.UserID,
                "username": searchInputes.User_Name,
            }),
        };
        await fetch(baseURL + UserMasterSearchURL, requestOptionssearch)
            .then(response => response.json())
            .then((response) => {
                if (response.length === 0) {
                    alert("No Data Available")
                }
                setSearch(response);
            })
    }
    // useEffect(() => {
    //     const requestOptionsid = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //         }),
    //     };
    //     fetch(baseURL + statusListURL, requestOptionsid)
    //         .then(response => response.json())
    //         .then((response) => {
    //             setstatusList(response)
    //             handleClose()
    //         })
    // }, []);

    // const statusListArray = Object.values(statusList);

    const onHandelAddUserMaster = async (event) => {
        event.preventDefault();

        // search.forEach((value, index) => {
        //     if (value.userId == addDetails.UserID) {
        //         alert("User Already Exist")
        //     }
        //     return;
        // }
        // )

        if (addDetails.UserID === "" || addDetails.UserID === null || addDetails.UserID === undefined) {
            event.preventDefault();
            alert("Please Enter User ID ")
            return;
        }
        if (addDetails.UserName == "" || addDetails.UserName == null || addDetails.UserName == undefined) {
            event.preventDefault();
            alert("Please Enter User Name ")
            return;
        }
        if (addDetails.EmailID == "" || addDetails.EmailID == null || addDetails.EmailID == undefined) {
            event.preventDefault();
            alert("Please Enter Email ID ")
            return;
        }
        if (addDetails.MobileNo == "" || addDetails.MobileNo == null || addDetails.MobileNo == undefined) {
            event.preventDefault();
            alert("Please Enter Mobile No ")
            return;
        }
        if (addDetails.EmployeeNo == "" || addDetails.EmployeeNo == null || addDetails.EmployeeNo == undefined) {
            event.preventDefault();
            alert("Please Enter Employee No ")
            return;
        }
        if (addDetails.ValidUpto == "" || addDetails.ValidUpto == null || addDetails.ValidUpto == undefined) {
            event.preventDefault();
            alert("Please Enter Date ")
            return;
        }
        if (Roledropdown == "" || Roledropdown == null || Roledropdown == undefined) {
            event.preventDefault();
            alert("Please Enter Role ")
            return;
        }
        if (disableBranch == false) {
            if (Branchdropdown == "" || Branchdropdown == null || Branchdropdown == undefined) {
                event.preventDefault();
                alert("Please Enter Branch  ")
                return;
            }
        }

        // if (Disable_Userdropdown == "" || Disable_Userdropdown == null || Disable_Userdropdown == undefined) {
        //     event.preventDefault();
        //     alert("Please EnterDisable User ")
        //     return;
        // }dgh
        // if (Ldapdropdown == "" || Ldapdropdown == null || Ldapdropdown == undefined) {
        //     event.preventDefault();
        //     alert("Please Enter Ldap ")
        //     return;
        // }
        if (userAddActiveFlag == "" || userAddActiveFlag == null || userAddActiveFlag == undefined) {
            event.preventDefault();
            alert("Please Enter ActiveFalg ")
            return;
        }

        if (Ldapdropdown == undefined) {
            var Ldapdropdowndata = "N"
        }
        if (Disable_Userdropdown == undefined) {
            var Disable_Userdropdowndata = "N"
        }
        const handleKeyPress = (event) => {
            if (event.key === " ") {
                event.preventDefault();
            }
        }
        const requestOptionsadd = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                "userId": addDetails.UserID,
                "username": addDetails.UserName,
                "mobileNO": addDetails.MobileNo,
                "emailID": addDetails.EmailID,
                // "status": Statusdropdown,
                "employeeNO": addDetails.EmployeeNo,
                "validUpTo": addDetails.ValidUpto,
                "userDisableFlag": Disable_Userdropdown || Disable_Userdropdowndata,
                "userLDAPFlag": Ldapdropdown || Ldapdropdowndata,
                // "groupId": "appAdmin",
                // "userLoginFailCount": 0,
                "userActiveFlag": userAddActiveFlag,
                "roleID": Roledropdown

            }),
        };
        await fetch(baseURL + addUserMasterURL, requestOptionsadd)
            .then(response => response.json())
            .then((response) => {
                alert(response.Success);
                // setAddDetails("");
                setEditLadap('')
                setBranchDropdown("");
                setDisable_Userdropdown("");
                setLDAPdropdown("");
                setRoledropdown("");
                setStatusdropdown("");
            })
    }

    const onHandelEditUserMaster = async (event) => {
        event.preventDefault();

        if (userNameRef.current.value === "") {
            alert("Please Enter User Name")
            // handleClose();
            return;
        }
        if (mobileEditRef.current.value === "") {
            alert("Please Enter Mobile No")
            // handleClose();
            return;
        }
        if (emailIdRef.current.value === "") {
            alert("Please Enter Email Address")
            // handleClose();
            return;
        }


        if ((userNameRef.current.value === "" || userNameRef.current.value == editDetails.userName) &&
            (mobileEditRef.current.value === "" || mobileEditRef.current.value == editDetails.mobileNO) &&
            (emailIdRef.current.value === "" || emailIdRef.current.value == editDetails.emailID) &&
            (editDetails.validUpTo === "" || dateEditRef.current.value == editDetails.validUpTo) &&
            (editDisableflag === "" || editDisableflag == editDetails.userDisableFlag) &&
            (editRole === "" || editRole == editDetails.userRoleId) &&
            (editBranch === "" || editBranch == editDetails.branchCode) &&
            (editLadap === "" || editLadap == editDetails.userLDAPFlag) &&
            (edituseActiveFlag === "" || edituseActiveFlag == editDetails.userActiveFlag)
        ) {
            alert("Without Changes Use Details UpDated")
            handleClose();
            return;
        }

        const userName = userNameRef.current.value || editDetails.userName;
        const mobileNo = mobileEditRef.current.value || editDetails.mobileNO;
        const emailID = emailIdRef.current.value || editDetails.emailID;
        const validUpTo = editDetails.validUpTo || dateEditRef.current.value;
        // const status = editStatus || editDetails.status;
        const userDisableFlag = editDisableflag || editDetails.userDisableFlag;
        let role = editRole || editDetails.userRoleId;
        let branch = editBranch || editDetails.branchCode;
        const userLDAPFlag = editLadap || editDetails.userLDAPFlag;
        const userActiveFlag = edituseActiveFlag || editDetails.userActiveFlag;

        if (role != "20") {
            branch = ''
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: editDetails.userId,
                username: userName,
                mobileNO: mobileNo,
                emailID: emailID,
                // status: status,
                employeeNO: editDetails.employeeNO,
                validUpTo: validUpTo,
                userDisableFlag: userDisableFlag,
                userLDAPFlag: userLDAPFlag,
                roleID: role,
                branchCode: branch,
                userActiveFlag: userActiveFlag,
            }),
        };

        try {
            const response = await fetch(baseURL + EditUserMaster, requestOptions);
            const json = await response.json();

            // Check if the response was successful
            if (json.Success) {
                alert(json.Success);
                // Reset the form inputs and close the form
                setEditDisableflag('');
                setEditRole('');
                setEditBranch('');
                setEditStatus('');
                setEditInputes({});
                handleClose();
                setAddUserClose(false)
                window.location.reload();

            } else {
                throw new Error(json.Error);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while editing the user');
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === " ") {
            event.preventDefault();
        }
    }

    const handleOnlyNumber = (event) => {
        const name = event.target.name;
        const value = event.target.value.replace(/\D/g, '');
        setAddDetails(values => ({ ...values, [name]: value }))

    }
    useEffect(() => {

        const requestOptionsedit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

            }),
        };
        fetch(baseURL + fetchBranchdetailURL, requestOptionsedit)
            .then(response => response.json())
            .then((response) => {
                setBranchlist(response);
            })

    }, [])
    const BranchvalueList = Object.values(branchlist);
    const BranchKeysList = Object.keys(branchlist);

    useEffect(() => {
        const requestOptionsedit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

            }),
        };
        fetch(baseURL + fetchRoleURL, requestOptionsedit)
            .then(response => response.json())
            .then((response) => {
                setROlelist(response);

            })
            .catch(error => {
                // console.error(`An error occurred`);
                alert(`Server not available.`);
            });
    }, []);
    const RoleLvalueist = Object.values(rolelist);
    const RoleLkeyslist = Object.keys(rolelist);

    const onHandleSearchClear = () => {
        setSearchInputs('')
        setSearch([])
    }
    const onHandleREditvalidUpto = () => {
        setValidUptoEdit('')
    }

    const onHandleAddUsermater = () => {
        setEditLadap('')
        setBranchDropdown("");
        setDisable_Userdropdown("");
        setLDAPdropdown("");
        setRoledropdown("");
        setStatusdropdown("");
        setAddDetails('')
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <>
            <div className='usermaster mt-5'>
                <div className='searchBox mt-4'>
                    <div className="card">
                        <div className="card-header">User Master </div>
                        <form onSubmit={onHandleSearchUserMaster}>
                            <div className="card-body py-4">
                                <div className='row'>
                                    <div className='col-5'>
                                        <TextField fullWidth id="outlined-basic" label=" User ID" variant="outlined"
                                            name='UserID'
                                            value={searchInputes.UserID || ""}
                                            onChange={onHandlechange}
                                            onKeyPress={handleKeyPress}
                                            inputProps={{ maxLength: 20 }}
                                        />
                                    </div>
                                    <div className='col-5'>
                                        <TextField fullWidth id="outlined-basic" label="User Name" variant="outlined"
                                            name='User_Name'
                                            value={searchInputes.User_Name || ""}
                                            onChange={onHandlechange}
                                            // onKeyPress={handleKeyPress}
                                            inputProps={{ maxLength: 40 }}
                                        />
                                    </div>
                                    <div className='col-2 d-flex align-item-center p-1'>
                                        <Button className='bg-orenge ms-3' variant="contained" type="submit"
                                        >Search</Button>
                                        <Button className='ms-3 bg-orenge' variant="contained" onClick={onHandleSearchClear}>Clear</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='TableDiv '>
                <div className='border mt-4'>
                    <div>
                        <span className='d-flex justify-content-end items-center p-1'>
                            <Button className='ms-3 bg-orenge' data-bs-toggle="modal" data-bs-target="#AddUserMaster" variant="contained" onClick={onHandleAddUsermater}>Add</Button>
                            <Button className='ms-3 bg-orenge' variant="contained" onClick={onhandlecancel}>Exit</Button>
                        </span>
                        <div className='col-12'>
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
                                            {search
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                            <TableCell >{row.userId}</TableCell>
                                                            <TableCell >{row.userName}</TableCell>
                                                            <TableCell >{row.userRoleId}</TableCell>
                                                            <TableCell >{row.branchCode}</TableCell>
                                                            <TableCell >{row.userLDAPFlag}</TableCell>
                                                            <TableCell >{row.userActiveFlag}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.emailID}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.mobileNO}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.employeeNO}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.validUpTo}</TableCell>                                                            <TableCell sx={{ display: "none" }}>{row.employeeNO}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.GroupAccess}</TableCell>                                                            <TableCell sx={{ display: "none" }}>{row.Roledropdown}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.Disable_Userdropdown}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.Statusdropdown}</TableCell>
                                                            <TableCell  >
                                                                <FontAwesomeIcon className='me-3 fs-5 text-orenge cursor-pointer' data-bs-toggle="modal"
                                                                    data-bs-target="#ViewMeetingmaster" variant="contained" icon={faEye}
                                                                    onClick={UserMasterview(row)}
                                                                />
                                                                <FontAwesomeIcon className='me-3 fs-5 text-orenge cursor-pointer'
                                                                    data-bs-toggle="modal" data-bs-target="#EditMeetingmaster" variant="contained"
                                                                    onClick={UserMasterEdit(row)}
                                                                    icon={faPenToSquare} />
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
                                <Backdrop
                                    sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open={open}
                                    onClick={handleClose}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" id="AddUserMaster" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add User Master</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={onHandelAddUserMaster} >
                            <div className="modal-body">
                                <div className='row g-3'>
                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasiuserIdAdd">
                                            <Form.Label >User ID</Form.Label>
                                            <Form.Control type="text" autoComplete='off' name="UserID"
                                                fullWidth value={addDetails.UserID || ""} onChange={handleAddInputs} onKeyPress={handleKeyPress}
                                                maxLength="20"
                                            />
                                        </Form.Group>

                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasiuserNameAdd">
                                            <Form.Label >User Name</Form.Label>
                                            <Form.Control type="text" autoComplete='off' name="UserName"
                                                fullWidth value={addDetails.UserName || ""} onChange={handleAddInputs}
                                                // onKeyPress={handleKeyPress} 
                                                maxLength="40"
                                            />
                                        </Form.Group>

                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasiEmailIdAdd">
                                            <Form.Label >Email ID</Form.Label>
                                            <Form.Control type="text" autoComplete='off' name="EmailID"
                                                fullWidth value={addDetails.EmailID || ""} onChange={handleAddInputs} onKeyPress={handleKeyPress} maxLength="225"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasiEmailIdAdd">
                                            <Form.Label >Mobile No</Form.Label>
                                            <Form.Control type="text" autoComplete='off' name="MobileNo"
                                                fullWidth value={addDetails.MobileNo || ""} onChange={handleOnlyNumber} onKeyPress={handleKeyPress} maxLength="19"
                                            />
                                        </Form.Group>

                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasiMobileNoAdd">
                                            <Form.Label >Employee No</Form.Label>
                                            <Form.Control type="text" autoComplete='off' name="EmployeeNo"
                                                fullWidth value={addDetails.EmployeeNo || ""} onChange={handleAddInputs} onKeyPress={handleKeyPress} maxLength="20"
                                            />
                                        </Form.Group>

                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasicvalidupToAdd">
                                            <Form.Label>Valid Up to</Form.Label>
                                            <Form.Control
                                                type="date"
                                                autoComplete='off'
                                                name="ValidUpto"
                                                fullWidth
                                                value={addDetails.ValidUpto || ""}
                                                onChange={handleAddInputs}
                                                min={today.toISOString().split('T')[0]}
                                            />
                                        </Form.Group>

                                    </div>
                                    <div className='col-6'>
                                        <Form.Label >Role</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={Roledropdown || ""}
                                            onChange={handleAddRoleSelect} fullWidth
                                        >
                                            <option value="">---Select---</option>
                                            {RoleLkeyslist.map((value, Index) =>
                                                <option key={Index} value={value}>{RoleLvalueist[Index]}</option>
                                            )};
                                        </Form.Select>

                                    </div>
                                    <div className='col-6'>
                                        <Form.Label >Branch</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={Branchdropdown || ""}
                                            onChange={handleAddBranchSelect}
                                            disabled={disableBranch ? true : false}
                                            fullWidth
                                        >
                                            <option value="">---Select---</option>
                                            {BranchKeysList.map((value, Index) =>
                                                <option key={Index} value={value}>{BranchvalueList[Index]}</option>
                                            )};
                                        </Form.Select>
                                    </div>
                                    <div className='col-6'>

                                        <Form.Label >Disable Flag</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={Disable_Userdropdown || ""}
                                            onChange={handleAddDisable_userSelect}
                                            fullWidth
                                        >
                                            <option value="N">N</option>
                                            <option value="Y" >Y</option>
                                        </Form.Select>

                                    </div>
                                    <div className='col-6'>
                                        <Form.Label >LDAP Flag</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={Ldapdropdown || ""}
                                            onChange={handleAddLdapSelect}
                                            fullWidth
                                        >
                                            <option value="N">N</option>
                                            <option value="Y" >Y</option>
                                        </Form.Select>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Label >Active Flag</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={userAddActiveFlag || ""}
                                            onChange={(e) => setUserAddActiveFlag(e.target.value)}
                                            fullWidth
                                        >
                                            <option value="" >---Select--</option>
                                            <option value="Y" >Y</option>
                                            <option value="N">N</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" >Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="EditMeetingmaster" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <form
                        onSubmit={onHandelEditUserMaster}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit User Master</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='row g-3'>
                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasicUserIdEdit">
                                            <Form.Label >User ID</Form.Label>
                                            <Form.Control type="text" autoComplete='off' disabled readOnly
                                                fullWidth value={editDetails.userId || ""}
                                            />
                                        </Form.Group>

                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasiusernameEdit">
                                            <Form.Label >User Name</Form.Label>
                                            <Form.Control type="text" autoComplete='off'
                                                fullWidth defaultValue={editDetails.userName || ""}
                                                name="User_Name" maxLength="40"
                                                ref={userNameRef}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasiEmailIdEdit">
                                            <Form.Label >Email Id</Form.Label>
                                            <Form.Control type="text" autoComplete='off'
                                                fullWidth defaultValue={editDetails.emailID || ""}
                                                name="Email_ID"
                                                onKeyPress={handleKeyPress}
                                                ref={emailIdRef}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasiMobileEdit">
                                            <Form.Label >Mobile No</Form.Label>
                                            <Form.Control type="text" autoComplete='off'
                                                fullWidth defaultValue={editDetails.mobileNO || ""}
                                                name="Mobile_No" onKeyPress={handleKeyPress} maxLength="19"
                                                ref={mobileEditRef}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className="" controlId="formBasicEmpolyeeEdit">
                                            <Form.Label >Employee NO</Form.Label>
                                            <Form.Control type="text" autoComplete='off'
                                                fullWidth
                                                value={editDetails.employeeNO || ""} disabled readOnly
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-6'>

                                        <div className="dateFormat">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DemoItem label="Valid Upto" >
                                                        <DatePicker
                                                            value={dayjs(editDetails.validUpTo)}
                                                            onChange={(newValue) => setEditDetails({ ...editDetails, validUpTo: newValue.format() })}
                                                            ref={dateEditRef}
                                                            minDate={dayjs().startOf('day')}
                                                        />
                                                    </DemoItem>
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Label >Role</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={editRole || ""}
                                            onChange={handleEditRoleSelect}
                                            fullWidth
                                        >
                                            <option value="" hidden>{editDetails.userRoleId || ""}</option>
                                            {RoleLkeyslist.map((value, index) => {
                                                return (
                                                    <option key={index} value={value}>
                                                        {RoleLvalueist[index]}
                                                    </option>
                                                )
                                            })}
                                        </Form.Select>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Label >Disable Flag</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={editDisableflag || ""}
                                            onChange={handleEditDisableFlagSelect}
                                            fullWidth
                                        >
                                            <option value='' hidden>{editDetails.userDisableFlag || ""}</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </Form.Select>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Label >Ldap Flag</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={editLadap || ""}
                                            onChange={handleEditLdapSelect}
                                            fullWidth
                                        >
                                            <option value='' hidden>{editDetails.userLDAPFlag || ""}</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </Form.Select>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Label >Branch</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={editBranch || ""}
                                            onChange={handleEditBranchSelect}
                                            fullWidth
                                            disabled={disableBranch ? true : false}
                                        >
                                            <option value='' hidden>{editDetails.branchCode || ""}</option>
                                            {BranchKeysList.map((value, index) => {
                                                return (
                                                    <option key={index} value={value}>
                                                        {BranchvalueList[index]}
                                                    </option>
                                                )
                                            })}
                                        </Form.Select>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Label >Active Flag</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={edituseActiveFlag || ""}
                                            onChange={(e) => setEdituseActiveFlag(e.target.value)}
                                            fullWidth
                                        >
                                            <option value='' hidden>{editDetails.userActiveFlag || ""}</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn bg-orenge" data-bs-dismiss="modal"
                                // onClick={onHandleREditvalidUpto}
                                >Close</button>
                                <button type="Submit" className="btn bg-orenge" >Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal fade" id="ViewMeetingmaster" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">View User Master</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row g-3'>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="UserID" value={viewDetails.userId || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="User Name" value={viewDetails.userName || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Email ID" value={viewDetails.emailID || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Mobile No" value={viewDetails.mobileNO || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Employee No" value={viewDetails.employeeNO || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Valid Upto" value={viewValidUpto || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Role" value={viewDetails.userRoleId || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Disable Flag" value={viewDetails.userDisableFlag || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Ldap Flag" value={viewDetails.userLDAPFlag || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Branch" value={viewDetails.branchCode || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Active Flag" value={viewDetails.userActiveFlag || ""} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FTPuserMaster;