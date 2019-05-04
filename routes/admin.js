const express = require('express');
const router = express.Router();
const db = require('../config/db');
const queries = require('../config/queries');

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