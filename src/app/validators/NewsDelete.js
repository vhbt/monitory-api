import * as Yup from 'yup';

export default async (req, res, next) => {
  const validationSchema = Yup.object().shape({
    id: Yup.number().required(),
  });

  if (!(await validationSchema.isValid(req.body))) {
    return res
      .status(400)
      .json({ type: 'error', detail: 'Verifique seus dados.' });
  }
  return next();
};
