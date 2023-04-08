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
import Form from 'react-bootstrap/Form';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'ApplicationList',
        label: 'Application List',
    },
    // {
    //     id: 'meetingCenterName',
    //     label: 'Metting Center Name',
    // }
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'Select all records',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} records selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >

                </Typography>
            )}

        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


function BulkupDate() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchCrec, setSearchCrec] = React.useState([]);
    const [inputCrecName, setinputCrecName] = React.useState([]);
    const [inputNewCrecName, setNewinputCrecName] = React.useState([]);
    // const CurrentEmployee = React.useRef();
    // const NewEmployee = React.useRef();
    const [mcselect, setMcselect] = React.useState('');
    const [mcTarget, setmcTarget] = React.useState('');
    const [MeetingCenterCode, setMeetingCenterCode] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    }


    const baseURL = fetchUrl;
    const fetchApplicationListURL = '/fetchApplicationList';
    const migratMCURL = '/migrateMc';
    const getMeetingCenterListURL = '/getMeetingCenterList';

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            let allSelected = queueList.map((n) => n);
            setSelected(allSelected);
        }
        else {
            setSelected([]);
        }
    };

    const handleClick = (event, MCvalue) => {
        const selectedIndex = selected.indexOf(MCvalue);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, MCvalue);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);


    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (MCvalue) => selected.indexOf(MCvalue) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - queueList.length) : 0;



    const handleCurrentCrecUpdate = async (event) => {
        handleToggle()
        event.preventDefault();


        const requestOptionscrecbulk = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "meetingCenterCode": mcselect
            }),
        };
        await fetch(baseURL + fetchApplicationListURL, requestOptionscrecbulk)
            .then(response => response.json())
            .then((response) => {
                setSelected([]);
                setSearchCrec(response);
                if
                    // (searchCrec.length === 0) 
                    (Object.keys(response).length === 0) {
                    alert("No Application List is Available for Migration")
                }
                handleClose()
            })
    }


    const queueList = Object.values(searchCrec);
    // const queueValue = Object.values(searchCrec);


    const onHandleCrecBulkUpdate = async (event) => {
        handleToggle()
        event.preventDefault();



        if (mcselect === mcTarget) {
            alert("You cannot transfer application(s) to same Meeting Center.")
            return;
        }

        if (selected.length == 0) {
            alert("Please select atleast one Meeting Center for transfer.")
            return;
        }
        if (mcTarget == "") {
            alert("Please select Target Meeting Centre to transfer selected Meeting Centers")
            return;
        }

        var finalListStr = "";

        for (let i = 0; i < selected.length; i++) {
            finalListStr = finalListStr + selected[i] + ",";
        }

        const requestOptionscrecbulk = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "meetingCenterCode": mcselect,
                "destMeetingCenterCode": mcTarget,
                "appNoList": finalListStr,
                "userId": userName
            }),
        };
        await fetch(baseURL + migratMCURL, requestOptionscrecbulk)
            .then(response => response.json())
            .then((response) => {
                setSelected([]);
                alert(response.Success);
                handleCurrentCrecUpdate(event);
                setmcTarget("");
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
    console.log(MeetingCenterCode);


    const dropdownMeetingValue = Object.values(MeetingCenterCode);
    const dropdownMeetingKeys = Object.keys(MeetingCenterCode);

    //....................drop down list end........................//


    const handleChange = (event) => {
        setMcselect(event.target.value);
    };
    const handleChangetarget = (event) => {
        setmcTarget(event.target.value);
    };


    const Navigate = useNavigate()
    const location = useLocation();
    const index = location.state;
    const userName = index.username;
    const onHandleMigrateCancel = () => {
        Navigate('/index', { state: index })
    }

    return (
        <>
            <form onSubmit={onHandleCrecBulkUpdate}>
                <div className='CrecUpdate'>
                    <div className='searchBox mt-4'>
                        <div className="card">
                            <div className="card-header">Migrate Meeting Centre</div>
                            <div className="card-body py-">
                                <div className='mb-4 d-flex'>
                                    <div className='col-11 me-1'>
                                        <Form.Label >Select Meeting Center</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            fullWidth
                                            onChange={handleChange}
                                        >
                                            <option value="">---select---</option>
                                            {dropdownMeetingKeys.map((mcselect, index) =>
                                                <option key={index} value={mcselect}>{dropdownMeetingValue[index]}</option>
                                            )};
                                        </Form.Select>
                                    </div>
                                    {/* <TextField fullWidth id="outlined-basic" label="Current CREC Employee Number" variant="outlined"
                                        value={inputCrecName} 
                                        onChange={(e) => setinputCrecName(e.target.value)}
                                    /> */}
                                    <div className='d-flex align-items-end p-1'>
                                        <Button className='bg-orenge ms-3' variant="contained" type="submit" onClick={handleCurrentCrecUpdate}>
                                            Search
                                        </Button>
                                    </div>
                                </div>

                                <div className='mb-3 d-flex'>

                                    <div className='col-11 me-1'>
                                        <Form.Label >Target Meeting Center</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            fullWidth
                                            onChange={handleChangetarget}
                                        >
                                            <option value="">---select---</option>
                                            {dropdownMeetingKeys.map((mcTarget, index) =>
                                                <option key={index} value={mcTarget}>{dropdownMeetingValue[index]}</option>
                                            )};
                                        </Form.Select>
                                    </div>
                                    {/* <TextField fullWidth id="outlined-basic" label="New CREC Employee Number" variant="outlined"
                                        value={inputNewCrecName} ref={NewEmployee}
                                        onChange={(e) => setNewinputCrecName(e.target.value)}
                                    /> */}
                                    {/* <Button className='bg-orenge ms-3' variant="contained" type="submit" onClick={handleNewCrecUpdate}>Search</Button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='border mt-4'>
                        <Box sx={{ width: '100%' }}>
                            {/* <form > */}
                            <Paper sx={{ width: '100%' }}>
                                <EnhancedTableToolbar numSelected={selected.length} />
                                <TableContainer>
                                    <Table
                                        sx={{ minWidth: 750 }}
                                        aria-labelledby="tableTitle"
                                        size={dense ? 'small' : 'medium'}
                                    >
                                        <EnhancedTableHead
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={queueList.length}
                                        />
                                        <TableBody>
                                            {stableSort(queueList, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((MCvalue, index) => {
                                                    const isItemSelected = isSelected(MCvalue);
                                                    const labelId = `${index}`;

                                                    return (
                                                        <TableRow
                                                            hover
                                                            onClick={(event) => handleClick(event, MCvalue)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={MCvalue}
                                                            selected={isItemSelected}
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    color="primary"
                                                                    // id={`${index}`}
                                                                    checked={isItemSelected}
                                                                    value={MCvalue}
                                                                    // onChange={onHandleCheckboxCrecBulk(labelId, MCvalue)}
                                                                    inputProps={{
                                                                        'aria-labelledby': labelId,
                                                                    }}
                                                                />
                                                            </TableCell>

                                                            <TableCell component="th" id={labelId} scope="row" padding="none" >{MCvalue}</TableCell>
                                                            {/* <TableCell >{queueValue[index]}</TableCell> */}

                                                        </TableRow>
                                                    );
                                                })}

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                    component="div"
                                    count={queueList.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                                <div className='d-flex justify-content-end p-3' >
                                    <div className='d-flex p-1 update-btn'>
                                        <Button type="submit"
                                            className='  ms-2'
                                            variant="contained"
                                            disabled={selected.length > 0 ? false : true}
                                        //  onSubmit={onHandleCrecBulkUpdate}
                                        >Update</Button>
                                    </div>
                                    <div className='d-flex align-items-center p-1'>
                                        <Button type="button" className='bg-orenge ms-2' variant="contained" onClick={onHandleMigrateCancel}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </Paper>
                            <Backdrop
                                sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                                onClick={handleClose}>
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            {/* </form> */}
                        </Box>
                    </div>
                </div>
            </form>
        </>
    );
}

export default BulkupDate; 