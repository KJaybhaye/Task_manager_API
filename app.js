const express = require("express");
const task_v1 = require("./routes/api_v1_tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandlers");

const port = process.env.PORT || 5000;

const app = express();

app.use(express.static("./public"));
// note express.json etc before routing with use
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/tasks", task_v1);

app.use(notFound);
app.use(errorHandler);


// routes
// app.get("/", (req, res) => {
//     res.status(200).send("task manager");
// });

// app.get("/hello", (req, res) =>{
//     res.status(200).send("task manager");
// });

// get all tasks
// app.get("/api/v1/tasks");
// new task
// app.post("/api/v1/tasks");

// get specific task
// app.get("/api/v1/tasks/:id");

// update and delet
// app.patch("/api/v1/task/:id");
// app.delete("/api/v1/tasks/:id");


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Listening at port ${port}`);
        });
    }
    catch(error){
        console.log(error);
    }
}

start();