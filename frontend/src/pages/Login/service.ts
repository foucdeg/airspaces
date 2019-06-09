import { FormikBag, FormikErrors } from 'formik';

export interface FormValues {
  email: string;
  password: string;
}

interface LoginServiceStateProps {
  loginError?: string | null;
}

interface LoginServiceDispatchProps {
  login: (values: FormValues) => void;
}

export type LoginServiceProps = LoginServiceStateProps & LoginServiceDispatchProps;

export const validateForm = (values: FormValues): FormikErrors<FormValues> => {
  const errors: FormikErrors<FormValues> = {};
  if (!values.email) {
    errors.email = 'Email required';
  }
  return errors;
};

export const mapPropsToValues = (): FormValues => ({
  email: '',
  password: '',
});

export const handleSubmit = (
  values: FormValues,
  { props, setSubmitting }: FormikBag<LoginServiceProps, FormValues>,
): void => {
  props.login(values);
  setSubmitting(false);
};
