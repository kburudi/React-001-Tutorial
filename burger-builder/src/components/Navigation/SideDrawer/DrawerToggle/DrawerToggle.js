import React from 'react';

import DrawerToggleCSS from './DrawerToggle.css';

const drawerToggle = (props) => (
  <div onClick={props.clicked} className={DrawerToggleCSS.DrawerToggle}>
    <div> </div>
    <div> </div>
    <div> </div>
  </div>
);

export default drawerToggle;
