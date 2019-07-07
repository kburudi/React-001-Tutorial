import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import LogoCSS from './Logo.css'

const logo = (props) => (
  <div className={LogoCSS.Logo}>
    <img src={burgerLogo} alt="My Burger"/>
  </div>
);

export default logo;
