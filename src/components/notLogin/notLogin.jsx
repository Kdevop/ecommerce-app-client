import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Styles from './notLogin.module.css'
import { Paper } from '@mui/material';

function NotLogin() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const countdownTimer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown === 1) {
                    clearInterval(countdownTimer);
                    navigate('/');
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    
        return () => {
            clearInterval(countdownTimer);
        };
    }, [navigate]);


    return (
        <div >
            <Paper >
                <div className={Styles.topcontainer}>
                    <h3>Are you signed into Your Account?</h3>
                    <div>
                        <img src='./photos/logo2.jpg' alt='Image of Logo' />
                    </div>
                    <div>
                        <p>You should be redirected home in {countdown}.</p>
                        <p>If you want to sign in, you can do this using the menu at the top.</p>
                    </div>
                    <div>
                        <p>If you are not redirected, you can use the links below:</p>
                        <ul className={Styles.register}>
                            <li><NavLink to='/'>Link to Home Page</NavLink></li>
                        </ul>
                    </div>
                </div>
            </Paper>
        </div>
    )
};

export default NotLogin;