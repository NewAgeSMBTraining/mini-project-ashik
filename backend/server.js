const dotenv = require('dotenv');
dotenv.config({path : "config/config.env"})

const connectDatabase = require("./config/database");

// connect to database
connectDatabase()

const app = require('./app');

const PORT = process.env.PORT || 3000

const server = app.listen(process.env.PORT, () => { console.log(`listening on port ${PORT}`)});