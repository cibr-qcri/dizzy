// Yup
import * as yup from 'yup';

export const signUpFormSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  organization: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});
