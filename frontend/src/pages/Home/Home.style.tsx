import styled from 'styled-components';
import {
  borderRadius,
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
} from 'stylesheet';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getSpacing(10)};
`;
HomeContainer.displayName = 'HomeContainer';

export const Logo = styled.img`
  width: ${getSpacing(32)};
  margin-bottom: ${getSpacing(4)};
`;
Logo.displayName = 'Logo';

export const Title = styled.h1`
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.main};
  font-size: ${fontSize.large};
  line-height: ${lineHeight.medium};
  margin-bottom: ${getSpacing(12)};
`;
Title.displayName = 'Title';

export const HowTo = styled.div`
  padding: ${getSpacing(6)};
  width: 100%;
  max-width: ${getSpacing(120)};
  box-sizing: border-box;
  border-radius: ${borderRadius.large};
  border: 1px dashed ${colorUsage.primaryTextColor};
`;
HowTo.displayName = 'HowTo';

export const DescriptionList = styled.ul`
  list-style: disc;
  margin-left: ${getSpacing(4)};
`
DescriptionList.displayName = 'DescriptionList';

export const DescriptionLine = styled.li`
  font-family: ${fontFamily.main};
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.medium};
  line-height: ${lineHeight.medium};
  padding-left: ${getSpacing(1)};
  margin-bottom: ${getSpacing(1)};
`;
DescriptionLine.displayName = 'DescriptionLine';

export const Code = styled.code`
  color: ${colorUsage.codeColor};
  font-family: ${fontFamily.code};
  padding: ${getSpacing(1)};
`;
Code.displayName = 'Code';
