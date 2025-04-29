import express, { request, response } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors'
// import { Book } from "./models/bookModel.js";f

import booksRoute from "./routes/booksRoute.js"

const app = express();

app.use(express.json())
// app.use(cors());
app.use(cors({
    origin: 'https:localhost:5555',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome 2')

});

app.use('/books', booksRoute)

mongoose.connect(mongodbURL)
    .then(() => {
        console.log("App connected to DataBase");
        app.listen(PORT, () => {
            console.log(`App is listening to ${PORT}`);

        });

    })
    .catch((error) => {
        console.error(error);

    })