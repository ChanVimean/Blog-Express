import express from 'express';
import 'dotenv/config';
import pool from './src/database/db_connect.js';

// import Routes
import authRouter from './src/routes/authRoute.js'
import userRouter from './src/routes/userRoute.js';
import blogRouter from './src/routes/blogRouter.js';

const app = express();
const port = process.env.PORT || 8070;

// Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('public', express.static('uploads'));

// Database connection
pool.getConnection((err, connection) => {
    if (err) return console.log("Connection failed\n");

    console.log("Connection success\n");
    connection.release();
});


// Routes Middleware
app.use('/blog/auth/', authRouter);
app.use('/blog/user/', userRouter);
app.use('/blog/info', blogRouter);

// Testing route
app.get('/', (req, res) => {
    try {
        res.send('Server Route is working');
    } catch (error) {
        console.log(error);
        res.send("Server Route is not working");
    }
});


// Run Server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));