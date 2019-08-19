import * as Yup from 'yup';

export default async (req, res, next) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    tags: Yup.string(),
    banner: Yup.string().required(),
  });

  if (!(await validationSchema.isValid(req.body))) {
    return res.status(400).json({ type: 'error', detail: 'Validation fails.' });
  }
  return next();
};
