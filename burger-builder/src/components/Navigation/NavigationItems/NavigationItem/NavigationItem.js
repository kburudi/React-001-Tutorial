import React from 'react';

import NavigationItemCSS from './NavigationItem.css';

const navigationItem = (props) => (
  <li
    className={NavigationItemCSS.NavigationItem}>
      <a
        href={props.link}
        className={props.active ? NavigationItemCSS.active :  null}
      > {props.children} </a>
  </li>
);

export default navigationItem;
