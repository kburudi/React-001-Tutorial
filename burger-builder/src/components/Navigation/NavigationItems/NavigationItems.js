import React from 'react';

import NavigationItemsCSS from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={NavigationItemsCSS.NavigationItems}>
    <NavigationItem link='/' > Burger Builder </NavigationItem>
    <NavigationItem link='/checkout'> Checkout </NavigationItem>
    <NavigationItem link='/orders'> Orders </NavigationItem>
  </ul>
);

export default navigationItems;
