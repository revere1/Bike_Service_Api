const express = require('express');
const router = express.Router();
const db = require('../config/db');
const queries = require('../config/queries');

router.post('/create', (req, res, next) =>{

    try {
        db.query(queries.insertAddress, [req.body],(error, result) => {
            console.log(error)
            if(error) return res.json({'status': 500, 'Message': 'Unable to Connect Server'});

            return res.json({
                'status':201,
                'Message': 'Address Added Successfully'
            });
        });
    } catch (error) {
        return res.json({'status': 500, 'Message': 'Unable to Connect Server'});
    }
});

router.get('/:userId', (req,res,next) =>{

    try {
        db.query(queries.getAllAddress,[req.params.userId], (error, result) =>{
            if(error) return res.json({'status': 500, 'Message': 'Unable to Connect Server'});

            return res.json({
                'status': 200,
                'response':result
            });
        });
    } catch (error) {
        return res.json({'status': 500, 'Message': 'Unable to Connect Server'});
    }
});
router.get('/:userId/:addressId', (req,res,next) =>{

    try {
        db.query(queries.getSelectedAddress,[req.params.userId, req.params.addressId], (error, result) =>{
            console.log(error)
            if(error) return res.json({'status': 500, 'Message': 'Unable to Connect Server'});

            return res.json({
                'status': 200,
                'response':result
            });
        });
    } catch (error) {
        return res.json({'status': 500, 'Message': 'Unable to Connect Server'});
    }
});

router.put('/:addressId/:userId', (req,res,next) =>{
    try {
        let address = req.body;
        db.query(queries.updateAddress,[req.body,req.params.addressId,req.params.userId], (error, result) =>{
            if(error) return res.json({'status': 500, 'Message': 'Unable to Connect Server'});

            return res.json({
                'status':200,
                'Message': 'Address updated Successfully'
            });
        });
    } catch (error) {
        return res.json({'status': 500, 'Message': 'Unable to Connect Server'});
    }
});

router.delete('/:addressId', (req, res, next) =>{
    try {
        console.log('adrre',req.params.addressId);
        db.query(queries.deleteAddress,[req.params.addressId], (error, result) => {
            if(error) return res.json({'status': 500, 'Message': 'Unable to Connect Server'});
            
            return res.json({
                'status':200,
                'Message': 'Address deleted Successfully'
            });
        });
    } catch (error) {
        return res.json({'status': 500, 'Message': 'Unable to Connect Server'});
    }
});
module.exports = router;