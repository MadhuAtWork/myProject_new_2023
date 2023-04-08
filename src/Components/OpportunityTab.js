import TextField from '@mui/material/TextField';
import React from 'react';
import { useRef } from "react"


function Opportunity(props) {

  const onHandleLoanAmount = (e) => {
    const amountLoan = e.target.value
    props.ondata(amountLoan)
  }


  return (
    <>
      {/* <div className='row g-4'> */}
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Lead ID" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.leadId || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Loan Cycle" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.loanCycle || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Pincode" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.pincode || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Loan Amount"
          //  InputProps={{ readOnly: true, }} 
          onChange={onHandleLoanAmount}
          variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.loanAmount || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="City" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.city || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="State" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.state || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="Loan Purpose" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.loanPurpose || ""} fullWidth />
      </div>
      <div className='col-6'>
        <TextField id="outlined-basic" InputLabelProps={{
          shrink: true,
        }} label="CB Check" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.pcCbStatus || ""} fullWidth />
      </div>
      {/* <div className='col-6'>
          <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}   label="FSE Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.fseStatus || ""} fullWidth />
        </div> */}

      {/* </div> */}

    </>
  )
}
export default Opportunity;