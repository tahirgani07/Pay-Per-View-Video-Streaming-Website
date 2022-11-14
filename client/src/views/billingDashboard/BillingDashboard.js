import React, { useState, useEffect } from 'react';
import userStore from '../../stores/userStore';
import Nav from '../home/Nav';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BillingDashboard.css";
import backendReq from '../../axios';

const BillingDashboard = () => {
    var [loading, setLoading] = useState(true);
    var [movieWatchtimes, setMovieWatchtimes] = useState([]);
    var [totalSeconds, setTotalSeconds] = useState(0);
    const user = userStore(state => state.user);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const chargePerMinute = 1;

    useEffect(() => {
        async function getData() {
            setLoading(true);
        
            const month = selectedDate.getMonth();
            const year = selectedDate.getFullYear();
            try {
                const request = await backendReq.get(`/bill/${year}/${month}`, {
                    params: {
                        email: user?.email,
                    }
                });
                
                setMovieWatchtimes(state => request.data.result);
                var value = 0;
                request.data.result.forEach(e => {
                    value += e.watchtime;
                });
                setTotalSeconds(state => value);
                setLoading(false);
            } catch(e) {
                alert(e?.response.data.message);
            } finally {
                if(!user) {
                    setMovieWatchtimes(state => []);
                    setTotalSeconds(state => 0);
                }
            }
        }
        getData();
    }, [selectedDate, user]);

    function onDatepickerRef(datepickerRef) { if (datepickerRef && datepickerRef.input) { datepickerRef.input.readOnly = true; } }

    return (
        <div className="billing_dashboard">
            <Nav alwaysFilled />

            <div className="bill_container">
                <div className="bill_header">
                    <h1 className="bill_title">Bills</h1>
                    <div className="dropdowns_container">
                    <DatePicker className="datepicker_input"
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    maxDate={Date.now()}
                    ref={datepickerRef => onDatepickerRef(datepickerRef)}
                    selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                    </div>
                </div>

                <div className="bill_content_container">
                    <h3>Estimated bill summary</h3>

                    <hr className="horizontal_divider" />

                    <div className="bill_content_header">
                        <div>
                            <h4>Total watchtime</h4>
                            <h3>{totalSeconds}s ({movieWatchtimes.length} {movieWatchtimes.length === 1 ? "movie" : "movies"})</h3>
                        </div>

                        <div>
                            <h4>Total service charges in Rs</h4>
                            <h3>Rs. {((totalSeconds*chargePerMinute)/60).toFixed(4)}</h3>
                        </div>
                    </div>

                    <hr />
                    {   movieWatchtimes.length > 0 ?
                        (<div className="bill_content">
                            <div className="bill_content_row first_row">
                                <h4>Movie name</h4>
                                <h4>Watchtime in seconds</h4>
                            </div>
                            
                            {
                                movieWatchtimes.map((movieWatchtime, index) => {
                                    return (
                                        <div className="bill_content_row" key={index}>
                                            <h4>{movieWatchtime.title}</h4>
                                            <h4>{movieWatchtime.watchtime}s</h4>
                                        </div>
                                    )
                                })
                            }
                        </div>)

                        : (<div></div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default BillingDashboard