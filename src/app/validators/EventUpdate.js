import * as Yup from 'yup';

export default async (req, res, next) => {
  const validationSchema = Yup.object().shape({
    id: Yup.number().required(),
    title: Yup.string(),
    desc: Yup.string(),
    featured: Yup.boolean(),
    type: Yup.number(),
    image: Yup.string(),
    enabled: Yup.bool(),
    date: Yup.date(),
    until_date: Yup.date(),
  });

  if (!(await validationSchema.isValid(req.body))) {
    return res
      .status(400)
      .json({ type: 'error', detail: 'Verifique seus dados.' });
  }
  return next();
};
