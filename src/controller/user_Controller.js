import pool from '../database/db_connect.js'

export const getAuthUserController = (req, res) => {
    
    try{
        const authenticatedUsername = req.user.username;
        const sql = `SELECT * FROM table_user WHERE username = ?`;

        pool.query(sql, authenticatedUsername, (err, row) => {
            if (err) return res.status(500).json({message: "Can't reach database"});
            res.status(200).json({
                message: "Successfully getting user information",
                data: row
            });
        });

    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}