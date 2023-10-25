require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const local_data = require('./mock_data');


// app-level middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// variables
const PORT= process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;



/***********************************************
 *              ALL THE APP ROUTES
***********************************************/
// home page
app.get('/', (req, res)=>{
        // res.status(200).json(local_data[1])
        let x = local_data[1]['posts'][0]['author_id'];
        console.log(`from from '/' route --->  users id  = ${x}`)
    return res.render('index', {local_data});
});


//signup page
app.get('/signup', (req, res)=>{
    res.render('sign-up');
});
app.post('/signup', (req, res)=>{
    try {
        
        const {username, email, password} = req.body;

        if (username && email && password) {
            console.table({username, email, password});
            return res.status(201).json({username, email, password});
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error})
    }
});


//signin page
app.get('/signin', (req, res)=>{
    res.render('sign-in');
});

app.post('/signin', (req, res)=>{
    try {
        const {email, password} = req.body;

        if (email && password) {
            console.table({email, password});
            return res.status(201).json({email, password});
        }

    } catch (error) {
        console.log(error.message);
        res.status(400).json({error})
    }
});


//article page
app.get('/article', (req, res)=>{
    const id = req.params.id;
    return res.render('article', {local_data, id});
});


//users page
app.get('/users', (req, res)=>{
    try {
        // res.status(200).json(local_data[0])
        return res.render('users', {local_data});
    } catch (error) {
        return
    }
});


//profile page
app.get('/profile/:id', (req, res)=>{
    const id = req.params.id;
    // console.log(local_data[0]['users'][Number(id)])
    // res.status(200).json(local_data[0]['users'][0]);
    return res.render('profile', {local_data, id});
});


// 404 page
app.use((req, res)=> {
    res.render('404');
});


app.listen(PORT, ()=>{
    console.log(`app running on  http://localhost:${PORT}`);
    console.log(`app running on  http://localhost:${PORT}/signup`);
    console.log(`app running on  http://localhost:${PORT}/signin`);
    console.log(`app running on  http://localhost:${PORT}/article`);
    console.log(`app running on  http://localhost:${PORT}/users`);
    console.log(`app running on  http://localhost:${PORT}/profile`);
});