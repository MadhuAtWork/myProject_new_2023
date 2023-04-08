import * as React from 'react'; 
import Mymenu from './Menu';
import Header from './Header';
import Footer from './Footer';
import {useLocation} from 'react-router-dom';

function Dashboard() {

  return (
    <div className="App">
      <div className="sidebarcontainer">       
        <Mymenu></Mymenu>
        </div>
      <div className='containerFooter'><Footer/></div>
    </div>
  );
}

export default Dashboard;