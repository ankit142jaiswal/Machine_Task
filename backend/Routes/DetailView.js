const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



router.post('/detailview/:title',async (req, resp) => {
    try {
        const user_profile =  await mongoose.connection.db.collection('listviews')
        await user_profile.find({title:req.params.title}).toArray().then(
            async(data,err)=>{
                if(err){
                    console.log("---",err);
                }else{                    
                    if (data.length > 0) {
                        console.log(data)
                        // return resp.json({success:true});
                        return resp.send([data]);
                    }
                    else {
                        return resp.json({ success: false });
                    }
                }
            })
      
    } catch (error) {
        console.error(error.message);
        resp.send("Server Error");
    }
})
module.exports= router;