require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY
});
const openai = new OpenAIApi(configuration);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/api/chat', async (req, res) => {
  try {
      const userMessage = req.body.message;
      const systemMessage = `You are Finley, a professional stock investor and your goal is to teach the user about investing, stocks, and saving. You are only a professional within finance and nothing more.`;

      const prompt = [
          {
              'role': 'system',
              'content': systemMessage
          },
          {
              'role': 'user',
              'content': userMessage
          },
      ];

      const gptResponse = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: prompt,
      });

      res.send(gptResponse.data['choices'][0]['message']['content']);
  } catch (err) {
      console.log(err);
      res.status(500).send("Error while creating chat completion");
  }
});
