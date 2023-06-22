import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from './routers/index.router';
import middleware404 from './middlewares/error404';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

// Allowing all CORS requests
app.use(cors());

// JSON payload parsing
app.use(express.json());

// urlencoded payload parsing
app.use(express.urlencoded({ extended: true }))

app.use(router);

app.use(middleware404);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});