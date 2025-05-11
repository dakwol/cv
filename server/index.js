const express = require('express');
const Replicate = require('replicate');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Инициализация Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY, // Добавьте ключ в .env
});

// Роут для генерации
app.post('/generate', upload.single('image'), async (req, res) => {
  try {
    const { prompt } = req.body;
    const imageFile = req.file;

    if (!imageFile || !prompt) {
      return res.status(400).json({ error: 'Требуется изображение и prompt' });
    }

    // Конвертируем изображение в Base64
    const imageBase64 = fs.readFileSync(imageFile.path, { encoding: 'base64' });
    const imageDataUrl = `data:image/png;base64,${imageBase64}`;

    console.log('Запуск модели...');
    const output = await replicate.run("mcai/babes-v2.0-img2img:2bca10ed539cf2196f18b4ec85128a80355d94934db8620884ecca552cdc4def", {
      input: {
        prompt: prompt,
        image: imageDataUrl,
        strength: 0.7,
        steps: 30
      }
    });    

    // Удаляем временный файл
    fs.unlinkSync(imageFile.path);

    // Возвращаем URL сгенерированного изображения
    res.json({ imageUrl: output[0] });

  } catch (error) {
    console.error('Ошибка генерации:', error);
    res.status(500).json({ error: error.message });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});