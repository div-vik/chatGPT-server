import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

// Configuration openai api
const configuration = new Configuration({
  organization: "org-9vYmI9JNin4d9Dl0lSt8MES7",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// dummy test route
app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send("Hello World!");
});

// post request route
app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });
    res.status(200).json({ message: response.data.choices[0].text });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

// listening
app.listen("8080", () =>
  console.log("Server is running at http://localhost:8080/")
);
