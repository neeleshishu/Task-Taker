import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { configDB } from "./src/config/configDB.js";
import taskRouter from "./src/routers/taskrouter.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(taskRouter);

app.listen(process.env.PORT_NO , ()=>{
    console.log(`server is listening at ${process.env.PORT_NO}`);
    configDB();
})