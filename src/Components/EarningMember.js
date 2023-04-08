import TextField from '@mui/material/TextField';
import React from 'react';

function EarningMember(props){

    return(
        <>
        <h4 className='text-orenge'>Earning Member 1:</h4>
        <div className='col-6'>
                <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}  label="First Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em1FirstName || ""} fullWidth />
            </div>
           
            <div className='col-6'>
                <TextField id="outlined-basic"  InputLabelProps={{
            shrink: true,
          }}   label="Last Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em1LastName || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"  InputLabelProps={{
            shrink: true,
          }}   label="Gender" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em1Gender || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}  label="DOB" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em1Dob || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}  label="Mobile No" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em1MobNo || ""} fullWidth />
            </div>
            {/* <div className='col-6'>
                <TextField id="outlined-basic" label="Jana Reference Id" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.janaIdBorrower || ""} fullWidth />
            </div> */}
    
        </>
    )
}

export default EarningMember; 
