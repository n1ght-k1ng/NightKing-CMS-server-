
require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";

import  categoryRoutes from '../server/routes/category';

import postRoutes from "../server/routes/post"
import websiteRoutes from "../server/routes/website"



const morgan = require("morgan");
const path = require("path") // middle ware to print details "POST /api/signup 200 375.101 ms - 380"

const app = express();
const http = require("http").createServer(app);

// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev")); 

// // deployment 
// __dirname = path.resolve()
// if(process.env.NODE_ENV === 'production')
// {
 
//   app.use(express.static(path.join(__dirname, '../client/.next/static/chunks/pages')))
//   app.get('*' , (req, res) => {
//     res.sendFile(path.join(__dirname,'..' ,'client', '.next', 'static','chunks','pages', 'index.js'))
//   })
// }
// else{
//   app.get("/" , (req, res) => {
//     res.send("Api running")
//   })

// }


// route middlewares
app.use("/api", authRoutes);
app.use("/api", categoryRoutes) 
app.use("/api", postRoutes)
app.use("/api", websiteRoutes)    // category routes are now part of the endpoints


const port = process.env.PORT || 8000;

http.listen(port, () => console.log("Server running on port 8000"));

// heyy