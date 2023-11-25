const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/dbConnect')
const authRouter = require("./routes/authRoute");
require('dotenv').config();
const PORT = process.env.PORT || 4000 ;
const app = express()

dbConnect();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());


app.use('/api/user', authRouter);


app.listen(PORT, () => {
    console.log(`Server is starting on ${PORT}`)
});