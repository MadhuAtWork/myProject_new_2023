
import * as React from 'react';
import { useState, useEffect } from "react";
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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
// import Select from './Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchUrl } from '../Config';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from "sweetalert2";

const BaseUrl = fetchUrl
const fetchUnallocatedTasks = '/fetchUnallocatedTasks';
const claimTask = '/claimTask';
const fetchUserForAllocation = '/fetchUserForAllocation';

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
    id: 'sr_no',
    label: "Sr. No",
  },
  {
    id: 'Product_Code',
    label: "Product Code",
  },
  {
    id: 'Application_Category',
    label: 'Application Category',
  },
  {
    id: 'Application No',
    label: 'Application No',
  },
  {
    id: 'No_Of_Customer',
    label: 'No. of Customers',
  },
  {
    id: 'Application_Status',
    label: 'Application Status',
  },
  {
    id: 'Branch_Code',
    label: 'Branch Code',
  }

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

//.........function start here.......... //

export default function Assigntask(props) {

  const [rows, setPostId] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [assigndata, setuserassigndata] = useState([]);
  const [Queue, setAge] = React.useState('');
  const [userallocation, setuserallocation] = React.useState('');
  const [usercheckbox, setusercheckbox] = React.useState('');
  const [noDataDiv, setnoDataDiv] = React.useState('d-none');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [tableData, setTableData] = useState([]);
  const [inputsearchValue, setinputsearchValue] = useState();
  const [open, setOpen] = React.useState(false);
  const [noDataAvaiable, setNoDataAvaiable] = React.useState();



  const Navigate = useNavigate()
  const location = useLocation();
  const index = location.state;
  const onhandlecancel = () => {
    Navigate('/index', { state: index })
  }


  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  }


  const handleChangeoption = (event) => {
    setAge(event.target.value);
  };

  const handleChangeUserallocation = (event) => {
    setuserallocation(event.target.value);
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allSelected = rows.map((n) => n.taskID);
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

  const isSelected = (taskID) => {
    return selected.indexOf(taskID) !== -1;
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;




  //..............................assign Task start.............................//

  const handleChangeAssigntask = (event) => {
    handleToggle()
    event.preventDefault();
    var finalListStr = "";

    for (let i = 0; i < selected.length; i++) {
      finalListStr = finalListStr + selected[i] + ",";
    }

    const requestOptionsassign = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "taskID": finalListStr,
        "executorID": userallocation
      }),
    };
    fetch(BaseUrl + claimTask, requestOptionsassign)
      .then(response => response.json())
      .then((response) => {
        setSelected([]);
        Swal.fire({
          icon: 'success',
          text: (response.errorMsg)
        });
        setuserallocation("")
       
          handleChangeformassigTask(event);
      })

  }
  const handleChangeformassigTask = (event) => {
    handleToggle()
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "queueID": Queue,
        "executorID": index.username
      }),
    };
    fetch(BaseUrl + fetchUnallocatedTasks, requestOptions)
      .then(response => response.json())
      .then((response) => {
        console.log(response)
        if (response.data.length == 0) {
        
          setPostId([]);
          setTableData([]);
        handleClose()
        }else{
          setPostId(response.data);
          setTableData(response.data);
        handleClose()
        }
        handleClose()
      })
  }

  //..............................assign Task end.............................//

  const handleChangeform = (event) => {
    handleToggle()
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "queueID": Queue,
        "executorID": index.username
      }),
    };
    fetch(BaseUrl + fetchUnallocatedTasks, requestOptions)
      .then(response => response.json())
      .then((response) => {
        console.log(response)
        if (response.data.length == 0) {
          Swal.fire({
            icon: 'warning',
            text: "No Data Available ",
          });
          setPostId([]);
          setTableData([]);
        handleClose()
        }else{
          setPostId(response.data);
          setTableData(response.data);
        handleClose()
        }
        handleClose()
      })
  }

  useEffect(() => {
    handleToggle()
    const requestOptionsid = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "userID": index.username
      }),
    };
    fetch(BaseUrl + fetchUserForAllocation, requestOptionsid)
      .then(response => response.json())
      .then((response) => {
        setuserdata(response)
        handleClose()

      })

  }, []);

  const result = Object.values(userdata);
  const userKey = Object.keys(userdata);

  const assigTableSearch = (searchedVal) => {

    if (searchedVal.length >= 3) {
      const filteredRows = tableData.filter((row) => {
        const searchValue = searchedVal.toString().toLowerCase();
        var val1 = false;
        var val2 = false;
        var val3 = false;
        var val4 = false;
        var val5 = false;
        var val6 = false;

        if (row.f3 != null) {
          val1 = row.f3.toString().toLowerCase().includes(searchValue);
          setnoDataDiv("d-none")
        }
        if (row.f15 != null) {
          val2 = row.f15.toString().toLowerCase().includes(searchValue);
          setnoDataDiv("d-none")
        }
        if (row.f4 != null) {
          val3 = row.f4.toString().toLowerCase().includes(searchValue);
        }
        if (row.f12 != null) {
          val4 = row.f12.toString().toLowerCase().includes(searchValue);
        }
        if (row.f11 != null) {
          val5 = row.f11.toString().toLowerCase().includes(searchValue);
        }
        if (row.f2 != null) {
          val6 = row.f2.toString().toLowerCase().includes(searchValue);
        }
        return val1 || val2 || val3 || val4 || val5 || val6;

      });

      if (filteredRows.length === 0) {
        setPostId([]);
        setNoDataAvaiable("No Data Available"); // move this outside the if block
      } else {
        setPostId(filteredRows);
        setNoDataAvaiable("");
      }
    } else {
      setPostId(tableData);
      setNoDataAvaiable("");
    }
  };


  return (
    <>
      <div className='assignTask'>
        <div className='searchBox mt-4'>
          <div className="card">
            <div className="card-header"> Assign Task </div>
            <div className="card-body ">
              <form className='d-flex' onSubmit={handleChangeform}>
                <div className='col-9'>
                  <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Queue Search</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Queue}
                      label="Queue Search"
                      onChange={handleChangeoption}
                    >
                      <MenuItem value="">----Select All------</MenuItem>
                      <MenuItem value="M110">Exception Queue for CB</MenuItem>
                      <MenuItem value="M810">Exception Queue for AML</MenuItem>
                      <MenuItem value="M710">Exception Queue for Dedupe</MenuItem>
                      <MenuItem value="M910">Exception Queue for Distance Check</MenuItem>
                      <MenuItem value="M1010">Lead Data Approval</MenuItem>
                      <MenuItem value="M1015">Send Back Branch </MenuItem>
                      <MenuItem value="M015">FSE Manual Check</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className='col-3'>
                  <div className=' d-flex align-items-center p-1'>
                    <Button type="submit" className='bg-orenge ms-3' variant="contained" >Search</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='border mt-4'>
          <div className='col-4 p-3 d-flex'>

            <TextField id="outlined-basic" label="Search" variant="outlined" autoComplete='off' className='me-3' value={inputsearchValue}
              onChange={(e) => assigTableSearch(e.target.value)} fullWidth type="search"
            />

          </div>
          <form onSubmit={handleChangeAssigntask}>
            <Paper
              sx={{ width: '100%', mb: 2, overflow: 'hidden' }}
            >
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer sx={{ maxHeight: 440 }}>

                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                  stickyHeader aria-label="sticky table"
                >


                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    className="tableHead"
                  />

                  <TableBody>

                    {
                      stableSort(rows, getComparator(order, orderBy))
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
                              <TableCell>{row.f15}</TableCell>
                              <TableCell>{row.f4}</TableCell>
                              <TableCell>{row.f12}</TableCell>
                              <TableCell>{row.f11}</TableCell>
                              <TableCell>{row.f2}</TableCell>
                              <TableCell sx={{ display: "none" }} >{row.taskID}</TableCell>
                              <TableCell sx={{ display: "none" }}  >{row.currOwner}</TableCell>
                              <TableCell sx={{ display: "none" }}  >{row.currQueueID}</TableCell>
                              <TableCell sx={{ display: "none" }}  >{row.processID}</TableCell>
                            </TableRow>
                          );
                        })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}

                  </TableBody>
                </Table>
              </TableContainer>
              <div className='d-flex p-4 justify-content-center fw-bolder'>{noDataAvaiable}</div>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <>
              </>
            </Paper>

            <div className='d-flex justify-content-end p-3' >
              {/* <div  className='d-flex justify-content-end p-3'>
              <Checkbox
                                  color="primary"
                                />
                <div ><h5>:{index.username}</h5></div>
              </div> */}
              <FormControl sx={{ width: '20%' }} >
                <InputLabel >Assign To</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="userallocation"
                  name="select"
                  value={userallocation}
                  onChange={handleChangeUserallocation}
                >
                  <MenuItem value={''}>---------Select-------</MenuItem>
                  {userKey.map((userallocation, i) =>
                    <MenuItem key={i} value={userallocation}>{result[i]}</MenuItem>
                  )};

                </Select>
              </FormControl>
              <div className=' d-flex align-items-center p-1 update-btn '>
                <Button type="submit" className='ms-3' variant="contained" disabled={selected.length > 0 ? false : true}>Update</Button>
              </div>
              <div className=' d-flex align-items-center p-1  '>
                <Button type="submit" className='bg-orenge ms-2 ' variant="contained" onClick={onhandlecancel}>Cancel</Button>
              </div>
            </div>
            <Backdrop
              sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </form>
        </div>
      </div>
      <div>
      </div>

    </>
  );
}