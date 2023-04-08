import TextField from '@mui/material/TextField';
import React from 'react';

function KycTab(props) {


  return (
    <>
      <div className='Borrower p-3 border mb-4'>
        <div className='row g-4'>
          <h4 className='text-orenge'>Borrower</h4>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Primary ID Type " InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.primaryCustIdType1} fullWidth />
          </div>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Primary ID Value" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.primaryCustIdVal1} fullWidth />
          </div>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Secondary ID Type" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.primaryCustIdType2} fullWidth />
          </div>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Secondary ID Value" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.primaryCustIdVal2} fullWidth />
          </div>
        </div>
      </div>

      <div className='Co-Borrower p-3 border mb-4'>
        <div className='row g-4'>
          <h4 className='text-orenge'>Co-Borrower</h4>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Primary ID Type " InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.secCustIdType1} fullWidth />
          </div>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Primary ID Value" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.secCustIdVal1} fullWidth />
          </div>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Secondary ID Type" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.secCustIdType2} fullWidth />
          </div>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Secondary ID Value" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.secCustIdVal2} fullWidth />
          </div>
        </div>
      </div>

      <div className='Earning-Member-1 p-3 border mb-4'>
        <div className='row g-4'>
          <h4 className='text-orenge'>Earning Member 1</h4>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Primary ID Type " InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em1IdType} fullWidth />
          </div>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Primary ID Value" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em1IdValue} fullWidth />
          </div> 
        </div>
      </div>

      <div className='Earning-Member-2 p-3 border mb-4'>
        <div className='row g-4'>
          <h4 className='text-orenge'>Earning Member 2</h4>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Primary ID Type " InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em2IdType} fullWidth />
          </div>
          <div className='col-6'>
            <TextField id="outlined-basic" InputLabelProps={{
              shrink: true,
            }} label="Primary ID Value" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em2IdValue} fullWidth />
          </div> 
        </div>
      </div>

    </>
  )
}
export default KycTab;