import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import routes from "./routes";

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(helmet());
app.use(routes)

const options = { useNewUrlParser: true, useUnifiedTopology: true }

const startServer = async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING ?? "");
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
  })
}

startServer()
  .then(() => {
    console.log("ok.")
  })
  .catch((err) => {
    throw err;
  });
