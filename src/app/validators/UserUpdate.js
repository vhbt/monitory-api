import * as Yup from 'yup';

export default async (req, res, next) => {
  const validationSchema = Yup.object().shape({
    id: Yup.number().required(),
    email: Yup.string()
      .email()
      .required(),
    curso_ano: Yup.number().required(),
  });

  if (!(await validationSchema.isValid(req.body))) {
    return res.status(400).json({ type: 'error', detail: 'Validation fails.' });
  }
  return next();
};
