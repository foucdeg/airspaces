import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing } from 'stylesheet';

export const Label = styled.label`
  display: block;
  font-family: ${fontFamily.main};
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.medium};
  color: ${colorUsage.primaryTextColor};
  margin-bottom: ${getSpacing(1)};
`;

export const Error = styled.p`
  color: ${colorUsage.error};
  font-family: ${fontFamily.main};
  font-weight: ${fontWeight.normal};
  font-size: ${fontSize.small};
  margin-top: ${getSpacing(1)};
`;

export const Row = styled.div`
  margin-bottom: ${getSpacing(5)};
  width: 100%;
`;
