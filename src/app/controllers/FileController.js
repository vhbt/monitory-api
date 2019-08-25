import { Storage } from '@google-cloud/storage';
import crypto from 'crypto';
import sharp from 'sharp';

class FileController {
  async store(req, res) {
    const { originalname, mimetype } = req.file;

    const filename = crypto.randomBytes(6).toString('hex') + originalname;
    const filename_thumb = `thumb_${crypto
      .randomBytes(6)
      .toString('hex')}${originalname}`;

    const storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT,
    });

    const bucket = storage.bucket(process.env.GCLOUD_BUCKET);

    const file = bucket.file(filename);
    const file_thumb = bucket.file(filename_thumb);

    const stream = file.createWriteStream({
      metadata: {
        contentType: mimetype,
      },
      resumable: false,
    });

    const buffer = await sharp(req.file.buffer)
      .resize(null, 300)
      .toBuffer();

    stream.on('error', err => {
      return res.status(500).json({ type: 'error', detail: err });
    });

    stream.on('finish', () => {
      file.makePublic();
    });

    stream.end(buffer);

    const buffer_thumb = await sharp(req.file.buffer)
      .resize(null, 50)
      .toBuffer();

    const stream_thumb = file_thumb.createWriteStream({
      metadata: {
        contentType: mimetype,
      },
      resumable: false,
    });

    stream_thumb.on('finish', () => {
      file_thumb.makePublic().then(() => {
        const path = `https://storage.googleapis.com/${process.env.GCLOUD_BUCKET}/${filename}`;
        const path_thumb = `https://storage.googleapis.com/${process.env.GCLOUD_BUCKET}/${filename_thumb}`;

        return res.json({ path, path_thumb });
      });
    });

    stream_thumb.on('error', err => {
      return res.status(500).json({ type: 'error', detail: err });
    });

    stream_thumb.end(buffer_thumb);
  }
}

export default new FileController();
