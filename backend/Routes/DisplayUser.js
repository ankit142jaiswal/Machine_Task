const  express = require('express');
const router = express.Router();
const ListView = require('../models/ListView');
const mongoose = require('mongoose');

router.post('/listview', ( req, resp)=>{
    try{
        console.log([global.list_view_data]);
        resp.send([global.list_view_data]);
    }
    catch(error){
        console.error(error.message);
        resp.send("Server Error")
    }
})



module.exports = router;