import { Storage } from '@google-cloud/storage';
import crypto from 'crypto';

class FileController {
  async store(req, res) {
    const { originalname, mimetype } = req.file;

    const filename = crypto.randomBytes(6).toString('hex') + originalname;

    const storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT,
    });

    const bucket = storage.bucket(process.env.GCLOUD_BUCKET);

    const file = bucket.file(filename);

    const stream = file.createWriteStream({
      metadata: {
        contentType: mimetype,
      },
      resumable: false,
    });

    stream.on('error', err => {
      return res.status(500).json({ type: 'error', detail: err });
    });

    stream.on('finish', () => {
      file.makePublic().then(() => {
        const path = `https://storage.googleapis.com/${process.env.GCLOUD_BUCKET}/${filename}`;

        return res.json({ path });
      });
    });

    stream.end(req.file.buffer);
  }
}

export default new FileController();
