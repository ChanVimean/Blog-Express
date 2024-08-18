import jwt from 'jsonwebtoken'
import 'dotenv/config';

const generateToken = username => {
    return jwt.sign(
        username,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
}

export default generateToken;