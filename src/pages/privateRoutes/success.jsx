import React, { useState, useEffect } from 'react';
import Styles from './success.module.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { checkoutUpdate } from '../../apis/apiRequest';
import { useDispatch } from 'react-redux';
import { getCart } from '../../reduxStore/cartSlice';
import { Paper } from '@mui/material';

function Success() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [update, setUpdate] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const { session_id } = useParams();

    useEffect(() => {
        if (location.pathname === `/success/${session_id}`) {

            const updateCheckout = async (session_id) => {
                try {
                    const response = await checkoutUpdate(session_id);
                    if (response.success) {
                        setUpdate(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            updateCheckout(session_id);
        }
    }, [location.pathname, session_id, dispatch, getCart, setCountdown]);

    useEffect(() => {
        if (update) {
            dispatch(getCart());
            const countdownTimer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
                if (countdown === 0) {
                    clearInterval(countdownTimer);
                }
            }, 1000);

            const redirectTimer = setTimeout(() => {
                navigate('/orders');
            }, 5000);

            return () => {
                clearTimeout(countdownTimer);
                clearTimeout(redirectTimer);
            };
        }
    }, [update, navigate, getCart, countdown, dispatch])

    return (
        <div>
            <Paper elevation={5} className={Styles.container}>
                <div className={Styles.contentContainer}>
                    <div>
                        <h3>You have paid!</h3>
                    </div>
                    <div>
                        <img src='/photos/logo2.jpg' alt='Image of Logo' />
                    </div>
                    {update ? (
                        <p>The you will be re-directed to your orders in {countdown}</p>
                    ) : (
                        null
                    )}
                </div>
            </Paper>
        </div>
    )
}

export default Success;