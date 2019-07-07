import React from 'react';

import ToolbarCss from './Toolbar.css';
import Logo from '../../Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
  <header className={ToolbarCss.Toolbar}>
    <DrawerToggle clicked={props.toggleSideDrawer}/>
    <div className={ToolbarCss.Logo}>
      <Logo />
    </div>
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
