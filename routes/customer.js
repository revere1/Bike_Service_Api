const express = require('express');
const router = express.Router();
const db = require('../config/db');
const queries = require('../config/queries');

router.get('/', (req, res) => {
    res.send('Customer Dashboard');
});

router.get('/login/:mobileNo', async (req, res) => {
    // if(req.param.mobileNo)
    if (req.params.mobileNo.length > 9) {

        var OTP = Math.floor((Math.random() * 9999) + 1111);

        try {
            db.query(queries.checkUser, [req.params.mobileNo], (error, result) => {
                console.log('error', error)
                console.log('result', result)
                if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });

                if (result.length > 0) {
                    db.query(queries.updateOtp, [OTP, req.params.mobileNo], (error, result) => {
                        if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });

                        res.json({ 'status': 200, 'Messages': OTP });
                    });
                } else {
                    console.log('else')
                    db.query(queries.createUser, [req.params.mobileNo, OTP], (error, result) => {
                        console.log(result)
                        if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });

                        res.json({ 'status': 200, 'OTP': OTP });
                    });
                }
            });
        } catch (error) {
            res.json({ 'status': 404, 'Message': 'Internal Server Error' });
        }
    } else {
        res.json({
            'status': 400,
            'Message': 'Mobile Number Should be 10 Digits!'
        });
    }

    // res.json(OTP)
});

router.post('/otp', (req, res) => {
    try {
        db.query(queries.checkUser, [req.body.otp, req.body.mobileNo], (error, result) => {
            if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });

            res.json({ 'status': 200, 'Message': 'Login Success' })
        });
    } catch (error) {
        res.json({
            'status': 400,
            'Message': 'Mobile Number Should be 10 Digits!'
        });
    }

});

router.get('/myProfile/:mobileNo', (req, res) => {
    try {
        db.query(queries.checkUser, [req.params.mobileNo], (error, result) => {
            if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });
            res.json({
                'status': 200,
                'response': result[0]
            });
        });
    } catch (error) {
        res.json({
            'status': 400,
            'Message': 'Mobile Number Should be 10 Digits!'
        });
    }

});
router.put('/updateProfile/:userId', (req, res) => {
    console.log(req.body)
    try {
        db.query(queries.updateProfile, [req.body.mobile_number, req.body.full_name, req.body.full_address, req.body.gender, req.body.dob, req.body.email, req.params.userId], (error, result) => {

            console.log(error)
            if (error) return res.json({ 'status': 500, 'Message': 'Unable to Connect Server' });

            return res.json({
                'status': 200,
                'Message': 'Profile Updated Successfully!'
            });
        });
    } catch (error) {
        console.log(error)
        return res.json({
            'status': 400,
            'Message': error
        });
    }

});
module.exports = router;