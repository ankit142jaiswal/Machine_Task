const  express = require('express');
const ListView = require('../models/ListView');
const router = express.Router();


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


router.post('/detailview/:id', async( req, resp)=>{
    try{
        let data = await ListView.findById(req.params);
        console.log([data]);
        return resp.json([data]);
    }
    catch(error){
        console.error(error.message);
        resp.send("Server Error")
    }
})

module.exports = router;