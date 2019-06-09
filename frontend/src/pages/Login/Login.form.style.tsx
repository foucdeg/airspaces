import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';
import { Form } from 'formik';
import Button from 'components/Button';

export const Logo = styled.img`
  height: 62px;
  margin-bottom: ${getSpacing(6)};
`;

export const Title = styled.h1`
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.main};
  font-size: ${fontSize.large};
  line-height: ${lineHeight.medium};
  margin-bottom: ${getSpacing(12)};
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 340px;
`;

export const LoginButton = styled(Button)`
  align-self: center;
  margin-top: ${getSpacing(8)};
`;
