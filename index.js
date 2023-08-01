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
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          "role": "user",
          "content": `${prompt}`
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const response = completion.data.choices[0].message.content;
    return res.status(200).json({
      success: true,
      message: response,
    });
    console.log();
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/", (req, res) => {
  res.send("Server is Working");
})

app.listen(port, () => console.log(`Server is running on port ${port}!!`));