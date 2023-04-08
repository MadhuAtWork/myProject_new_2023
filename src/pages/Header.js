import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleUser,faCalendarDays,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/img/jana-logo-png.png';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
 
export default function Header(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const Navigate = useNavigate()

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        Navigate("/");
    };



    return (<>
        <div className='mb-0'>
            <div className="mainheader"><div> <img className="w-50" src={Logo} /></div>
                <div>
                    <Button
                        id=""
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <FontAwesomeIcon icon={faCircleUser} /><span className='ms-2'>
                        {props.userdata.message}   
                        </span>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': '',
                        }}
                    >
                        <MenuItem >
                        <FontAwesomeIcon icon={faCalendarDays} /> <span className='mx-2'> Current Login :
                        {props.userdata.currentLoginDt}
                        </span>                          
                        </MenuItem>
                        <hr />
                        <MenuItem >
                        <FontAwesomeIcon icon={faCalendarDays} /><span className='mx-2'> Last Login :
                        {props.userdata.lastLoginDt}
                        </span>                      
                        </MenuItem>
                        <hr />
                        <MenuItem onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} /><span className='mx-2'>Logout</span>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
        
    </>
    );
}