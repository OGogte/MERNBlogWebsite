const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('./models/User');


mongoose.connect(process.env.MY_MONGO_URL)

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET_KEY;


app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());


app.post('/register', async (req,res)=> {
    const {username,password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),
        });
        res.json({userDoc});
    } catch(e) {
        res.status(400).json(e);
    }
});


app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password,userDoc.password);
    if(passOk) {
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok');
        });
    } else {
        res.status(400).json('wrong credentials');
    }
})
app.listen(4000);