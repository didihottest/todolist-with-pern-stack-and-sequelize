const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require('./util/databaseconnect')
const routes = require('./Router/routes')
// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// ROUTES 
app.use(routes)

// using native sql
//get all todos
// app.get("/todos", async (req, res) => {
//     try {
//         const allTodo = await pool.query("SELECT * FROM todo ORDER BY todo_id DESC");
//         res.json(allTodo.rows);
//     } catch (error) {
//         console.error(error.message)
//     }

// });

// // Create route
// app.post("/todos", async (req, res) => {
//     try {
//         const { description } = req.body;
//         console.log(description)
//         const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
//         res.json(newTodo.rows[0]);
//     } catch (error) {
//         console.log("error " + error.message);
//     }
// });

// // get a todo
// app.get("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
//         res.json(todo.rows[0]);
//     } catch (error) {
//         console.error(error.message)
//     }

// });
// // edit todo
// app.put("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const {
//             description
//         } = req.body;
//         const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
//         res.json("updated");
//     } catch (error) {
//         console.error(error.message)
//     }
// });
// // delet todo
// app.delete("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
//         res.json("Todo was deleted!");
//     } catch (error) { 
//         console.error("error delete" + error.message) 
//     }
// });

sequelize.sync()
    .then(app.listen(5000, console.log('server is running at port 5000')))
    .catch(error => { console.log(error) })