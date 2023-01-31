require("dotenv").config();
require("express-async-errors");

const express = require("express");
const fileUpload = require('express-fileupload')
const app = express();

//* db connection
const { connectDB } = require("./database/db")
const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI

//* authentication 
const { authenticateUser } = require("./middleware/authentication")
//* authenticateUser middleware'i login-register haricindeki her istekten once calismak zorunda

//* routers 
const authRouter = require("./routes/auth")
const qrRouter = require("./routes/qr_code")

//* error handler 
const notFoundMiddleware = require("./middleware/not_found")
const errorHandlerMiddleware = require("./middleware/error_handler");


//* app json usage
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

//* activate routers 
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/qr", authenticateUser, qrRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware) //* her yerden once calısır veya sonra :)  

const start = async () => {
    try {
        await connectDB(uri);
        app.listen(port, () => {
            console.log(`app has started on port ${port} number`);
        })
    } catch (error) {
        console.log(error);
    }
}


start();