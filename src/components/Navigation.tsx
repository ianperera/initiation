import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { AppContext } from '../context'

const Navigation:React.FC<{}> = (props) => {
  const history = useHistory()
  const { state, dispatch } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleClickAuth = () => {
    if (state.token) {
      localStorage.removeItem('token')
      dispatch({ type: 'REMOVE_TOKEN', payload: ''})
      history.push('/')
    } else {
      history.push('/login')
    }
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Initiation</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/dashboard/">Dashboard</NavLink>
            </NavItem>
          </Nav>
        <NavLink onClick={handleClickAuth}>{state.token ? 'Log out' : 'Log in'}</NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;