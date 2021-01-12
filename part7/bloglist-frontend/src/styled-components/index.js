import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const primaryColor = '#2668f5';

export const Logo = styled.h1`
  font-weight: bold;
  text-transform: uppercase;
  color: ${primaryColor};
`;

export const Wrapper = styled.div`
  max-width: ${(props) => props.size};
  margin: 2rem auto;
`;

export const Container = styled.div`
  padding: ${(props) => (props.small ? '0 1rem' : '0 2rem')};
  margin-bottom: 1rem;
`;

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
`;

export const Nav = styled.ul`
  display: flex;
  list-style-type: none;
  font-size: 1.2rem;
`;

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  margin-left: 2rem;

  &:hover {
    color: ${(props) => (props.link ? primaryColor : '#333')};
  }
`;

export const Button = styled.button`
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  width: ${(props) => (props.block ? '100%' : 'auto')};
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${primaryColor};
  background-color: ${(props) => (props.primary ? primaryColor : '#fff')};
  color: ${(props) => (props.primary ? '#fff' : primaryColor)};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? '#fff' : primaryColor)};
    color: ${(props) => (props.primary ? primaryColor : '#fff')};
  }
`;

export const PrimaryTitle = styled.h1`
  font-size: 2rem;
  text-transform: uppercase;
  color: ${(props) => (props.primary ? primaryColor : '#333')};
  margin-bottom: 1rem;
`;

export const SecondaryTitle = styled.h1`
  font-size: 1.5rem;
  text-transform: uppercase;
  color: ${(props) => (props.primary ? primaryColor : '#333')};
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: center;
  margin: 1rem 0;
`;

export const InputField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  font-size: 1rem;
`;

export const Label = styled.label`
  flex-grow: 0;
  flex-basis: 6rem;
  font-size: 1.2rem;
  text-align: left;
`;

export const List = styled.ul`
  list-style-type: none;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const StyledLink = styled(Link)`
  color: ${primaryColor};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Table = styled.table`
  width: 50%;
  margin: 0 auto;
  text-align: center;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  tbody &:nth-child(2n + 2),
  thead & {
    background-color: #f4f4f4;
  }
`;

export const TableHead = styled.th`
  padding: 1rem 0.5rem;
  border-bottom: 2px solid ${primaryColor};
  color: ${primaryColor};
`;

export const TableData = styled.td`
  padding: 1rem 0.5rem;
  border-bottom: 2px solid ${primaryColor};
`;

const Notification = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #f4f4f4;
  border-radius: 5px;
`;

export const Error = styled(Notification)`
  color: red;
  border: 2px solid red;
`;

export const Success = styled(Notification)`
  color: green;
  border: 2px solid green;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border: 5px solid ${primaryColor};
  border-radius: 50%;
  border-bottom-color: transparent;
  animation: ${rotate} 1s linear infinite;
`;
