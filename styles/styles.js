import styled from "styled-components";

export const Dropdown = styled.div`
  display: ${(props) => (props.dropdown ? "block" : "none")};
`;
