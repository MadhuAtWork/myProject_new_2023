import React, { useEffect } from 'react';
import TableNew from '../Components/Table';
import ApplicationTab from '../Components/ApplicationTab';
import OpportunityTab from '../Components/OpportunityTab';
import CoBorrowerTab from '../Components/CoBorrowerTab';
import DbKit from '../Components/DbKit';
import KycTab from '../Components/KycTab';
import PrimaryBorrowerTab from '../Components/PrimaryBorrowerTab';
import EarningMember from '../Components/EarningMember'
import EarningMember2 from '../Components/EarningMember2'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import { useState, useContext } from "react";
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { CommentsDisabledOutlined, LinkOffRounded, SetMealRounded } from '@mui/icons-material';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { fetchUrl } from '../Config';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from './Menu';
// import DbKit from './DbKit'
import NativeSelect from '@mui/material/NativeSelect';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { Document, Page } from 'react-pdf';
import UpLoadFile from "../UpLoadfile/UpLoadFile"
import RemarksOpptunitiesDelete from '../Components/RemarkOpptunitiesDelete';
import HistoryAppDetails from '../Components/HistoryAppDetails';
// import Image from 'react-image';
// import * as pdfjs from 'pdfjs-dist';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

const BaseURL = fetchUrl;
const applicationDetails = '/applicationDetails';
const fetchLeadLvlDtl = '/fetchLeadLvlDtl';
const completeTask = '/completeTask';
const editOpportunities = '/editOpportunities';
const editUrnNo = '/editUrnNo';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const LeadDetailscolumns = [
  { id: 'Sr', label: 'Sr. No', },
  { id: 'Product_code', label: 'Product Code', },
  { id: 'Loan_Account_No', label: 'Loan Account No.', },
  { id: 'URN', label: 'URN', },
  { id: 'Opportunity_Status', label: 'Opportunity Status', },
  { id: 'Credit_Bureau_Status', label: 'Credit Bureau Status', },
  { id: 'Client_Name', label: 'Client Name', },
  { id: 'Loan_Amount', label: 'Loan Amount', },
  { id: 'Action', label: 'Action', },
];

