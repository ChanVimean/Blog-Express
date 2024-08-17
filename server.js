import express from 'express';
import 'dotenv/config';
import pool from './src/database/db-connect.js';

const app = express();
const port = process.env.PORT || 8070;

// Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Database connection
pool.getConnection((err, connection) => {
    if (err) return console.log("Connection failed\n");

    console.log("Connection success");
    connection.release();
});


// Routes Middleware



// Run Server
app.listen(port, () => console.log(`Server running http://localhost:${port}`));