import { useState} from "react";
import TextField from '@mui/material/TextField';
import { fetchUrl } from '../Config';

const BaseURL = fetchUrl;
const untagOppURL = '/untagOpp'

function RemarksOpptunities(props) {
  const [remaksDeleteOppurtunities ,setRemaksDeleteOppurtunities] = useState('')

  const onHandleRemarkOpputinties = (e) =>{
    setRemaksDeleteOppurtunities(e.target.value)
   }
   
  const onHandleDeleteOpputunities = async(e) => {
  
    e.preventDefault()
    const requestmargeUrn = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "urn": props.urnOpputnities,
        "appNO": props.ApplicationNo,
        "remarks": remaksDeleteOppurtunities,
        "userId": props.username
      })
    }
   await fetch(BaseURL + untagOppURL, requestmargeUrn)
      .then(response => response.json())
      .then((response) => {
        console.log(response.Success) 
        alert(response.Success)
        window.location.reload()
        setRemaksDeleteOppurtunities('')
      })
     
}

  return (
    <>
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Remark</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div className='col-12'>
              <TextField fullWidth id="outlined-basic" label="Remarks"
              onChange={onHandleRemarkOpputinties} value={remaksDeleteOppurtunities || ""}
              variant="outlined" multiline rows={3} />
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn bg-orenge" onClick={onHandleDeleteOpputunities}>Save</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RemarksOpptunities ;