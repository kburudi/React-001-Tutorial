import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import CheckoutSummaryCSS from './CheckoutSummary.css'

const checkoutSummary = (props) => {
  return (
    <div className={CheckoutSummaryCSS.CheckoutSummary}>
      <h1> We hope you enjoy it!!!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType='Danger'
        clicked={props.cancelPurchase}
      > CANCEL </Button>
      <Button
        btnType='Success'
        clicked={props.continuePurchase}
      > CONTINUE </Button>
    </div>
  );
};

export default checkoutSummary;
