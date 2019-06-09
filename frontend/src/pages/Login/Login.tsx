import { withFormik } from 'formik';
import { injectIntl } from 'react-intl';
import InnerLoginForm from './Login.form';

import { handleSubmit, mapPropsToValues, validateForm } from './service';

const LoginFormContainer = withFormik({
  mapPropsToValues,
  validate: validateForm,
  handleSubmit,
})(injectIntl(InnerLoginForm));

export default LoginFormContainer;
