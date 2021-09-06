import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from '../src/components/SourceLink';

const Footer = () => {
  return (
    <Navbar className="footerdiv">
      <Nav navbar>
        <NavItem>
          Develope By <a href="https://adriitsolutions.com/" target="_blank">Adri IT Solution</a>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
