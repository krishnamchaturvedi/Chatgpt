import express from 'express';
import cors from 'cors';
import { Datastore } from '@google-cloud/datastore';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());

// Initialize the Google Cloud Datastore client
const datastore = new Datastore();

app.post('/completions', async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer $ 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`, // Use your OpenAI API key here
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: req.body.message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      'https://api.openai.com/v1/engines/davinci-codex/completions', // Use the appropriate endpoint for GPT-3.5 Turbo
      options
    );
    const data = await response.json();

    // Save the chat message to Google Cloud Datastore
    const chatEntity = {
      key: datastore.key(['ChatMessage']),
      data: {
        role: 'user',
        content: req.body.message,
        timestamp: new Date(),
      },
    };
    await datastore.save(chatEntity);

    res.send(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:8000/completions`);
});
app.get('/completions', (_req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 
