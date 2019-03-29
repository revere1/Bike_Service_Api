const express = require('express');
const router = express.Router();
const db = require('../config/db');
const queries = require('../config/queries');

router.post('/', (req, res, next) => {
    try {
        db.query(queries.InActiveBookings, [req.body.id_user], (error, result) => {
            if(error) return res.json({'status': 500, 'Message': 'Unable to Connect Server'});
            req.body.status = 'Active';
            db.query(queries.createBookings, [req.body], (error, result) => {
                console.log(error)
                if(error) return res.json({'status': 500, 'Message': 'Unable to Connect Server'});
    
                return res.json({
                    'status':201,
                    'Message': 'Address Added Successfully'
                });
            });
        });

    } catch (error) {
        return res.json({'status': 500, 'Message': 'Unable to Connect Server'});   
    }
});

router.get('/:userId', (req, res, next) => {
    try {
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

module.exports = router;