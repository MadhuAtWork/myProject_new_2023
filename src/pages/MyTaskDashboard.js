
import React, { useEffect, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { MyContext } from './Menu';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { fetchUrl } from '../Config';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BaseURL = fetchUrl;
const fetchMyTasks = "/fetchMyTasks"
const reassignTaskURL = "/reassignTask"


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
    { id: 'Sr_no', label: 'Sr. No' },
    { id: 'Product_Code', label: 'Product Code' },
    { id: 'Appliction_No', label: 'Application No.' },
    { id: 'No_of_Customer', label: 'No. of Customers' },
    { id: 'Application_Status', label: 'Application Status' },
    { id: 'Sanctioned_Date', label: 'Sanctioned Date' },
    { id: 'Last_Modified_By', label: 'Last Modified By' },
    { id: 'Branch_Code', label: 'Branch Code' },
    { id: 'Action', label: 'Action', align: 'center' },
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
                            'aria-label': 'select all desserts',
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
                    {numSelected} record(s) selected
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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function MyTaskDashboard(props) {
    const [navbar, setnavbar] = useState(false);
    const [Mytasklead, setMytasklead] = useState([]);
    const [mytaskQueue, setmytaskQueue] = useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [mytask, setmytask] = React.useState([]);
    const [mytaskTitle, setMytaskTitle] = React.useState('My Task List ( Application Details )');
    const [open, setOpen] = React.useState(false);
    const Navigate = useNavigate();
    const location = useLocation();
    const [batchdata, setBatchdata] = React.useState();
    const [Tryvalue, setTrayvalue] = useContext(MyContext);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(false);

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
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onhandlechange = () => {
        setnavbar(!navbar);
        // setnavbar(true);
    }

    React.useEffect(() => {
        handleToggle()
        const requestOptionsQueue = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "executorID": menu.username,
                "flag": "all",
            }),
        };
        fetch(BaseURL + fetchMyTasks, requestOptionsQueue)
            .then(response => response.json())
            .then((response) => {
                console.log(response.dataMap)
                setmytaskQueue(response.dataMap)
                handleClose()
            })
    }, []);


    const onMenuClick = menuName => (e) => {
        handleToggle()
        e.preventDefault();
        setMytaskTitle(menuName)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "executorID": menu.username,
                "flag": "all",
                "queueName": menuName
            }),
        };
        fetch(BaseURL + fetchMyTasks, requestOptions)
            .then(response => response.json())
            .then((response) => {
                console.log(response.data)
                setmytask(response.data)
                handleClose()
            })
    }

    const onHandleeditMytask = (F1, F4) => (e) => {
        e.preventDefault();
        localStorage.setItem('items', JSON.stringify({ f1: F1, ApplicationNo: F4, myTask: mytaskTitle }));
        // setTrayvalue({ f1: F1, ApplicationNo: F4, myTask: mytaskTitle });

        Navigate("/index/MyTask/MyTaskDetails", { state: menu });
    }

    const QueueList = Object.keys(mytaskQueue);
    const Queuevalue = Object.values(mytaskQueue);

    const menu = location.state;
    const onHnadleCancelMytask = () => {
        Navigate('/index', { state: menu })
    }


    const onHnadleRelease = (e) => {

        handleToggle()
        e.preventDefault();

        var finalListStr = "";

        for (let i = 0; i < selected.length; i++) {
            finalListStr = finalListStr + selected[i] + ",";
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "taskID": finalListStr

            }),
        };
        fetch(BaseURL + reassignTaskURL, requestOptions)
            .then(response => response.json())
            .then((response) => {
                alert(response.errorMsg)
                window.location.reload();
                handleClose()
            })
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const allSelected = mytask.map((n) => n.taskID);
            setSelected(allSelected);
        }
        else {
            setSelected([]);

        }
    };

    const handleClick = (event, taskID) => {
        const selectedIndex = selected.indexOf(taskID);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, taskID);
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

    const isSelected = (taskID) => {
        return selected.indexOf(taskID) !== -1;
    };


    return (
        <div className="App">
            <div className="sidebarcontainer"><div className="main2">
                <div className="menu2">
                    <div className=
                        {
                            navbar
                                ?
                                "sidenav"
                                :
                                "unset_sidenav"
                        }
                    >
                        <div className="menuIcon" onClick={onhandlechange}>&#9776;</div>
                        {
                            navbar
                                ?
                                <> <div className="holder"></div>
                                    <div>
                                        {
                                            QueueList.map((value, i) =>
                                                <div className="holder myTaskList1" onClick={onMenuClick(value)} key={i}>
                                                    <span className="ms- badge rounded-pill bg-white">{Queuevalue[i]}</span>
                                                    <span className="ms-2">{value}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </>
                                : <>
                                    <div>
                                        {
                                            QueueList.map((value, i) =>
                                                <div className="holder"
                                                    onClick={onMenuClick(value)}
                                                    key={i}>
                                                    <span className="ms"><span className="badge rounded-pill bg-white">{Queuevalue[i]}</span></span></div>
                                            )
                                        }
                                    </div>
                                </>
                        }
                    </div>
                </div>
                <div className='sectionMain'>
                    <div className={navbar ? "sectionclose2" : "section2"}>
                        <div className='MyTaskDetails'>
                            <div className="card mt-4">
                                <div className="card-header ">
                                    {mytaskTitle}
                                </div>
                                <div className="card-body p-3">
                                    <Paper
                                        sx={{ width: '100%', mb: 2, overflow: 'hidden' }}
                                    >
                                        <EnhancedTableToolbar numSelected={selected.length} />
                                        <TableContainer sx={{ maxHeight: 440 }}>

                                            <Table
                                                sx={{ minWidth: 750 }}
                                                aria-labelledby="tableTitle"
                                                // size={dense ? 'small' : 'medium'}
                                                stickyHeader aria-label="sticky table"
                                            >


                                                <EnhancedTableHead
                                                    numSelected={selected.length}
                                                    order={order}
                                                    orderBy={orderBy}
                                                    onSelectAllClick={handleSelectAllClick}
                                                    // onRequestSort={handleRequestSort}
                                                    rowCount={mytask.length}
                                                    className="tableHead"
                                                />

                                                <TableBody>

                                                    {
                                                        stableSort(mytask, getComparator(order, orderBy))
                                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            .map((row, index) => {
                                                                const serialNumber = index + 1 + page * rowsPerPage;
                                                                const isItemSelected = isSelected(row.taskID);
                                                                const labelId = `${index}`;
                                                                return (
                                                                    <TableRow
                                                                        hover
                                                                        onClick={(event) => handleClick(event, row.taskID)}
                                                                        role="checkbox"
                                                                        aria-checked={isItemSelected}
                                                                        tabIndex={-1}
                                                                        key={row.taskID}
                                                                        selected={isItemSelected}
                                                                    >
                                                                        <TableCell padding="checkbox">
                                                                            <Checkbox
                                                                                color="primary"
                                                                                checked={isItemSelected}
                                                                                value={row.taskID}
                                                                                inputProps={{
                                                                                    'aria-labelledby': labelId,
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>{(serialNumber)}</TableCell>
                                                                        <TableCell component="th" id={labelId} scope="row" padding="none" > {row.f3}  </TableCell>
                                                                        <TableCell>{row.f4}</TableCell>
                                                                        <TableCell>{row.f12}</TableCell>
                                                                        <TableCell>{row.f11}</TableCell>
                                                                        <TableCell>{row.f13}</TableCell>
                                                                        <TableCell>{row.f14}</TableCell>
                                                                        <TableCell>{row.f2}</TableCell>
                                                                        <TableCell className="text-center editicon">
                                                                            <FontAwesomeIcon className='fs-5 text-orenge cursor-pointer'
                                                                                onClick={onHandleeditMytask(row.f1, row.f4)} icon={faPenToSquare} />
                                                                        </TableCell>
                                                                        <TableCell sx={{ display: "none" }} >{row.taskID}</TableCell>

                                                                    </TableRow>
                                                                );
                                                            })}
                                                    {/* {emptyRows > 0 && (
                                                        <TableRow
                                                            style={{
                                                                height: (dense ? 33 : 53) * emptyRows,
                                                            }
                                                            }
                                                        >
                                                            <TableCell colSpan={6} />
                                                        </TableRow>
                                                    )} */}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        {/* <div className='d-flex p-4 justify-content-center fw-bolder'>{noDataAvaiable}</div> */}

                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                            component="div"
                                            count={mytask.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                        <>
                                        </>
                                    </Paper>
                                    {/* </div> */}
                                    <div className=' d-flex justify-content-end   px-0'>
                                        <div className=' d-flex align-items-center p-1 update-btn '>
                                            <Button type="button" className=' ms-2 ' variant="contained"
                                                onClick={onHnadleRelease} disabled={selected.length > 0 ? false : true}
                                            >Release</Button>
                                            {/* </div>
                                    <div className=' d-flex align-items-center   '> */}
                                            <Button type="button" className='bg-orenge ms-2 ' variant="contained" onClick={onHnadleCancelMytask}>Cancel</Button>

                                        </div>
                                    </div>
                                </div>
                                {/* <div className='d-flex justify-content-end'>
                                <button type="button" className="btn m-2 bg-orenge col-1 " onClick={onHnadleCancelMytask}>
                                    Cancel
                                </button>
                            </div> */}
                                <Backdrop
                                    sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open={open}
                                    onClick={handleClose}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div >
                </div>
                {/* <MyTaskList></MyTaskList> */}
            </div>
        </div>
    );
}

export default MyTaskDashboard;