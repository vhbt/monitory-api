import * as Yup from 'yup';

export default async (req, res, next) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    desc: Yup.string().required(),
    featured: Yup.boolean().required(),
    type: Yup.number().required(),
    image: Yup.string().required(),
    enabled: Yup.bool().required(),
    date: Yup.date().required(),
    until_date: Yup.date().required(),
  });

  if (!(await validationSchema.isValid(req.body))) {
    return res
      .status(400)
      .json({ type: 'error', detail: 'Verifique seus dados.' });
  }
  return next();
};
