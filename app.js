require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const local_data = require('./mock_data');
const database = require('./config/db');
const User = require('./model/users');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser')
const app = express();


// app-level middlewares
app.use(cors());
app.use(cookieParser('cookieMessage'))
app.use(session({
    secret: process.env.SECRET || 'secret-k3y',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));



// variables
const PORT= process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
let notification_msg = [
    'Registration successful. You can now log in.',
    'Registration failed. Please try again.',
    'Login successful.',
    'Invalid email or password. Please try again.',
];




// app connection to Cloud Database
if (database) {
    app.listen(PORT, ()=>{
        console.log(`app running on  http://localhost:${PORT}`);
        console.log(`app running on  http://localhost:${PORT}/signup`);
        console.log(`app running on  http://localhost:${PORT}/signin`);
        console.log(`app running on  http://localhost:${PORT}/article`);
        console.log(`app running on  http://localhost:${PORT}/users`);
        console.log(`app running on  http://localhost:${PORT}/profile`);
    });
}else{
    console.error("Error connecting to the database");
}



/***********************************************
 *              ALL THE APP ROUTES
***********************************************/
// home page
app.get('/', (req, res)=>{
    
    let signupSuccessMsg = notification_msg[2];
    let signupErrorMsg = notification_msg[3];

    let success = req.flash('success');
    let error = req.flash('error');

        
    return res.render('index', {
        // showAlert: true,
        local_data, 
        success, 
        error,
        signupSuccessMsg, signupErrorMsg
    });
});


//signup page
app.get('/signup', (req, res)=>{
    res.render('sign-up');
});

app.post('/signup', async(req, res)=>{
    try {        
        let {username, email, password} = req.body;

        // convert username and email values to lowercase
        username = username.toLowerCase();
        email = email.toLowerCase();
        
        if (username && email && password) {
            // hash user's password for security purpose
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const new_user = User({
                username, 
                email, 
                password: hashedPassword
            });

            req.flash('success');
            req.flash('error');

            console.table({username, email, password, hashedPassword});

            await new_user.save();

            return res.redirect('/signin');
        }

    } catch (error) {
        console.log(error.message);
        res.status(400).json({error})
    }
});


//signin page
app.get('/signin', (req, res)=>{
    let signinSuccessMsg = notification_msg[0];
    let signinErrorMsg = notification_msg[1];
    
    let success = req.flash('success');
    let error = req.flash('error');
    res.render('sign-in', {success, error, signinSuccessMsg, signinErrorMsg});
});

app.post('/signin', async (req, res)=>{
    try {
        const {email, password} = req.body;

        // identify user by email
        const userEmail = await User.findOne({email});

        if (userEmail && (await bcrypt.compare(password, userEmail.password))) {
            console.table({email, password});

            req.flash('success');
            
            return res.redirect('/');
        }else{
            req.flash('error');
            return res.redirect('/signin')
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


// app.listen(PORT, ()=>{
//     console.log(`app running on  http://localhost:${PORT}`);
//     console.log(`app running on  http://localhost:${PORT}/signup`);
//     console.log(`app running on  http://localhost:${PORT}/signin`);
//     console.log(`app running on  http://localhost:${PORT}/article`);
//     console.log(`app running on  http://localhost:${PORT}/users`);
//     console.log(`app running on  http://localhost:${PORT}/profile`);
// });
