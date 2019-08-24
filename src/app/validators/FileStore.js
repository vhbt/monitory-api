import * as Yup from 'yup';

export default async (req, res, next) => {
  const validationSchema = Yup.object().shape({
    filename: Yup.string().required(),
  });

  if (!(await validationSchema.isValid(req.file))) {
    return res
      .status(400)
      .json({ type: 'error', detail: 'Selecione uma imagem.' });
  }
  return next();
};
