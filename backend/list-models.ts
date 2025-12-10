import axios from 'axios';

async function listModelsRest() {
  const key = process.env.GOOGLE_API_KEY!;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
  const response = await axios.get(url);
  console.log(response.data);
}

listModelsRest();
