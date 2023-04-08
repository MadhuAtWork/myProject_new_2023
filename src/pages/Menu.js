import * as React from 'react';
import { useState, useEffect, useContext, createContext } from "react";
import SvgIcon from '@mui/material/SvgIcon';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faLock } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Groups2Icon from '@mui/icons-material/Groups2';

export const MyContext = React.createContext('');

function Mymenu(props) {
    const [navbar, setnavbar] = useState(false);
    const [menu, setMenu] = useState(false);
    const [Menudata, setMenudata] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const value = { name: 'John Doe' };
    const [Tryvalue, setTrayvalue] = useState()

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onhandlechange = () => {
        setnavbar(!navbar);
        setMenu(!menu);
    }

    const location = useLocation();
    const mainmenuList = location.state;

    useEffect(() => {
        console.log(mainmenuList);
        setMenudata(mainmenuList.menu);
    }, []);

    const categories = {};
    var menuName = "";

    Menudata.map((value, index) => {
        const item = { index, value }
        if (value.menuId % 100 == 0) {
            menuName = value.menuDesc;
        }
        else {
            if (menuName in categories) {
                categories[menuName].push(item);
            }
            else {
                categories[menuName] = [item];
            }
        }
    });

    const Icon = (category) => {
        if (category == "Operation Tray")
            return (
                <>
                    <HomeRepairServiceIcon className='me-1'></HomeRepairServiceIcon>
                </>
            );

        if (category == "Meeting Center")
            return (
                <>
                    <Groups2Icon className='me-1'></Groups2Icon>
                </>
            );

        if (category == "Reports")
            return (
                <>
                    <InsertDriveFileIcon className='me-1'></InsertDriveFileIcon>
                </>
            );

        if (category == "User Master")
            return (
                <>
                    <AccountCircleIcon className='me-1'></AccountCircleIcon>
                </>

            )
    }

    return (
        <>


            <MyContext.Provider value={[Tryvalue, setTrayvalue]}>
                <Header userdata={mainmenuList} />
                <div className="main">
                    <div className="menu">
                        <div className={navbar ? "sidenav" : "unset_sidenav"}>
                            <div className="menuIcon" onClick={onhandlechange}><FontAwesomeIcon icon={faBars} /></div>
                            {navbar ?
                                <>
                                    <Accordion >
                                        {
                                            Object.entries(categories).map((entry) => {
                                                const category = entry[0];
                                                const itemList = entry[1];
                                                return (
                                                    <Accordion.Item eventKey={category} key={category} >
                                                        <Accordion.Header >{Icon(category)}{category}</Accordion.Header>
                                                        <Accordion.Body className={menu ? "subMenu" : "subMenuClose"} onClick={onhandlechange}>
                                                            {itemList.map((item) => (
                                                                <div key={item.index} className="submenulist">
                                                                    <Link to={item.value.screenAction} state={mainmenuList}>
                                                                        {item.value.menuDesc}
                                                                    </Link>

                                                                </div>
                                                            ))}
                                                        </Accordion.Body>

                                                    </Accordion.Item>
                                                );
                                            })}
                                    </Accordion>
                                </>
                                :
                                <>
                                    <Accordion >
                                        {
                                            Object.entries(categories).map((entry) => {
                                                const category = entry[0];
                                                const itemList = entry[1];
                                                return (
                                                    <Accordion.Item eventKey={category} key={category} className='no-icon menu-icon' >
                                                    {/* <div className='title'>{category}</div> */}
                                                        <Accordion.Header onClick={onhandlechange}
                                                            data-title={category}
                                                        >{Icon(category)}</Accordion.Header>
                                                        <Accordion.Body className={menu ? "subMenu2" : "subMenuClose"}>
                                                            {itemList.map((item) => (<>
                                                                <div key={item.index}>
                                                                    <Link to={item.value.screenAction} state={mainmenuList}>
                                                                        {item.value.menuDesc}
                                                                    </Link>
                                                                </div>
                                                                
                                                            </>
                                                            ))}
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                );
                                            })}
                                    </Accordion>
                                </>
                            }
                        </div>
                    </div>
                    <div className={navbar ? "section" : "sectionclose"}>
                        <Outlet>
                        </Outlet>
                    </div>
                </div>
            </MyContext.Provider>
        </>
    )
}
export default Mymenu; 