import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Auxil/Auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { addIngredient, removeIngredient, initIngredients } from '../../store/actions/burger';
import { purchaseInit } from '../../store/actions/order';

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = () => {
    const ingredients = {
      ...this.props.ings
    };

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  cancelPurchase = () => {
    this.setState({
      purchasing: false
    })
  }

  continuePurchase = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  render() {

    console.log(this.props.price);

    const disabledInfo = {
      ...this.props.ings
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = this.props.error ? <p
      style={{ marginTop: '300px', textAlign: 'center' }}
    >Ingredients could not be loaded</p> : <Spinner />;

    if (this.props.ings) {
      burger = <Aux>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={this.updatePurchaseState(this.props.ings)}
          price={this.props.price}
          orderNow={this.purchaseHandler}
        />
      </Aux>;

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        cancelPurchase={this.cancelPurchase}
        continuePurchase={this.continuePurchase}
        price={this.props.price}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.cancelPurchase}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burger.ingredients,
  price: state.burger.totalPrice,
  error: state.burger.error,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingNAme => dispatch(addIngredient(ingNAme)),
  onIngredientRemoved: ingNAme => dispatch(removeIngredient(ingNAme)),
  onInitIngredients: () => dispatch(initIngredients()),
  onInitPurchase: () => dispatch(purchaseInit()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