const dedupeTable = [
  { id: 'Perfect_match', label: 'Perfect Match' },
  { id: 'Match_urn', label: 'Match URN' },
  { id: 'Match_rule', label: 'Match Rule' },
  { id: 'Match_scale', label: 'Match Scale' },
  { id: 'match_Reason', label: 'Match Reason' },
];
function ApplicationDetails(props) {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [applicationDetail, setApplicationDetail] = useState([]);
  const [disabled, setdisabled] = React.useState(false);
  const [leadRecord, setLeadRecord] = React.useState('');
  const [historyData, setHistoryData] = React.useState([]);
  const [action, setAction] = React.useState('');
  const [taskId, setTaskId] = React.useState('');
  const Navigate = useNavigate();
  const location = useLocation();
  const [disabledAmlSelectBox, setdisabledAmlSelectBox] = React.useState(false);
  const [disabledDedupeSelectBox, setdisabledDedupeSelectBox] = React.useState(true);
  const [disabledCBSelectBox, setdisabledCBSelectBox] = React.useState(false);
  const [disabledDedupeDropdown, setDisabledDedupeDropdown] = React.useState(false);
  const [disabledFSEDropdown, setDisabledFSEDropdown] = React.useState(false);


  const [fSEDropDownstatus, setFSEDropDownstatus] = useState('')
  const [pcAMLStatus, setpcAMLStatus] = React.useState('');
  const [pcCbStatus, setpcCbStatus] = React.useState('');
  const [pcDedupeStatus, setpcDedupeStatus] = React.useState('');
  const [scCbStatus, setscCbStatus] = React.useState('');
  const [scAMLStatus, setscAMLStatus] = React.useState('');
  const [scDedupeStatus, setscDedupeStatus] = React.useState('');
  const [leadIdRecord, setleadIdRecord] = React.useState([]);
  const [taskIdRecord, settaskIdRecord] = React.useState([]);
  const [actionDropdown, setactionDropdown] = React.useState(true);
  const [language, setLanguage] = React.useState('');
  const [fileSelect, setfileSelect] = React.useState('N');
  const [pcdedupeObject, setpcdedupeObject] = React.useState([]);
  const [scdedupeObject, setscdedupeObject] = React.useState([]);
  const [remaksOpportunities, setRemaksOpportunities] = React.useState();
  const [remaksOpportunity, setRemaksOpportunity] = React.useState(null);
  const context = useContext(MyContext);
  const [selectedValuepc, setSelectedValuepc] = React.useState();
  const [selectedValuesc, setSelectedValuesc] = React.useState();
  const [imagePreview, setImagePreview] = useState("");
  const [fileData, setFileData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [DbKitdownload, setDbKitdownload] = useState(false)
  const [uploadfile, setUploadfile] = useState(false)
  const [disabledDocumnetTab, setDisabledDocumnetTab] = useState(true);
  const [upLoadUrl, setUpLoadUrl] = useState(null)
  const [applicationSubmit, setApplicationSubmit] = useState(true);
  const [disabledDedupeDropdownSelect, setDisabledDedupeDropdownSelect] = useState(true);
  const [uRN, SetURN] = useState()
  const [leadDataView, setLeadDataView] = useState(false)
  const [actionDropdownSendBackBranch, setactionDropdownSendBackBranch] = useState(false)
  const [actionDropdownSendCpc, setactionDropdownSendCpc] = useState(false)
  const [proccedFurther, setProccedFurther] = useState(true)
  const [urnOpputnities, setUrnOpputnities] = useState('')

  const [deleteButton, setDeleteButton] = useState(false)

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null)
  const [viewButtonDisable, setViewButtonDisable] = useState(true)
  const [KycviewButtonDisable, setKycViewButtonDisable] = useState(false)
  const [loanData, setLoanData] = useState('')

  console.log(loanData)


  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  }
  const items = JSON.parse(localStorage.getItem('items'));
  const F1 = items.f1;
  const ApplicationNo = items.ApplicationNo;
  const myTaskDetails = items.myTask;
  // const urn = items.urn;

  const onhandleDeleteOpptunitiesCahnge = (urn) => (e) => {
    setUrnOpputnities(urn)
  }

  React.useEffect(() => {
    // if (myTaskDetails == "Lead Data Approval") {
    //   setactionDropdown(false)
    // }

    if (myTaskDetails === "Lead Data Approval") {
      setactionDropdownSendBackBranch(true)
      setactionDropdown(false)
      setactionDropdownSendCpc(false)
      setDeleteButton(true)

    } else if (myTaskDetails === "Sent Back To Branch") {
      setactionDropdownSendBackBranch(false)
      setactionDropdown(false)
      setactionDropdownSendCpc(true)
      setProccedFurther(false)
    }
    applicationDetailsChange()

  }, []);

  // React.useEffect(() => {
  const applicationDetailsChange = async () => {

    handleToggle()
    const requestApplicationDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "f1": F1
      }),
    };

    await fetch(BaseURL + applicationDetails, requestApplicationDetails)
      .then(response => response.json())
      .then((response) => {
        if (response.length === 0) {
          alert("No Data Avaialble")
        }
        setApplicationDetail(response)
        handleClose()
      })
  }

  // }, []);

  const onhandletabsCahnge = (batchNo, leadId, taskId, urn) => async (e) => {
    handleToggle()
    e.preventDefault();
    setFile('')
    setRemaksOpportunity('')
    setpcAMLStatus('')
    setpcDedupeStatus('')
    setpcCbStatus('')
    setscAMLStatus('')
    setscDedupeStatus('')
    setscCbStatus('')
    setFSEDropDownstatus('')

    setTaskId(taskId)
    setleadIdRecord(leadId)
    settaskIdRecord(taskId)
    SetURN(urn)
    const requestleadRecords = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "batchNo": batchNo,
        "leadId": leadId
      }),
    };
    fetch(BaseURL + fetchLeadLvlDtl, requestleadRecords)
      .then(response => response.json())
      .then((response) => {

        console.log(response)
        const pcDedupe = response.pcDedupeStatus || "";
        const scDedupe = response.scDedupeStatus || "";

        const editImgdutton = response.docUploadFlag || ""

        // if (editImgdutton == "") {
        //   setLeadDataView(false)
        // } else {
        //   setLeadDataView(true)

        // } 

        if (myTaskDetails === "DB KIT Generation") {
          setDbKitdownload(true)
          setUploadfile(false)
          setDisabledDocumnetTab(false)
          setLeadDataView(false)

        } else if (myTaskDetails === "Sent Back To Branch") {
          setDbKitdownload(false)
          setUploadfile(true)
          setDisabledDocumnetTab(false)
          setLeadDataView(false)

        } else if (myTaskDetails === "Lead Data Approval" && editImgdutton === "Y") {
          setDisabledDocumnetTab(false)
          setLeadDataView(true)
          setDbKitdownload(false)
          setUploadfile(false)

        } else {
          setDbKitdownload(false)
          setUploadfile(false)
          setDisabledDocumnetTab(true)
          setLeadDataView(false)
        }

        if (myTaskDetails == "Dedupe Check Manual Task" && (pcDedupe === "Duplicate" || scDedupe === "Duplicate")) {
          setdisabledDedupeSelectBox(false)
        } else {
          setdisabledDedupeSelectBox(true)
        }

        if (response.length === 0) {
          alert("No data Available")
        } else {
          setdisabled(true)
          setApplicationSubmit(false)

        }
        setLeadRecord(response)
        setHistoryData(response.auditTrail)
        if (response.pcdedupeObject == null || response.pcdedupeObject === "" || response.pcdedupeObject === undefined) {
          setpcdedupeObject([])
        } else {
          setpcdedupeObject(response.pcdedupeObject)
        }

        if (response.scdedupeObject == null || response.scdedupeObject === "" || response.scdedupeObject === undefined) {
          setscdedupeObject([])
        } else {
          setscdedupeObject(response.scdedupeObject)
        }

        handleClose()
      })


    if (myTaskDetails === "AML Check Manual Task") {
      setdisabledAmlSelectBox(true)
    }
    if (myTaskDetails === "CB Check Manual Task") {
      setdisabledCBSelectBox(true)
    }
    if (myTaskDetails === "Dedupe Check Manual Task") {
      setDisabledDedupeDropdown(true)
    }
    if (myTaskDetails === "FSE Manual Check") {
      setDisabledFSEDropdown(true)
    }

  }

  const onHandleOppurtunitiesTab = () => {
    applicationDetailsChange()


  }
  const handleSubmit = (taskID, actionValue) => async (e) => {
    handleToggle()
    e.preventDefault();

    if (action == "" || action == null || action == undefined) {
      alert("Please Select Action")
      handleClose();
      return
    }


    let flag = true;
    let showAlert = true;
    // AML Check Manual Task Amcl Status

    applicationDetail.forEach((value, index) => {

      if (myTaskDetails === "AML Check Manual Task" && actionValue === 1) {
        if ((value.scAMLStatus === "" && value.pcAMLStatus === "") || (value.scAMLStatus === "Match" && value.pcAMLStatus === "Match")) {
          handleClose();
          flag = false;
          if (showAlert) {
            alert('please Update AML Status' + "......." + value.urn);
            showAlert = false;
          }
          return;
        }
      }
    });

    if (!flag) {
      return;
    }


    applicationDetail.forEach((value, index) => {
      if (myTaskDetails === "Dedupe Check Manual Task" && actionValue === 1) {
        if ((value.pcDedupeStatus === "" && value.scDedupeStatus === "") || (value.pcDedupeStatus === "Duplicate" && value.scDedupeStatus === "Duplicate")) {
          handleClose();
          flag = false;
          if (showAlert) {
            alert('please Update Dedupe Status' + "......." + value.urn);
            showAlert = false;
          }
          return;
        }
      }
    });
    if (!flag) {
      return;
    }


    const requestleadRecords = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "executorID": menu.username,
        "taskID": taskID,
        "actionValue": actionValue,
        "remarks": remaksOpportunities

      }),
    };
    fetch(BaseURL + completeTask, requestleadRecords)
      .then(response => response.json())
      .then((response) => {
        if (response.length === 0) {
          alert("No Data Avaialble")
        }
        console.log(response)

        alert(response.errorMsg)
        Navigate('/index/MyTask', { state: menu });
        window.location.reload();
        handleClose()
      })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeDropdown = (event) => {
    setAction(event.target.value);
    setLanguage(event.target.value);
  };

  // const formData = new FormData();
  // formData.append('file', file);


  const handleSave = (e) => {
    console.log(remaksOpportunity)
    handleToggle()
    e.preventDefault();

    // if (file) {
    //   var reader = new FileReader();
    //   reader.onloadend = function () {
    //     setUpLoadUrl(reader.result)
    //   }
    //   reader.readAsDataURL(file);
    // }

    // if(upLoadUrl == null && pcCbStatus == null && scCbStatus == null && pcAMLStatus == null &&
    //   scAMLStatus == null && pcDedupeStatus == null && scDedupeStatus == null && fileName == null &&  remaksOpportunity == null ){
    //     alert("Update witout changes")
    //     handleClose()
    //     return
    //   } 

    setdisabled(true);

    const requesteditOpportunities = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "taskName": myTaskDetails,
        "leadId": leadIdRecord,
        "taskId": taskIdRecord,
        "pcCbStatus": pcCbStatus,
        "scCbStatus": scCbStatus,
        "pcAMLStatus": pcAMLStatus,
        "scAMLStatus": scAMLStatus,
        "pcDedupeStatus": pcDedupeStatus,
        "scDedupeStatus": scDedupeStatus,
        "documentName": fileName,
        "dataContent": upLoadUrl,
        "docUploadFlag": fileSelect,
        "urn": leadRecord.urn,
        "status": fSEDropDownstatus,
        "remarks": remaksOpportunity
      }),

    };
    fetch(BaseURL + editOpportunities, requesteditOpportunities)
      .then(response => response.json())
      .then((response) => {
        alert(response.Success)
        console.log(response)
        handleClose()

        // window.location.reload();
      })
  };

  const handleChangeDropdownpcAmlStatus = (event) => {
    setpcAMLStatus(event.target.value);

  };
  const handleChangeDropdownpcDedupeStatus = (event) => {
    setpcDedupeStatus(event.target.value);
  };

  const handleChangeDropdownpcCbStatus = (event) => {
    setpcCbStatus(event.target.value);
  };

  const handleChangeDropdownscAmlStatus = (event) => {
    setscAMLStatus(event.target.value);
  };

  const handleChangeDropdownscDedupeStatus = (event) => {
    setscDedupeStatus(event.target.value);
  };

  const handleChangeDropdownscCbStatus = (event) => {
    setscCbStatus(event.target.value);
  };

  const onHandelNewTab = (imgUrl) => (e) => {
    window.open(
      imgUrl
    )
  };

  const menu = location.state;

  const onHandleApplicationCancel = () => {
    Navigate('/index/MyTask', { state: menu });
  }

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();

  };

  const changeHandler = (event) => {
    const fileinfo = event.target.files[0]
    const fileExtension = fileinfo.name.split('.').pop();
    if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
      setFile(fileinfo);
      setFileName(fileinfo.name)
    } else {
      // setFile("File not Support");
      alert("File format not supported")

    }
    // setFile(event.target.files[0]);
    setfileSelect("Y");

    if (fileinfo) {
      var reader = new FileReader();
      reader.onloadend = function () {
        setUpLoadUrl(reader.result)
      }
      reader.readAsDataURL(fileinfo);
    }
  };

  const onhandledeletefdile = () => {
    setFile(null)
    setfileSelect("N");
  }

  const handleChangeRediopc = (data) => (event) => {
    setSelectedValuepc(data);
  };
  const handleChangeRediosc = (matchURN) => (event) => {
    setSelectedValuesc(matchURN);
  };

  const onHandelPCdedupeMarge = (e) => {
    handleToggle()
    e.preventDefault();
    const requestmargeUrn = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "leadId": leadIdRecord,
        "urn": leadRecord.urn,
        "targetUrn": selectedValuepc,
        "borrowerType": "P"
      })

    }
    fetch(BaseURL + editUrnNo, requestmargeUrn)
      .then(response => response.json())
      .then((response) => {
        alert(response.Success)
        setSelectedValuepc("")
        handleClose()
      })
  }

  const onHandelSCdedupeMarge = (e) => {
    handleToggle()
    e.preventDefault();
    const requestmargeUrn = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "leadId": leadIdRecord,
        "urn": leadRecord.scurn,
        "targetUrn": selectedValuesc,
        "borrowerType": "S"
      })

    }
    fetch(BaseURL + editUrnNo, requestmargeUrn)
      .then(response => response.json())
      .then((response) => {
        alert(response.Success)
        handleClose()
      })
  }

  const handlePreview = () => {
    const fileExtension = file.name.split('.').pop();
    // if (fileExtension === 'pdf') {
    //   setFileData('Please Select jpg , jpeg and png file')
    //   alert('Please Select jpg , jpeg and png file')
    // } else
    if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
      setFileData(URL.createObjectURL(file))
    } else {
      setFileData("File format not supported")
    }
  };

  const onHandleViewDocBtn = () => {
    if (
      myTaskDetails === "Sanction Manual Task" ||
      myTaskDetails === "CASA ACC creation" ||
      myTaskDetails === "Loan Acc Creation" ||
      myTaskDetails === "Cust Acc Creation" ||
      myTaskDetails === "DB KIT Generation" ||
      myTaskDetails === "Disbursement Task"
    ) {
      setKycViewButtonDisable(true)
    }
  }

  const ondataLoanAmount = (data) => {
    setLoanData(data)
  }

  return (
    <>
      <div className="card mt-4">
        <div className="card-header  bg-orenge py-2">
          Application No ( {ApplicationNo} ) ,URN ({uRN})
        </div>
        <div className="card-body">
          <div className='Tabs '>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  >
              <Tab className='tab-btn' label="Opportunities" onClick={onHandleOppurtunitiesTab} />
              <Tab className='tab-btn' label="Application" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="Dedupe" disabled={disabledDedupeSelectBox} />
              <Tab className='tab-btn' label="Opportunity" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="Primary Borrower" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="Co-Borrower" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="KYC" disabled={disabled ? false : true} onClick={onHandleViewDocBtn} />
              <Tab className='tab-btn' label="History" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="Documents" disabled={disabledDocumnetTab ? true : false} />
            </Tabs>

            <TabPanel value={value} index={0}>
              <div className="mb-4" >
                <TableNew data={F1} />
              </div>
              <div>
                <form>
                  <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {LeadDetailscolumns.map((column) => (
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
                          {applicationDetail
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const serialNumber = index + 1 + page * rowsPerPage;
                              return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                  <TableCell >{serialNumber}</TableCell>
                                  <TableCell >{row.productCode}</TableCell>
                                  <TableCell >{row.lanNo}</TableCell>
                                  <TableCell >{row.urn}</TableCell>
                                  <TableCell >{row.status}</TableCell>
                                  <TableCell >{row.pcCbStatus}</TableCell>
                                  <TableCell >{row.customerName}</TableCell>
                                  <TableCell className='text-center' >{row.loanAmount}</TableCell>
                                  <TableCell className="text-center editicon">
                                    <FontAwesomeIcon className='fs-5 text-orenge cursor-pointer'
                                      icon={faPenToSquare}
                                      onClick={onhandletabsCahnge(row.batchNo, row.leadId, row.taskId, row.urn)}
                                    />
                                    <FontAwesomeIcon className=
                                      {deleteButton ?
                                        'fs-5 text-orenge cursor-pointer ms-2'
                                        : "tableDeleteButtonAppOpp"
                                      }
                                      data-bs-toggle="modal" data-bs-target="#dedupeRemarkModel"
                                      icon={faTrash}
                                      onClick={onhandleDeleteOpptunitiesCahnge(row.urn)}
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                      <div class="modal fade" id="dedupeRemarkModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <RemarksOpptunitiesDelete urnOpputnities={urnOpputnities} ApplicationNo={ApplicationNo} username={menu.username}></RemarksOpptunitiesDelete>
                      </div>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={applicationDetail.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </form>
              </div>
              <div className='row mt-3 justify-content-between'>
                <div className='col-6'><TextField fullWidth id="outlined-basic" label="Remarks"
                  onChange={(e) => setRemaksOpportunities(e.target.value)} value={remaksOpportunities || ""}
                  variant="outlined" multiline rows={3} /></div>
                <div className='col-4 '>
                  <div className='row '>
                    <div className='col-6'>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" >Action</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={action}
                          label="Action"
                          onChange={handleChangeDropdown}
                        >
                          <MenuItem value={""} hidden></MenuItem>
                          {proccedFurther ? <MenuItem value={1} >Proceed Further</MenuItem> : ""}
                          {actionDropdown ? <MenuItem value={2}>Re-Hit</MenuItem> : ""}
                          {actionDropdownSendBackBranch ? <MenuItem value={"0"}>Send Back Branch </MenuItem> : ""}
                          {actionDropdownSendCpc ? <MenuItem value={2}>Send To CPC</MenuItem> : ""}
                          <MenuItem value={9}>Reject</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className='col-6 Tabs'>
                      <Button className={applicationSubmit ? "submitApplication" : 'ms-3 bg-orenge'} onClick={handleSubmit(leadRecord.taskId, action)}
                        variant="contained" disabled={applicationSubmit ? true : false}>Submit</Button>
                      <Button className='bg-orenge ms-2' variant="contained" onClick={onHandleApplicationCancel}>Cancel</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel className="Application" value={value} index={1} disabled={disabled ? false : true}>
              <div className='row g-4'>

                <ApplicationTab leadRecord={leadRecord}></ApplicationTab>
              </div>
            </TabPanel>

            <TabPanel className="Dedupe h-100" value={value} index={2} disabled={disabledDedupeSelectBox ? false : true}>
              <div className='Dudupe'>
                <div className='row g-4'>
                  <div className='col-12 '>
                    <div className='dudupeBox p-3 border shadow-sm h-100' >
                      <h5 className='py-2'>Primary Borrower </h5>
                      <div>
                        <div className='row py-3' >
                          <div className='mb-3 col-6'>
                            <TextField fullWidth id="outlined-basic" label="Requsted URN" variant="filled" InputProps={{ readOnly: true, }} defaultValue={leadRecord.urn} />
                          </div>
                          <div className='mb-3 col-6'>
                            <TextField fullWidth id="outlined-basic" label="Customer Name" variant="filled" InputProps={{ readOnly: true, }} defaultValue={leadRecord.customerName} />
                          </div>
                          <div className='mb-3 col-6'>
                            <TextField fullWidth id="outlined-basic" label="Email Id" variant="filled" InputProps={{ readOnly: true, }} defaultValue={leadRecord.email} />
                          </div>
                          <div className='mb-3 col-6'>
                            <TextField fullWidth id="outlined-basic" label="mobile No" variant="filled" InputProps={{ readOnly: true, }} defaultValue={leadRecord.mobileNo} />
                          </div>
                        </div>
                        <form>
                          <Paper sx={{ width: '100%' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    {dedupeTable.map((column) => (
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
                                  {
                                    pcdedupeObject
                                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                      .map((row, index) => {
                                        return (
                                          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell >
                                              <Radio
                                                checked={selectedValuepc === row.matchURN}
                                                onChange={handleChangeRediopc(row.matchURN)}
                                                value={row.matchURN}
                                                name="radio-buttons"
                                                inputProps={{ "aria-label": row.matchURN }}
                                              />
                                            </TableCell>
                                            <TableCell >{row.matchURN}</TableCell>
                                            <TableCell >{row.matchRule}</TableCell>
                                            <TableCell >{row.scaleType}</TableCell>
                                            <TableCell >{row.matchReason}</TableCell>
                                          </TableRow>
                                        );
                                      })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <TablePagination
                              rowsPerPageOptions={[3, 5, 10, 25, 100]}
                              component="div"
                              count={pcdedupeObject.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                          </Paper>
                        </form>
                      </div>
                      <div className='d-flex justify-content-end mt-3'>
                        <button type="button" className="btn bg-orenge" data-bs-toggle="modal" data-bs-target="#pcmergeModal" onClick={onHandelPCdedupeMarge}>
                          Merge
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 '>
                    <div className='dudupeBox p-3 border shadow-sm h-100' >
                      <h5 className='py-2'>Secondary Co-Borrower </h5>
                      <div>
                        <div className='row py-3'>
                          <div className='mb-3 col-6'>
                            <TextField fullWidth id="outlined-basic" label="Requsted URN" variant="filled" InputProps={{ readOnly: true, }} defaultValue={leadRecord.scurn} />
                          </div>
                          <div className='mb-3 col-6'>
                            <TextField fullWidth id="outlined-basic" label="Customer Name" variant="filled" InputProps={{ readOnly: true, }} defaultValue={leadRecord.customerName} />
                          </div>
                          <div className='mb-3 col-6'>
                            <TextField fullWidth id="outlined-basic" label="Email Id" variant="filled" InputProps={{ readOnly: true, }} defaultValue={leadRecord.email} />
                          </div>
                          <div className='mb-3 col-6'>
                            <TextField fullWidth id="outlined-basic" label="mobile No" variant="filled" InputProps={{ readOnly: true, }} defaultValue={leadRecord.mobileNo} />
                          </div>
                        </div>
                        <form>
                          <Paper sx={{ width: '100%' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    {dedupeTable.map((column) => (
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
                                  {
                                    scdedupeObject
                                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                      .map((row, index) => {
                                        return (
                                          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell >
                                              <Radio
                                                checked={selectedValuesc === row.matchURN}
                                                onChange={handleChangeRediosc(row.matchURN)}
                                                value={row.matchURN}
                                                name="radio-buttons"
                                                inputProps={{ "aria-label": row.matchURN }}
                                              />
                                            </TableCell>
                                            <TableCell >{row.matchURN}</TableCell>
                                            <TableCell >{row.matchRule}</TableCell>
                                            <TableCell >{row.scaleType}</TableCell>
                                            <TableCell >{row.matchReason}</TableCell>
                                          </TableRow>
                                        );
                                      })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <TablePagination
                              rowsPerPageOptions={[3, 5, 10, 25, 100]}
                              component="div"
                              count={scdedupeObject.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                          </Paper>
                        </form>
                      </div>
                      <div className='d-flex justify-content-end mt-3'>
                        <button type="button" className="btn bg-orenge" data-bs-toggle="modal" data-bs-target="#scmergeModal" onClick={onHandelSCdedupeMarge}>
                          Merge
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel className="Opprotunity" value={value} index={3} disabled={disabled ? false : true}>
              <form>
                <div className='row g-4'>
                  <OpportunityTab leadRecord={leadRecord} ondata={ondataLoanAmount}></OpportunityTab>
                  <div className='col-6'>
                    {/* <TextField id="outlined-basic" InputLabelProps={{
                      shrink: true,
                    }} label="FSE Status" InputProps={{ readOnly: true, }}
                     variant="filled" autoComplete='off' multiline defaultValue={leadRecord.fseStatus || ""} fullWidth /> */}
                    <FormControl fullWidth disabled={disabledFSEDropdown ? false : true} >
                      <InputLabel variant="standard" htmlFor="uncontrolled-native" fullWidth className='bg-white' shrink>
                        FSE Status
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: 'FSE Status',
                          id: 'uncontrolled-native',
                        }}
                        onChange={(e) => setFSEDropDownstatus(e.target.value)}
                        value={fSEDropDownstatus || ""}
                      >
                        <option hidden>{leadRecord.fseStatus || ""}</option>
                        <option value={"Positive"}>Positive</option>
                        <option value={"Negative"}>Negative</option>
                      </NativeSelect>
                    </FormControl>
                  </div>
                  <div className='col-6 mt-4'>
                    <TextField id="outlined-basic" label="Remark" autoComplete='off' multiline defaultValue={leadRecord.remarks}
                      onChange={(e) => setRemaksOpportunity(e.target.value)} value={remaksOpportunity || ""} fullWidth />
                  </div>
                  <div className='mt-3  d-flex justify-content-end '>
                    <Button className='ms-3 bg-orenge' onClick={handleSave} variant="contained">Save</Button>
                  </div>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="PrimaryBorrower" value={value} index={4} disabled={disabled ? false : true}>
              <form>
                <div className='row g-4'>
                  <PrimaryBorrowerTab leadRecord={leadRecord}></PrimaryBorrowerTab>
                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledAmlSelectBox ? false : true} >
                      <InputLabel variant="standard" htmlFor="uncontrolled-native" fullWidth className='bg-white' shrink>
                        AML Status
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                        onChange={handleChangeDropdownpcAmlStatus}
                        value={pcAMLStatus || ""}
                      >
                        <option hidden>{leadRecord.pcAMLStatus || ""}</option>
                        <option value={"Match"}>Match</option>
                        <option value={"No Match"}>No Match</option>
                      </NativeSelect>
                    </FormControl>
                  </div>
                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledDedupeDropdown ? false : true} >
                      <InputLabel variant="standard" htmlFor="uncontrolled-native" fullWidth className='bg-white' shrink>
                        Dedupe Status
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                        onChange={handleChangeDropdownpcDedupeStatus}
                        value={pcDedupeStatus || ""}
                      >
                        <option hidden>{leadRecord.pcDedupeStatus || ""}</option>
                        <option value={"Duplicate"}>Duplicate</option>
                        <option value={"Non-Duplicate"}>Non-Duplicate</option>
                      </NativeSelect>
                    </FormControl>
                  </div>
                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledCBSelectBox ? false : true} >
                      <InputLabel variant="standard" htmlFor="uncontrolled-native" fullWidth className='bg-white' shrink>
                        CB Status
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                        onChange={handleChangeDropdownpcCbStatus}
                        value={pcCbStatus || ""}
                      >
                        <option hidden>{leadRecord.pcCbStatus || ""}</option>
                        <option value={"Accepte"}>Accepte</option>
                        <option value={"Reject"}>Reject</option>
                      </NativeSelect>
                    </FormControl>
                  </div>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="CoBorrower" value={value} index={5} disabled={disabled ? false : true}>
              <form>
                <div className='row g-4'>
                  <CoBorrowerTab leadRecord={leadRecord}></CoBorrowerTab>
                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledAmlSelectBox ? false : true} >
                      <InputLabel variant="standard" htmlFor="uncontrolled-native" fullWidth className='bg-white' shrink>
                        AML Status
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                        onChange={handleChangeDropdownscAmlStatus}
                        value={scAMLStatus || ""}
                      >
                        <option hidden>{leadRecord.scAMLStatus || ""}</option>
                        <option value={"Match"}>Match</option>
                        <option value={"No Match"}>No Match</option>
                      </NativeSelect>
                    </FormControl>
                  </div>
                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledDedupeDropdown ? false : true} >
                      <InputLabel variant="standard" htmlFor="uncontrolled-native" fullWidth className='bg-white' shrink>
                        Dedupe Status
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                        onChange={handleChangeDropdownscDedupeStatus}
                        value={scDedupeStatus || ""}
                      >
                        <option hidden>{leadRecord.scDedupeStatus || ""}</option>
                        <option value={"Duplicate"}>Duplicate</option>
                        <option value={"Non-Duplicate"}>Non-Duplicate</option>
                      </NativeSelect>
                    </FormControl>
                  </div>
                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledCBSelectBox ? false : true} >
                      <InputLabel variant="standard" htmlFor="uncontrolled-native" fullWidth className='bg-white' shrink>
                        CB Status
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                        onChange={handleChangeDropdownscCbStatus}
                        value={scCbStatus || ""}
                      >
                        <option hidden>{leadRecord.scCbStatus || ""}</option>
                        <option value={"Accepte"}>Accepte</option>
                        <option value={"Reject"}>Reject</option>
                      </NativeSelect>
                    </FormControl>

                  </div>
                  <EarningMember leadRecord={leadRecord}></EarningMember>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="CB Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.em1CbStatus || ""} fullWidth InputLabelProps={{
                      shrink: true,
                    }} />
                  </div>
                  <EarningMember2 leadRecord={leadRecord}></EarningMember2>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="CB Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.em2CbStatus || ""} fullWidth InputLabelProps={{
                      shrink: true,
                    }} />
                  </div>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="KYC" value={value} index={6} disabled={disabled ? false : true}>
              <form>
                <KycTab leadRecord={leadRecord}></KycTab>
                <div className='col-12 mt-3 d-flex justify-content-end'>

                  <Button hidden={KycviewButtonDisable} className='me-3 bg-orenge' variant="contained" onClick={onHandelNewTab(leadRecord.imgUrl)}>View Document</Button>

                </div>
              </form>
            </TabPanel>

            <TabPanel className="History" value={value} index={7} disabled={disabled ? false : true}>
              <div>
                <form>
                  <HistoryAppDetails historyData={historyData} ></HistoryAppDetails>
                </form>
              </div>
            </TabPanel>

            <TabPanel className="Upload" value={value} index={8} disabled={disabledDocumnetTab ? true : false}>
              <div className={uploadfile ? 'Upload h-100' : "uploadfalse"}>
                {/* <div className='Upload h-100'> */}
                <div className='row'>
                  <div className='col-12'>
                    <div className="output" >
                      <div>
                        <Button className='bg-orenge me-3' variant="contained" onClick={handleClick}>
                          Upload File
                        </Button>
                        <input
                          type="file"
                          ref={hiddenFileInput}
                          onChange={changeHandler}
                          style={{ display: 'none' }}
                        />
                      </div>
                      {
                        file &&
                        <>
                          <div>{file.name} ({file.size}kb)</div>
                          <Button onClick={onhandledeletefdile}><FontAwesomeIcon className='deleteIcon' icon={faTrash} /></Button>
                          <Button onClick={handlePreview} className='bg-orenge me-3' variant="contained" data-bs-toggle="modal" data-bs-target="#imgPriview">
                            Preview Image
                          </Button>
                        </>
                      }
                    </div>

                  </div>
                </div>
                {/* <UpLoadFile uploaddata={upLoadUrl}></UpLoadFile> */}
              </div>
              <div className={leadDataView ? "" : "VewImagebuttonclose"}>
                <Button onClick={handlePreview} className='bg-orenge me-3' variant="contained" data-bs-toggle="modal" data-bs-target="#LeadDataimgview" disable={viewButtonDisable}>
                  View Image
                </Button>

                {/* <div>{}</div> */}
              </div>
              <div class="modal fade" id="imgPriview" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Preview Image</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div className='priviewImg'>
                        <img src={upLoadUrl} alt="Preview" />

                        {/* <div>
                          <Document file={fileData}>
                            <Page pageNumber={1} />
                          </Document>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal fade" id="LeadDataimgview" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">{leadRecord.documentName}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div className='priviewImg'>
                        <img src={leadRecord.dataContent} alt="Preview" />
                        {/* <img src={"data:image/jpeg;base64," + leadRecord.dataContent} /> */}
                        {/* <div>
                          <Document file={fileData}>
                            <Page pageNumber={1} />
                          </Document>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={DbKitdownload ? "Dbdownloadtrue" : "Dbdownloadfalse"}>
                <DbKit applicationDetaildata={applicationDetail} appNumber={ApplicationNo}></DbKit>
              </div>
            </TabPanel>

          </div>
        </div>
        <Backdrop
          sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}

export default ApplicationDetails