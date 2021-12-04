import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';

// Initialize config file
dotenv.config({
  path: 'src/configs/config.env'
});

// Initialize app
const app = express();

// Mongoose Connection
mongoose.connect(process.env.MONGO_CONNECTION_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database connected!")
}).catch(error => {
  console.log("Error connecting to database! " + error);
});

// Mongoose error handling
mongoose.connection.on("error", err => {
  console.log(`Error: ${err}`);
});

// middleware to parse the body of the request to json or array/string
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// middleware to parse cookie from the request
app.use(cookieParser());

// Routes
app.use("/api",authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening at : http://localhost:${PORT}`);
});
