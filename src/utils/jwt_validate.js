import jwt from 'jsonwebtoken';
import 'dotenv/config';

const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) return res.status(401).json({message: "Unauthorized"});

    const token = authHeader.split(' ')[1].trim();

    if(!token) return res.status(401).json({message: "Token: Null"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "Invalid token"});
        req.user = user;
        next();
    });
}

export default validateToken;