import jwt from 'jsonwebtoken'
import 'dotenv/config';

const generateToken = username => {
    return jwt.sign(
        username,
        process.env.JWT_SECRET,
        { 
            expiresIn: process.env.JWT_EXPIRATION || 10 * 60 * 1000
        }
    );
}

export default generateToken;