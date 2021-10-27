// Yup
import * as yup from 'yup';

export const accountFormSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  organization: yup.string().required(),
});
