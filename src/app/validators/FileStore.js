export default async (req, res, next) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ type: 'error', detail: 'Selecione uma imagem.' });
  }
  return next();
};
