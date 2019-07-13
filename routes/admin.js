const express = require('express');
const router = express.Router();
const db = require('../config/db');
const queries = require('../config/queries');


router.get('/adminLogin/:mobileNo', async (req, res) => {
    console.log("This is params: " + req.params.mobileNo.length)
    if (req.params.mobileNo.length < 10) {
        res.json({
            'status': 400,
            'Message': 'Mobile Number Should be 10 Digits!'
        });
    }

    try {
        var OTP = Math.floor((Math.random() * 9999) + 1111);
        db.query(queries.checkAdmin, [req.params.mobileNo], (error, result) => {
            console.log('error', error)
            console.log('result', result.length)
            if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });
            if(result && result.length > 0){
                db.query(queries.updateAdminOtp, [OTP, req.params.mobileNo], (error, result) => {
                    if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });
    
                    res.json({ 'status': 200, 'Messages': OTP });
                });
            } else {
                res.json({ 'status': 400, 'Message': 'You are not an Admin' });
            }

        });
    } catch (error) {
        res.json({ 'status': 500, 'Message': 'Internal Server Error' });
    }

    // res.json(OTP)
});

router.get('/adminOtp/:otp/:mobileNo', (req, res) => {
    try {
        db.query(queries.loginAdminOtp, [req.params.otp, req.params.mobileNo], (error, result) => {
            console.log(result)
            if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });

            if (result.length > 0) {
                res.json({ 'status': 200, 'Message': 'Login Success', 'payLoad': result[0] });
            } else {
                res.json({ 'status': 404, 'Message': 'Please Send Valid OTP' });
                // throw error;
            }
        });
    } catch (error) {
        res.json({
            'status': 500,
            'Message': 'Unable to Connect Server'
        });
    }

});
//active status booking
router.get('/bookings/listAll/:status', (req, res) => {
    try {
        db.query(queries.adminBookings, [req.params.status], (error, result) => {
            if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });

            return res.json({
                'status': 200,
                'result': result
            });
        });
    } catch (error) {
        return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });
    }

});

router.get('/bookings/byDate', (req, res) => {
    try {
        db.query(queries.adminDateBookings, [req.query.startDate, req.query.endDate], (error, result) => {
            if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });

            return res.json({
                'status': 200,
                'result': result
            });
        });
    } catch (error) {
        return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });
    }
});

router.patch('/closeBooking/:bookingId', async (req, res) => {
    try {
        db.query(queries.closeAdminBooking,[req.params.bookingId], (error, result) =>{
            if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });

            return res.json({
                'status': 200,
                'result': 'Booking Service Closed Successfully!'
            });
        });
    } catch (error) {
        return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });
    }
});

router.get('/bookings/filter', async (req, res) => {
    try {
        let queryString = ''
        const groupBy = ' GROUP BY bs.id_book_services';
        const data = req.query;
        const { startDate, endDate, status } = data;
        const start = JSON.stringify(startDate);
        const end = JSON.stringify(endDate);
        const statuss = JSON.stringify(status);
        console.log(status)
        if (startDate !== "null" && endDate !== "null" && status !== "null") {
            queryString = ` WHERE bs.day_slot BETWEEN CAST(${start} AS DATE) AND CAST(${end} AS DATE) AND bs.status=${statuss}`;
        }
        if (startDate !== "null" && endDate !== "null" && status === "null") {
            queryString = ` WHERE bs.day_slot BETWEEN CAST(${start} AS DATE) AND CAST(${end} AS DATE)`;
        }
        if (status !== "null" && endDate === "null" && startDate !== "null") {
            queryString = ` WHERE bs.day_slot = ${start} AND bs.status=${statuss}`;
        }
        if (status !== "null" && startDate === "null" && endDate === "null") {
            queryString = ` WHERE bs.status=${statuss}`;
        }
        console.log('queryString', queryString)
        await db.query(queries.adminFilterBookings + queryString + groupBy, (error, result) => {
            console.log(error)
            if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });

            return res.json({
                'status': 200,
                'result': result
            });
        });
    } catch (error) {
        console.log(error)
        return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });
    }
});

module.exports = router;