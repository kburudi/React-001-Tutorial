import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = () => {
    const ingredients = {
      ...this.state.ingredients
    };

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    }, () => this.updatePurchaseState());
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;

    if (updatedCount < 0) {
      return "You have not added this ingredient yet";
    }

    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    }, () => this.updatePurchaseState());
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
    alert('Hahaha!! So you love it!')
    this.cancelPurchase()
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.cancelPurchase}>
          <OrderSummary
            ingredients={this.state.ingredients}
            cancelPurchase={this.cancelPurchase}
            continuePurchase={this.continuePurchase}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          orderNow={this.purchaseHandler}
        />
      </Aux>
    );
  }
}
export default BurgerBuilder;
