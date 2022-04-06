import styled from "styled-components";

const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  background: transparent;
  border: 0.05rem solid var(--clr-primary-light);
  border-color: ${(props) =>
    props.cart ? "var(--clr-yellow)" : "var(--clr-primary-light)"};
  color: ${(props) =>
    props.cart ? "var(--clr-yellow)" : "var(--clr-primary-light)"};
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  margin: 0.2rem 0.5rem 0.2rem 0;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: ${(props) =>
      props.cart ? "var(--clr-yellow)" : "var(--clr-primary-light)"};
    color: var(--clr-primary);
  }
  &:focus {
    outline: none;
  }
`;

export default ButtonContainer;
