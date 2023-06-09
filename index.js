import * as dotenv from "dotenv";
import cors from "cors"

import express from "express";
import { MongoClient } from "mongodb";

import { usersRouter } from "./routes/user.js";
import { adduserRouter } from "./routes/adduser.js";

import { addLeadRouter } from "./routes/addlead.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;


async function createConnection() {

  try{const client = new MongoClient(MONGO_URL);

    await client.connect();
    console.log("MongoDb is connected 👍🏻");
    return client;
  }
  catch
  {
    console.log("MongoDb is not connected 👎🏻");
  }
}

export const client = await createConnection();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {

  res.send("Welcome all to CRM Backend...😎");
});


app.use("/user", usersRouter);
app.use("/adduser", adduserRouter);
app.use("/addlead", addLeadRouter)


app.listen(PORT, () => console.log("The Server running on PORT 🎇🎆✨", PORT));

