import pool from '../database/db_connect.js';

// Get/Show all blog
export const getAllBlogController = (req, res) => {
    const authenticatedUsername = req.user.username;
    const sql = `SELECT b.* FROM table_user u INNER JOIN table_blog b ON u.id = b.user_id WHERE u.username = ?`;

    pool.query(sql, authenticatedUsername, (err, rows) => {
        if (err) console.log("Error getting blog: ", err);
        if (err) return res.status(500).json({
            message: "Oops! Data fetch failed. Please try again later."
        });

        res.status(200).json({
            message: "All blogs retrieved successfully",
            user: authenticatedUsername,
            data: rows
        });
    });
}

// Post/Create a new blog
export const createBlogController = (req, res) => {
    const authenticatedUsername = req.user.username;
    const image = req.file;
    const { title , category , type , description} = req.body;

    const sql = `SELECT id FROM table_user WHERE username = ?`;

    // 1st Query: Confirm user existence
    pool.query(sql, authenticatedUsername, (err, row) => {

        if (err) return res.status(500).json({
            message: "Data retrieval error. We're working on it."
        });

        console.log("Error: ", err);
        console.log(image);

        // Error Handler: Check for missing fields
        if (!title && !category && !type && !description && !image){
            return res.status(400).json({
                message: "All fields are required to create a blog."
            });
        }

        // 2nd Query: INSERT user data into database
        const sql_insert = `INSERT INTO table_blog (title, category, type, description, banner_image, user_id)
                            VALUES (?, ?, ?, ?, ?, ?)`;
        const insertData = [title, category, type, description, image.filename, row[0].id];

        // console.log(insertData);
        // console.log(row[0].id);

        pool.query(sql_insert, insertData, (err, result) => {
            if (err) console.error("Error creating blog: ", err);
            if (err) return res.status(500).json({
                message: "Failed to create a new blog."
            });

            res.status(200).json({
                message: "Blog created successfully",
                result
            });
        });
    });
}

// Put/Edit selected id
export const editBlogController = (req, res) => {
    const authenticatedUsername = req.user.username;
    const { id } = req.params;
    const { title , category , type , description , image } = req.body;

    // Error Handler: Check for missing fields
    if (!title && !category && !type && !description && !image){
        return res.status(400).json({message: "Missing required fields"});
    }

    // Update database
    const sql = `UPDATE table_blog SET title = ?, category = ?, type = ?,
                 description = ?, banner_image = ? WHERE id = ? AND user_id = 
                 (SELECT id FROM table_user WHERE username = ?)`;
    const insertValue = [
        title, category, type, description, image, id, authenticatedUsername
    ];

    // console.log(insertValue);
    // console.log("ID: ", id);

    pool.query(sql, insertValue, (err, result) => {
        if (err) console.error("Error updateing blog: ", err);
        if (err) return res.status(500).json({message: "Invalid data provided."});
        res.status(200).json({
            message: "Blog updated successfully",
            updatedBlog: {
                id: result.affectedRows,
                title,
                category,
                type,
                description,
                banner_image: image
            }
        });
    });
}

// Delete selected id
export const deleteBlogController = (req, res) => {
    const authenticatedUsername = req.user.username;
    const { id } = req.params;

    const sql = `DELETE FROM table_blog WHERE id = ? AND 
                 user_id = (SELECT id FROM table_user WHERE username = ?)`;
    const insertValue = [id, authenticatedUsername];

    pool.query(sql, insertValue, (err, result) => {
        if (err) console.log("Error deleting blog: ", err);
        if (err) return res.status(500).json({message: "Operation failed."});

        res.status(200).json({ message: "Blog deleted successfully" });
    });
}
