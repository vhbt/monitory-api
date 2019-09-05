import multer from 'multer';

export default {
  storage: multer.memoryStorage({
    limits: {
      fileSize: 15 * 1024 * 1024,
      fieldSize: 50 * 1024 * 1024,
    },
  }),
};
