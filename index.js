const express = require('express');
const path = require('path');    
const ejs = require('ejs');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");


mongoose.connect('mongodb://127.0.0.1:27017/secure-media-vault-ex')
.then((e)=> console.log("MongoDB Connected"));

const staticRouter = require("./routes/staticRoute");
const userRouter = require("./routes/user");
const deleteRouter = require("./routes/delete");
const adminRouter = require("./routes/admin");

const { checkForAuthenticationCookie } = require('./middlewares/auth');
const isAdmin = require("./middlewares/admin");
const app = express();

const PORT = 8000;

app.set("view engine","ejs")
app.set("views", path.resolve("views"));


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));


app.use("/", staticRouter);
app.use("/user", userRouter);
app.use('/delete', deleteRouter);
app.use('/admin', isAdmin(), adminRouter)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));