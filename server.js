const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const InITRoutes = require('./routes/InITRoutes');
const pdfRoutes = require('./routes/pdfRoutes'); // Import the PDF routes
const bodyParser = require('body-parser');
const Grid = require('gridfs-stream');
const base64 = require('base64-js');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes 
app.use('/', InITRoutes);
app.use('/', pdfRoutes); // Use the PDF routes

// Connect to DB 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listening to requests
        app.listen(process.env.PORT, () => {
            console.log('DB connected and Server listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
