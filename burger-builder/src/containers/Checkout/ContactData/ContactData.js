import React, {Component} from 'react';
import axios from '../../../axios-orders';

import ContactDataCss from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

  state = {
    name: '',
    email:'',
    address: {
      street:'',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault()

    this.setState({loading: true})
    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Marvin Buge',//this.state.name,
        address: {
          street: 'Ongwaro',//this.state.street,
          zipCode: '54',//this.state.postalCode,
        },
        email: 'mbunge@burger.com',//this.state.email
      },
      deliveryMethod: 'Fastest'
    }
    axios.post('/orders.json', orderData)
    .then(res => {
      this.setState({loading: false})
      this.props.history.push('/')
    })
    .catch(error => {
      this.setState({loading: false})
    });
  }

  render () {

    let form = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Your Street" />
        <input type="text" name="postalCode" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}> Make Order </Button>
      </form>
    );

    if (this.state.loading) {
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

export default ContactData;
