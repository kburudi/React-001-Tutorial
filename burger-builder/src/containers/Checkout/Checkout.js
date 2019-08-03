import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  cancelPurchaseHandler = () => {
    this.props.history.goBack();
  }

  continuePurchaseHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {

    if (!this.props.ingredients){
      return 'loading...';
    }

    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          cancelPurchase={this.cancelPurchaseHandler}
          continuePurchase={this.continuePurchaseHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData} 
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.ingredients,
});

export default connect(mapStateToProps)(Checkout);
