const express  = require("express");
const dotenv = require("dotenv");
const { connection } = require("./config/db");
dotenv.config();
const {bookRouter} = require("./routes/Book.routes");
const {userRouter} = require("./routes/User.routes");
const app = express();


app.use(express.json());


app.use("/api" , userRouter);
app.use("/api" , bookRouter);

app.listen(process.env.PORT, async ()=>{
     try {
        await connection;
        console.log("connected to the database!!")
        
     } catch (error) {
         console.log("cannot connect to database!!" , error);
     }
     console.log(`server is running at port ${process.env.PORT}`)
})