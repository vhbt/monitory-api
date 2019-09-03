import multer from 'multer';

export default {
  storage: multer.memoryStorage({
    limits: {
      fileSize: 5 * 1024 * 1024,
      fieldSize: 25 * 1024 * 1024,
    },
  }),
};
