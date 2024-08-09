const express = require('express');
const http = require('http');
const serverlessHttp = require('serverless-http');
const { initSocket } = require('./socket');
const authRouter = require('./Routes/authRouter'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const streaksRouter = require('./Routes/streaksRouter');
const mongoose = require("mongoose");
// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'authToken'],
    credentials: true 
};

const app = express();
const server = http.createServer(app);
const io = initSocket(server);
console.log('Socket.IO initialized');


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/streaks', streaksRouter);

const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});

mongoose
.connect("mongodb+srv://shreykc1:shreejibapa@cluster0.ohtzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Database Connected!"));


module.exports = app;
