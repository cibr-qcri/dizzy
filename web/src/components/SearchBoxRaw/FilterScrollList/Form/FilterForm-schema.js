// Yup
import * as yup from 'yup';

export const filterFormSchema = yup.object().shape({
  category: yup.string().required(),
  cryptos: yup.string().required(),
  security: yup.string().required(),
  privacy: yup.string().required(),
  status: yup.string().required(),
  mirroring: yup.string().required(),
  languages: yup.string().required(),
});
