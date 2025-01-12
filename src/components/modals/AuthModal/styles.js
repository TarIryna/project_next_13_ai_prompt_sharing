import styled from "styled-components";
import { media } from "@/styles/mediaBrakepoints";

export const Wrapper = styled.div`
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  background-color: var(--ost-grey-700);
  ${media.mobile} {
    border-radius: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  min-height: 626px;
  ${media.tabletMd} {
    min-height: 712px;
  }
  ${media.mobile} {
    height: 100dvh;
    width: 100vw;
    min-height: auto;
    border-radius: 0;
    overflow: hidden;
    overflow-y: auto;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px 16px 24px;
  display: flex;
  flex-wrap: wrap;
  ${media.mobile} {
    padding: 0 16px 16px 16px;
  }
`;
