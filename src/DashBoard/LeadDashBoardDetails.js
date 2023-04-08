
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from 'react';
import Applicationtab from '../Components/ApplicationTab';
import OpportunityTab from '../Components/OpportunityTab';
import PrimaryBorrowerTab from '../Components/PrimaryBorrowerTab';
import CoBorrowerTab from '../Components/CoBorrowerTab';
import KycTab from '../Components/KycTab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EarningMember from '../Components/EarningMember'
import EarningMember2 from '../Components/EarningMember2'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function LeadDashBoardDetails(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = props.leadRecord

  return (
    <>
      <div className="card-body">
        <div className='Tabs'>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab className='tab-btn' label="Application" />
            <Tab className='tab-btn' label="Opportunity" />
            <Tab className='tab-btn' label="Primary Borrower" />
            <Tab className='tab-btn' label="Co-Borrower" />
            <Tab className='tab-btn' label="KYC" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <div className='row g-4 d-flex'>

              <Applicationtab leadRecord={data}></Applicationtab>
              {/* <div className='col-6'>
                <TextField id="outlined-basic" label="Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={data.status} fullWidth />
              </div> */}
            </div>
          </TabPanel>

          <TabPanel value={value} index={1}>
          <div className='row g-4'>

            <OpportunityTab leadRecord={data}></OpportunityTab>
            <div className='col-6'>
                   <TextField id="outlined-basic" InputLabelProps={{
                      shrink: true,
                    }} label="FSE Status" InputProps={{ readOnly: true, }}
                     variant="filled" autoComplete='off' multiline defaultValue={data.fseStatus || ""} fullWidth /> 
                     </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <div className='row g-4'>
              <PrimaryBorrowerTab leadRecord={data}></PrimaryBorrowerTab>
              <div className='col-6'>
                <TextField id="outlined-basic" label="AML Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={data.pcAMLStatus} fullWidth />
              </div>
              <div className='col-6'>
                <TextField id="outlined-basic" label="Dedupe Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={data.pcDedupeStatus} fullWidth />
              </div>
              <div className='col-6'>
                <TextField id="outlined-basic" label="CB Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={data.pcCbStatus} fullWidth />
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={3}>
            <div className='row g-4'>
              <CoBorrowerTab leadRecord={data}></CoBorrowerTab>
              <div className='col-6'>
                <TextField id="outlined-basic" label="AML Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={data.scAMLStatus} fullWidth />
              </div>
              <div className='col-6'>
                <TextField id="outlined-basic" label="Dedupe Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={data.scDedupeStatus} fullWidth />
              </div>
              <div className='col-6'>
                <TextField id="outlined-basic" label="CB Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={data.scCbStatus} fullWidth />
              </div>
              <>
                <EarningMember leadRecord={data}></EarningMember>
                <div className='col-6'>
                  <TextField id="outlined-basic" label="CB Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={data.em1CbStatus} fullWidth />
                </div>
                <EarningMember2 leadRecord={data}></EarningMember2>
                <div className='col-6'>
                  <TextField id="outlined-basic" label="CB Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={data.em2CbStatus} fullWidth />
                </div>
              </>
            </div>
          </TabPanel>

          <TabPanel value={value} index={4}>
            <KycTab leadRecord={data}></KycTab>
          </TabPanel>
          
        </div>
      </div>
    </>
  )
}

export default LeadDashBoardDetails;