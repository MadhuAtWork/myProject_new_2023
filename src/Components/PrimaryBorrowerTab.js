
import TextField from '@mui/material/TextField';
import React from 'react';

function PrimaryBorrowerTab(props) {


  return (
    <>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="URN" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.urn || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="First Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.firtName || ""} fullWidth />
      </div>
      {/* <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Middle Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.middleName || ""} fullWidth />
      </div> */}
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Last Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.lastName || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="DOB" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.dateofBirth || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Mobile No" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.mobileNo || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Agriculture Land" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.agriLand || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Age" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.age || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Annual Income" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.annualIncome || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Gender" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.gender || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Marital Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.maritalStatus || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Permanent Address" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.permanentAddres || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Present Address" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.presentAddress || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Jana Reference Id" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.janaIdBorrower || ""} fullWidth />
      </div>
    </>
  )
}
export default PrimaryBorrowerTab;