require("dotenv").config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  organization: "org-q0ioNi9NA7F3PnInmvY4Kfqg",
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 5000;

app.post("/chat", async (req, res) => {
  const {prompt} = req.body;
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 512,
      temperature: 0,

    });
    const completion = response.data.choices[0].text;
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/", (req, res) => {
  res.send("Server is Working");
})

app.listen(port, () => console.log(`Server is running on port ${port}!!`));