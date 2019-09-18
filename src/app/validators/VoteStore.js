import * as Yup from 'yup';

export default async (req, res, next) => {
  const validationSchema = Yup.object().shape({
    user_id: Yup.number().required(),
    event_id: Yup.number().required(),
    candidature_id: Yup.number().required(),
  });

  if (!(await validationSchema.isValid(req.body))) {
    return res
      .status(400)
      .json({ type: 'error', detail: 'Verifique seus dados.' });
  }
  return next();
};
