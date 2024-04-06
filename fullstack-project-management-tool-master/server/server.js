import express from "express";
import api from './routes/index.js'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from "cors";


const app = express();

dotenv.config()

app.use(express.json())
app.use(express.urlencoded())


mongoose.connect(process.env.MONGODB_PATH, () => {
}, (e) => console.log(e))

app.use(cors({
    origin: ['http://localhost:3000']
  }));

const PORT = process.env.SERVER_PORT || 9000

//API Creation
app.get("/", (req,res)=>{
    res.send("Express App is Running")
})

app.use(api)

app.listen(PORT, () => {
    console.log(`Your app is running in http://localhost:${PORT}`)
})