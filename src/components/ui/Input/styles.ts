import { css } from "@emotion/react";

import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: ${({ hasError }) => (hasError ? 56 : 40)}px;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;

export const InputElement = styled.input(
  ({ isShowSuccess, isError, hasRightIcon, isLightDisabled }) => css`
    border: 1px solid
      ${isShowSuccess
        ? "var(--ost-green-600)"
        : isError
        ? "var(--ost-red-400)"
        : "var(--ost-grey-600)"};
    padding: ${hasRightIcon ? "10px 38px 10px 12px" : "10px 12px"};
    background-color: var(--ost-grey-600);
    font-size: var(--ost-fs-sm);
    line-height: var(--ost-lh-sm);
    font-weight: 500;
    color: var(--ost-white);
    transition: border 0.3s ease;
    border-radius: 8px;
    outline: none;
    width: 100%;

    &:focus,
    &:focus-visible {
      ${!isShowSuccess && !isError && "border-color: var(--ost-grey-500)"};
    }
    &::placeholder {
      color: var(--ost-grey-400);
    }

    &:disabled {
      opacity: 1;
      color: ${isLightDisabled ? "var(--ost-grey-400)" : "var(--ost-grey-500)"};
    }

    &:disabled::placeholder {
      color: var(--ost-grey-500);
    }
  `
);

export const Text = styled.div`
  color: var(${({ isError }) => (isError ? "--ost-red-400" : "--ost-white")});
  min-height: 16px;
  font-size: var(--ost-fs-2xs);
  line-height: var(--ost-lh-2xs);
  font-weight: 400;
  padding-top: 1px;
`;

export const RightIconWrapper = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 12px;
  top: calc(50% - 10px);
`;

export const ShowPass = styled(RightIconWrapper)`
  cursor: pointer;
  ${media.hover} {
    &:hover {
      svg {
        & path {
          transition: fill 0.3s ease;
          fill: var(--ost-white);
        }
      }
    }
  }
`;
