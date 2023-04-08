
import TextField from '@mui/material/TextField';
import React from 'react';

function CoBorrowerTab(props) {


    return (
        <>
            <div className='col-6'>
                <TextField id="outlined-basic"    InputLabelProps={{
            shrink: true,
          }} label="First Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.scFirstName || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}  label="Last Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.scLastName || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}  label="Gender" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.scGender || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}  label="DOB" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.scDob || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"    InputLabelProps={{
            shrink: true,
          }} label="Mobile No" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.scMobNo || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}  label="Jana Reference Id" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.secCustJanaRefId  || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}  label="Address" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.sc_address || ""} fullWidth />
            </div>
        </>
    )
}
export default CoBorrowerTab;
  