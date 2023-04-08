import React from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import errorImg from "../assets/img/error.png";
import Button from '@mui/material/Button';
import {  Link } from "react-router-dom";


function Error() {
    return (
        <>
            <div className='error'>
                <div className="container">
                    <img className="error-img" src={errorImg} />
                    <p className="error-message">Oops! The page you were looking for couldn't be found.</p>
                    <Button type="submit" className='bg-pink' variant="contained" size="large" >
                    <Link to='/' >Back To Login Page </Link>          
                    </Button>     
                </div>
            </div>
        </>
    );
}

export default Error;