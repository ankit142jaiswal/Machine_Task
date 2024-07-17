const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisEndtoEndYoutubeChannel$#";

router.post('/createuser',
    [
        body('email').isEmail(),
        // body('name').isLength({ min: 5 }),
        body('password', 'Incorrect Password').isLength({ min: 5 })
    ]
    ,
    async (req, resp) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() })
        }
        const salt = await bcrypt.genSalt(10);
        let email = req.body.email;
        let password= req.body.password;
        let password1= req.body.password1;

        let secPassword = await bcrypt.hash(req.body.password ,salt)
        let secPassword1 = await bcrypt.hash(req.body.password1 ,salt)
        try {
            let userData = await User.findOne({email}); 
            if (userData){            
                return resp.status(400).json({ errors: "Email Alredy in Use !! Try SingUp with Other Email" });

            }
            if (password != password1){
            return resp.status(400).json({ errors: "Password Missmatch ! Please Enter same Password" });

            }
            else{

                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password : secPassword,
                    password1: secPassword1,                  
              

            })
           return resp.json({ success: true });
        }

        } catch (error) {
            console.log(error)
            return resp.json({ success: false });


        }


    })

router.post('/loginuser',
    [
        body('email').isEmail(),
        body('password', 'Incorrect Password').isLength({ min: 5 })
    ]
    ,
    async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() })
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return resp.status(404).json({ errors: "Try logging with correct credential" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return resp.status(404).json({ errors: "Try logging with correct Credentials" });

            } else {
                const data = {
                    user: {
                        id: userData.id
                    }
                }
                const authToken= jwt.sign(data, jwtSecret)
                return resp.json({success : true , authToken: authToken});

            }
        }catch(error){
            console.log(error)
            resp.json({succes: fasle})
        }
    }
)

module.exports = router;