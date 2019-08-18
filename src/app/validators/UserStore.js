import * as Yup from 'yup';

export default async (req, res, next) => {
  const validationSchema = Yup.object().shape({
    token: Yup.string().required(),
  });

  if (!(await validationSchema.isValid(req.body))) {
    return res.status(400).json({ type: 'error', detail: 'Validation fails.' });
  }
  return next();
};
