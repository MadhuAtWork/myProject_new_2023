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
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from '@mui/material';
import { fetchUrl } from '../Config';
import Form from 'react-bootstrap/Form';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';


const baseURL = fetchUrl;

const getAllDBKit = '/getAllKit';
const downloadDBDocuments = '/newPDF';
const convertToZipUrl = '/convertToZip';

const columns = [
    { id: 'Product_Name', label: 'Product Name', },
    { id: 'First_Name', label: 'First Name', },
    { id: 'Last_Name', label: 'Last Name', },
    { id: 'URN', label: 'URN ', },
    { id: 'Customer_ID', label: 'Customer ID', },
    { id: 'Oppurtunity_Status', label: 'Oppurtunity Status', },
    { id: 'Document_type', label: 'Document type', },
    { id: 'Action', label: 'Download', }

];

function DbKit(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [document, setDocument] = React.useState({});
    const [language, setLanguage] = React.useState();
    const [date, setDate] = React.useState();
    const [documentVlaue, setDcoumentValue] = React.useState('')
    const [pdfData, setPdfData] = React.useState()
    const [downloadIcon, setDownloadIcon] = React.useState(false)

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    }

    const onHandleDocumnetType = async (e) => {
        handleToggle();
        e.preventDefault();

        const requestOptionsedit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Language": language,

            }),
        };
        await fetch(baseURL + getAllDBKit, requestOptionsedit)
            .then(response => response.json())
            .then((response) => {
                setDocument(response)
                handleClose()
            })
    }

    // React.useEffect(() => {
    //     handleToggle();
    //     const requestOptionsedit = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //         }),
    //     };
    //     fetch(baseURL + getAllDBKit, requestOptionsedit)
    //         .then(response => response.json())
    //         .then((response) => {
    //             setDocument(response)
    //             handleClose()
    //         })
    // }, [])
    const documentArry = Object.values(document);

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

    const onhandleDbkitDownload = async (documentType, urn, leadId, leadName) => {
        console.log(documentType)

        const response = await fetch(baseURL + downloadDBDocuments, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                "leadId": leadId,
                //  "urn": urn,
                "documentName": documentType,
                "language": language,
                "planDisbDate": date
            }),
        });
        console.log(response.blob)
        const fileBlob = await response.blob();
        saveAs(fileBlob, leadName + "_'" + documentType + '.pdf');

    };


    const appNumber = props.appNumber

    const onhandleDbkitDownloadAll = async () => {

        const response = await fetch(baseURL + convertToZipUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                "appNO": appNumber,
                "language": language,
                "planDisbDate": date
            }),
        });
        const fileBlob = await response.blob();
        console.log(fileBlob)
        console.log(response)
        saveAs(fileBlob, appNumber + 'DBkitFile.zip');
    }

    const onHandleSearchClear = () => {
        setDate('')
        setLanguage('')
    }


    const onHandleDocumnetselect = (e) => {
        const newSelectedDocument = e.target.value;
        const updatedData = [...props.applicationDetaildata];
        updatedData[index].selectedDocument = newSelectedDocument;
        console.log(newSelectedDocument)
        if (e.target.value == "") {
            setDownloadIcon(true)
        }
    }

    return (
        <>
            <div className='DBKit mt-3'>
                <div className='row'>
                    <div className='col-4'>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Language</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={language || ""}
                                label="Language"
                                name="Language"
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <MenuItem value="">--Select--</MenuItem>
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Assamese">Assamese</MenuItem>
                                <MenuItem value="Bengali">Bengali</MenuItem>
                                <MenuItem value="Gujrati">Gujrati</MenuItem>
                                <MenuItem value="Hindi">Hindi</MenuItem>
                                <MenuItem value="Kanada">Kanada</MenuItem>
                                <MenuItem value="Marathi">Marathi</MenuItem>
                                <MenuItem value="Odia">Odia</MenuItem>
                                <MenuItem value="Punjabi">Punjabi</MenuItem>
                                <MenuItem value="Tamil">Tamil</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='col-4'>
                        <TextField type="date" fullWidth value={date || ""} onChange={(e) => setDate(e.target.value)} label="Date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        ></TextField>
                    </div>
                    <div className='col-4'>
                        <Button className='bg-orenge' variant="contained" onClick={onHandleSearchClear}
                        >Clear</Button>
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
                                {props.applicationDetaildata
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell>{row.productCode}</TableCell>
                                                <TableCell>{row.firtName}</TableCell>
                                                <TableCell>{row.lastName}</TableCell>
                                                <TableCell>{row.urn}</TableCell>
                                                <TableCell>{row.customerId}</TableCell>
                                                <TableCell>{row.status}</TableCell>
                                                <TableCell>
                                                    <Form.Select
                                                        value={row.selectedDocument}
                                                        // onChange={(e) => {
                                                        //     const newSelectedDocument = e.target.value;
                                                        //     const updatedData = [...props.applicationDetaildata];
                                                        //     updatedData[index].selectedDocument = newSelectedDocument;

                                                        // }}
                                                        onChange={onHandleDocumnetselect}
                                                        onClick={onHandleDocumnetType}
                                                    >
                                                        <option value=''>---select---</option>
                                                        {documentArry.map((value, index) => {
                                                            return (
                                                                <option key={index} value={value}>{value}</option>
                                                            );
                                                        })}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell className=' d-flex align-item-center justify-content-center'>
                                                    {
                                                        downloadIcon ?
                                                            <DownloadIcon onClick={() => onhandleDbkitDownload(row.selectedDocument, row.urn, row.leadId, row.firtName)} className='text-orenge' />
                                                            : ""
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={props.applicationDetaildata.length}
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
                    <div className='d-flex p-2'>
                        <Button className='bg-orenge' variant="contained" onClick={onhandleDbkitDownloadAll} >
                            Download All
                        </Button>
                    </div>
                    <div className='d-flex p-2'>
                        <Button className='bg-orenge' variant="contained" type="submit"
                            onClick={onhandlecancel}
                        >Cancel</Button>

                    </div>

                </div>
            </div>
        </>
    );
}
export default DbKit;
