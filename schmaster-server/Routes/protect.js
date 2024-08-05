const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config({path:'./config.env'});

const sendToken = (req,res) =>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
    const time = 7 * 24 * 60 * 60 * 1000
    const token = jwt.sign(data, jwtSecretKey,{
        expiresIn:'7d'
    });
    res.cookie('authToken', token, { secure:false, maxAge:time, httpOnly: true, sameSite:"strict" });
    res.status(200).send(token)
}



const authenticate = (req, res,next) => {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
    try {
        
        const token = req.cookies.authToken;
        
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            next()
        } else {
            return res.status(401).send('auth required');
        }
    } catch (error) {
        
        return res.status(401).send(error);
    }
    
};


module.exports = {
    sendToken,
    authenticate
}