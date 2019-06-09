import { Field, InjectedFormikProps } from 'formik';
import React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';

import InputRow from 'components/InputRow';
import {
  LoginButton,
  LoginContainer,
  LoginForm,
  Logo,
  Title,
} from './Login.form.style';
import { FormValues } from './service';

import logo from 'assets/forge_logo.png';

interface InnerLoginFormProps {
  errors: {
    email?: string;
    password?: string;
  };
  isSubmitting: boolean;
  touched: {
    email?: boolean;
    password?: boolean;
  };
  login: (values: FormValues) => void;
  token?: string;
  intl: InjectedIntl;
}

const InnerLoginForm: React.FunctionComponent<
  InjectedFormikProps<InnerLoginFormProps, FormValues>
> = ({ errors, touched, isSubmitting, intl }) => {

  return (
    <LoginContainer>
      <Logo alt="Forge logo" src={logo} />
      <Title>
        <FormattedMessage id="login.title" />
      </Title>
      <LoginForm>
        <Field
          type="text"
          name="email"
          label={<FormattedMessage id="login.email" />}
          placeholder={intl.formatMessage({ id: "login.email-placeholder" })}
          component={InputRow}
          error={touched.email && errors.email}
        />
        <Field
          type="password"
          name="password"
          label={<FormattedMessage id="login.password" />}
          placeholder={intl.formatMessage({ id: "login.password-placeholder" })}
          component={InputRow}
          error={touched.password && errors.password}
        />
        <LoginButton
          type="submit"
          disabled={isSubmitting}
        >
          <FormattedMessage id="login.login-button" />
        </LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default InnerLoginForm;
