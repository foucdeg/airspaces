import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, getSpacing, lineHeight } from 'stylesheet';
import AppCrashFallback from './AppCrashFallback';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
Container.displayName = 'Container';

export const PageContent = styled.div`
  padding: ${getSpacing(8)} ${getSpacing(4)};
  font-family: ${fontFamily.main};
  color: ${colorUsage.primaryTextColor};
`;
PageContent.displayName = 'PageContent';

export const Title = styled.h1`
  font-size: ${fontSize.large};
`;
Title.displayName = 'Title';

export const HelperList = styled.ul`
  list-style: disc inside;
  margin-top: ${getSpacing(2)};
  line-height: ${lineHeight.medium};
`;

HelperList.displayName = 'HelperList';
