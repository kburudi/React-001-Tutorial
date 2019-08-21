import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import ContactDataCss from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/order.js';

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 6,
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: 'fastest',
        valid: true,
        validation: {}
      }
    },
    formIsValid: false,
  }

  orderHandler = (e) => {
    e.preventDefault()
    const formData = {};

    for (let formElId in this.state.orderForm) {
      formData[formElId] = this.state.orderForm[formElId].value;
    }

    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    }

    this.props.onBurgerOrder(orderData);
    document.getElementById('contact-form').reset();
  }

  inputChangedHandler = (e, inputId) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormEl = { ...updatedOrderForm[inputId] };
    updatedFormEl.value = e.target.value;
    updatedFormEl.touched = true
    updatedFormEl.valid = this.checkValid(updatedFormEl.value, updatedFormEl.validation);
    updatedOrderForm[inputId] = updatedFormEl;

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  }

  checkValid = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form id="contact-form">
        {formElementsArray.map(el => {
          return <Input
            key={el.id}
            elementtype={el.config.elementType}
            elementconfig={el.config.elementConfig}
            value={el.config.value}
            changed={(e) => this.inputChangedHandler(e, el.id)}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
          />
        })}
        <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid} > MAKE ORDER </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={ContactDataCss.ContactData}>
        <h4> Enter your contact data...</h4>
        {form}
      </div>
    );
  }

};

const mapStateToProps = state => ({
  price: state.burger.totalPrice,
  ingredients: state.burger.ingredients,
  loading: state.order.loading,
});

const mapDispatchToProps = dispatch => ({
  onBurgerOrder: orderData => dispatch(purchaseBurger(orderData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
