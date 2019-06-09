import styled, { keyframes } from 'styled-components';
import { colorUsage } from 'stylesheet';

const loaderAnimation = keyframes`
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Loader from https://loading.io/css/
/* stylelint-disable selector-max-type, selector-max-specificity */
export const LoaderContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;

  div {
    position: absolute;
    width: 5px;
    height: 5px;
    background: ${colorUsage.loaderColorDefault};
    border-radius: 50%;
    animation: ${loaderAnimation} 1.2s linear infinite;
  }
  div:nth-child(1) {
    animation-delay: 0s;
    top: 29px;
    left: 53px;
  }
  div:nth-child(2) {
    animation-delay: -0.1s;
    top: 18px;
    left: 50px;
  }
  div:nth-child(3) {
    animation-delay: -0.2s;
    top: 9px;
    left: 41px;
  }
  div:nth-child(4) {
    animation-delay: -0.3s;
    top: 6px;
    left: 29px;
  }
  div:nth-child(5) {
    animation-delay: -0.4s;
    top: 9px;
    left: 18px;
  }
  div:nth-child(6) {
    animation-delay: -0.5s;
    top: 18px;
    left: 9px;
  }
  div:nth-child(7) {
    animation-delay: -0.6s;
    top: 29px;
    left: 6px;
  }
  div:nth-child(8) {
    animation-delay: -0.7s;
    top: 41px;
    left: 9px;
  }
  div:nth-child(9) {
    animation-delay: -0.8s;
    top: 50px;
    left: 18px;
  }
  div:nth-child(10) {
    animation-delay: -0.9s;
    top: 53px;
    left: 29px;
  }
  div:nth-child(11) {
    animation-delay: -1s;
    top: 50px;
    left: 41px;
  }
  div:nth-child(12) {
    animation-delay: -1.1s;
    top: 41px;
    left: 50px;
  }
`;
