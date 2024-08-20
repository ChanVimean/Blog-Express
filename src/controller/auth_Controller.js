import pool from "../database/db_connect.js";
import generateToken from "../utils/token_gen.js";
import bcrypt from 'bcrypt';
import { isPasswordValid } from "../utils/pass_verify.js";
import 'dotenv/config';

// Register
export const userRegisterController = async (req, res) => {
    const { username , email, password } = req.body;
    const image = req.file;
    
    // Encrypt password
    const randomSalt = await bcrypt.genSalt(parseInt(process.env.ROUND_NUMBER));
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    // Insert User -> Database
    if (username && email && hashedPassword && image){
        const sql = `INSERT INTO table_user (username, email, password, profile) VALUES (?, ?, ?, ?)`;
        const insertValue = [username, email, hashedPassword, image.filename];

        pool.query(sql, insertValue, (err, result) => {
            if (err) return res.status(500).json({message: "Failed to register"});
            res.status(200).json({
                message: "Successfully registered",
                token: generateToken({ username })
            });
        });
    }else{
        res.status(403).json({
            error: "Please provide information for all required fields"
        });
    }
}

// Login
export const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    if(email && password){
        const sql = `SELECT * FROM table_user WHERE email = ?`;

        pool.query(sql, email, (err, row) => {
            if (err) return res.status(500).json({message: "Failed to login"});
            if(row){
                const isMatch = isPasswordValid(password, row[0].password);
                if(isMatch){
                    const username = row[0].username;
                    const token = generateToken({ username });
                    res.status(200).json({
                        message: "Login successful",
                        token: token
                    });
                }
            }
        });
    }else{
        return res.status(401).json({
            message: "Please provide information for all required fields"
        });
    }
   
}