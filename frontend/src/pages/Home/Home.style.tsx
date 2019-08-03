import styled from 'styled-components';

export const MapCanvasWrapper = styled.div`
  position: relative;
  transition: width 0.4s;
  float: left;
  height: 100%;
  width: 100%;

  &.shrinked {
    width: calc(100% - 300px);
  }
`;

export const ButtonsRow = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 400;

  & > :not(:last-child) {
    margin-right: 15px;
  }
`;
