import * as Yup from 'yup';

export default async (req, res, next) => {
  const validationSchema = Yup.object().shape({
    oneSignalPlayerId: Yup.string(),
  });

  if (!req.body.oneSignalPlayerId) {
    return res.json({ type: 'success' });
  }

  if (!(await validationSchema.isValid(req.body))) {
    return res
      .status(400)
      .json({ type: 'error', detail: 'Verifique seus dados.' });
  }

  return next();
};
