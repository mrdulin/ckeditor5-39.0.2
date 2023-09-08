import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 5000;

let imageName = '';
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, 'uploads/'),
  filename: function (req, file, cb) {
    imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});
const upload = multer({ storage: storage }).single('upload');

app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get('/ok', (req, res) => {
  res.sendStatus(200);
});
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ error: { message: 'image upload failed' } });
    res.json({
      url: `http://localhost:${port}/uploads/${imageName}`,
    });
  });
});

app.listen(port, () => console.log('server is listening on port 5000'));
