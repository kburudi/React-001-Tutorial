import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
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

    this.setState({ purchasable: sum > 0 });
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
    let queryParams = [];
    for(let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
    }
    queryParams.push('price='+this.state.totalPrice)
    const queryString = queryParams.join('&')
    this.props.history.push(
      {
        pathname: '/checkout',
        search: '?' + queryString
      }
    )
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
      ...this.props.ings
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = <Spinner />

    if(this.props.ings) {
      burger = <Aux>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          orderNow={this.purchaseHandler}
        />
      </Aux>;

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
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

const mapStateToProps = state => ({
  ings: state.ingredients
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingNAme => dispatch({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingNAme
  }),
  onIngredientRemoved: ingNAme => dispatch({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingNAme
  }),
});
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
