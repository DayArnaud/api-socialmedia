import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const dbURI = process.env.DB_URI as string;
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("database started");

    const app = express();
    app.use(express.json());
    app.get("/", (req, res) => {
      return res.json("Tudo certo");
    });
    app.listen(process.env.PORT, () => {
      console.log("Server started");
    });
  })
  .catch((error) => {
    console.log(error);
  });
