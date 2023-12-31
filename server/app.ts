import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, 'uploads/'),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single('files');

app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/ok', (req, res) => {
  res.sendStatus(200);
});
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    // console.log('req.file: ', req.file);
    // console.log('req.files: ', req.files);
    if (err) {
      console.error(err);
      return res.json({ error: { message: 'image upload failed' } });
    }
    if (!req.file) {
      return res.sendStatus(500);
    }
    // console.log(req.headers)
    // res.json({
    //   url: `http://${req.headers.host}/uploads/${req.file.filename}`,
    // });
    res.json({
      code: 0,
      data: [{ sentimentFileUrl: `http://${req.headers.host}/uploads/${req.file.filename}` }],
      message: '',
    });
  });
});

app.listen(port, () => console.log('server is listening on port 5000'));
