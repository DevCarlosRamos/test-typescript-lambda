import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/card.routes";

//Start
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
app.use(router)

export default app;