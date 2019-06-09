import styled, { css } from 'styled-components';
import {
  borderRadius,
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
} from 'stylesheet';

interface IButton {
  href?: string;
  to?: string;
}

const Button = styled.button<IButton>`
  padding: ${getSpacing(2)} ${getSpacing(4)};

  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.main};
  font-size: ${fontSize.medium};
  line-height: ${lineHeight.medium};

  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  ${props => props.disabled && css`pointer-events: none;`}

  border: none;
  border-radius: ${borderRadius.medium};

  text-decoration: none;

  color: ${colorUsage.primaryButtonColor};
  background-color: ${props => props.disabled
    ? colorUsage.primaryButtonBackgroundDisabled
    : colorUsage.primaryButtonBackground};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${props => props.disabled
    ? colorUsage.primaryButtonBackgroundDisabled
    : colorUsage.primaryButtonBackgroundHover};
  }
`;

export default Button;
