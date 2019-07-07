import React from 'react'

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerCSS from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {

  let attachedClasses = [SideDrawerCSS.SideDrawer, SideDrawerCSS.Close];
  if (props.show) {
    attachedClasses = [SideDrawerCSS.SideDrawer, SideDrawerCSS.Open];
  }

  return (
    <Aux>
      <BackDrop
        show={props.show}
        clicked={props.closed}
      />
      <div className={attachedClasses.join(' ')}>
        <div className={SideDrawerCSS.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
