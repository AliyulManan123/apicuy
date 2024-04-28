import axios from 'axios';

const api = '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';

async function txt2imgAnime(data) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stablediffusionapi/anime-model-v2',
      data,
      {
        headers: {
          'Authorization': `Bearer ${api}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    const imageBuffer = Buffer.from(response.data);
    
    return imageBuffer
  } catch (error) {
    console.error('Error generating anime:', error);
    throw error;
  }
}

export {
  txt2imgAnime
}
