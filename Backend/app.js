const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captionRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const errorHandler = require('./middlewares/errorHandler');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
app.use('/users', userRoutes);
app.use('/captains', captionRoutes);
app.use('/maps', mapsRoutes);

// Use the error handling middleware
app.use(errorHandler);

module.exports = app;