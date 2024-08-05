const express = require('express');

const authRouter = require('./Routes/authRouter'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const streaksRouter = require('./Routes/streaksRouter')


// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'authToken'],
    credentials: true 
  };
  


const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/auth',authRouter);
app.use('/streaks',streaksRouter)





module.exports = app;