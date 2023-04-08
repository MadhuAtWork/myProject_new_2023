import TextField from '@mui/material/TextField';
import React from 'react';




function  Applicationtab(props){

    return(
<>
  <div className='col-6'>
    <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }}  label="Product Code" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.productCode || ""} fullWidth />
  </div>
  <div className='col-6'>
    <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }} label="Area Code" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.areaCode || ""} fullWidth />
  </div>
  <div className='col-6'>
    <TextField id="outlined-basic"  InputLabelProps={{
            shrink: true,
          }}  label="Branch Code" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.branchCode || ""} fullWidth />
  </div>
  <div className='col-6'>
    <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }} label="Meeting Center Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.meetingCentreName || ""} fullWidth />
  </div>
  <div className='col-6'>
    <TextField id="outlined-basic"  InputLabelProps={{
            shrink: true,
          }}  label="MCL URN" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.mclUrn || ""} fullWidth />
  </div>
  <div className='col-6'>
    <TextField id="outlined-basic"   InputLabelProps={{
            shrink: true,
          }} label="AMCL URN" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.amclUrn || ""} fullWidth />
  </div>
  <div className='col-6'>
    <TextField id="outlined-basic"  InputLabelProps={{
            shrink: true,
          }}  label="Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.status || ""} fullWidth />
  </div>
  <div className='col-6'>
    <TextField id="outlined-basic"  InputLabelProps={{
            shrink: true,
          }}  label="No. of Customers" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.batchCount || ""} fullWidth />
  </div>
  <div className='col-6'>
    <TextField id="outlined-basic"  InputLabelProps={{
            shrink: true,
          }}  label="Batch Type" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.batchType || ""} fullWidth />
  </div>
  <div className='col-6'>
    <TextField id="outlined-basic"  InputLabelProps={{
            shrink: true,
          }}  label="Rate Of Interest" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.rateofInterest || ""} fullWidth />
  </div>
  <div className='col-6'>
    <TextField id="outlined-basic"  InputLabelProps={{
            shrink: true,
          }}  label="Tenure" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={props.leadRecord.tenure || ""} fullWidth />
  </div>
  </>
    )
}
export default Applicationtab;


