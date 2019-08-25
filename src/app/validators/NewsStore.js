import * as Yup from 'yup';

export default async (req, res, next) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    content: Yup.string().required(),
    category: Yup.string(),
    banner: Yup.string().required(),
    banner_thumb: Yup.string().required(),
  });

  if (!(await validationSchema.isValid(req.body))) {
    return res
      .status(400)
      .json({ type: 'error', detail: 'Verifique seus dados.' });
  }
  return next();
};
