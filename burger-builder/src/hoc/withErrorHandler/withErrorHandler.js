import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxil/Auxil';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    componentWillMount() {
      this.reqIntereceptor = axios.interceptors.request.use(
        req => {
          this.setState({ error: null })
          return req;
        }
      );
      this.resIntereceptor = axios.interceptors.response.use(
        res => res, error => {
          this.setState({ error: error })
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqIntereceptor);
      axios.interceptors.response.eject(this.resIntereceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;
