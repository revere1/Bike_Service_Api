const express = require('express');
const router = express.Router();
const db = require('../config/db');
const queries = require('../config/queries');

router.post('/', (req, res, next) => {
    try {
        db.query(queries.createBookings, [req.body], (error, result) => {
            console.log(error)
            if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });

            return res.json({
                'status': 201,
                'Message': 'Address Added Successfully'
            });
        });

    } catch (error) {
        return res.json({'status': 500, 'Message': 'Unable to Connect Server'});   
    }
});

router.get('/:userId', (req, res, next) => {
    try {
        console.log('orderuser',req.params.userId)
        db.query(queries.getAllBookings, [req.params.userId], (error, result) => {
            if(error) return res.json({'status': 500, 'Message': 'Unable to Connect Server'});

            return res.json({
                'status':200,
                'result': result
            });
        });
    } catch (error) {
        return res.json({'status': 500, 'Message': 'Unable to Connect Server'});   
    }
});

router.get('/details/:userId/:bookId', (req, res, next) => {
    try {
        db.query(queries.getSelectedBookingDetails, [req.params.bookId, req.params.userId], (error, result) => {
            if(error) return res.json({'status': 500, 'Message': 'Unable to Connect Server'});

            return res.json({
                'status':200,
                'result': result[0]
            });
        });
    } catch (error) {
        console.log(error)
        return res.json({'status': 500, 'Message': 'Unable to Connect Server'});   
    }
});
router.get('/history/:userId', (req, res, next) => {
    try {
        db.query(queries.getAllHistoryBookings, [req.params.userId], (error, result) => {
            if(error) return res.json({'status': 500, 'Message': 'Unable to Connect Server'});

            return res.json({
                'status':200,
                'result': result
            });
        });
    } catch (error) {
        return res.json({'status': 500, 'Message': 'Unable to Connect Server'});   
    }
});

router.patch('/cancel/:userdId/:bookId', (req, res, next) => {
    try {
        db.query(queries.cancelBookings, [req.params.bookId, req.params.userdId], (error, result) => {
                console.log(error)
                if(error) return res.json({'status': 500, 'Message': 'Unable to Connect Server'});
    
                return res.json({
                    'status':200,
                    'Message': 'Booking Service Canceled Successfully'
                });
        });
    } catch (error) {
        return res.json({'status': 500, 'Message': 'Unable to Connect Server'});   
    }
});

module.exports = router;