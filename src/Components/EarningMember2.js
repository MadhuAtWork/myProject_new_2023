import TextField from '@mui/material/TextField';
import React from 'react';

function EarningMember2(props){

    return(
        <>
            <br></br>
            <h4 className='text-orenge'>Earning Member 2:</h4>
        <div className='col-6'>
                <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}   label="First Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em2FirstName || ""} fullWidth />
            </div>
       
            <div className='col-6'>
                <TextField id="outlined-basic"    InputLabelProps={{
            shrink: true,
          }}  label="Last Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em2LastName || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}   label="Gender" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em2Gender || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"    InputLabelProps={{
            shrink: true,
          }}  label="DOB" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em2Dob || ""} fullWidth />
            </div>
            <div className='col-6'>
                <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}   label="Mobile No" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.em2MobNo || ""} fullWidth />
            </div>
            {/* <div className='col-6'>
                <TextField id="outlined-basic" label="Jana Reference Id" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.janaIdBorrower || ""} fullWidth />
            </div> */}
        </>
    )
}

export default EarningMember2; 

