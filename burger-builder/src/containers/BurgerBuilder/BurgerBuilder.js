import React, { Component } from 'react';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
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
    this.setState({loading: true})
    const orderData = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Trev Zonecc',
        address: {
          street: 'Kamai',
          zipCode: 254,
          country: 'Kenya'
        },
        email: 'zonecc@zeze.net'
      },
      deliveryMethod: 'Fastest'
    }
    axios.post('/orders.json', orderData)
    .then(res => {
      console.log(res)
      this.setState({loading: false})
      this.cancelPurchase()
    })
    .catch(error => {
      this.setState({loading: false})
      this.cancelPurchase()
      console.log(error);
    });
  }

  componentDidMount () {
    axios.get('/ingredients.json')
      .then(res => {
        this.setState({ingredients: res.data})
      })
      .catch(error => {
        this.setState({error: true})
      });
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = <Spinner />

    if(this.state.ingredients) {
      burger = <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          orderNow={this.purchaseHandler}
        />
      </Aux>;

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        cancelPurchase={this.cancelPurchase}
        continuePurchase={this.continuePurchase}
        price={this.state.totalPrice}
      />
    }

    if(this.state.loading) {
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
export default withErrorHandler(BurgerBuilder, axios);
