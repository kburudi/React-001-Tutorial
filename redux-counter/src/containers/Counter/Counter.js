import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  increament, decreament, add, subtract, storeResult, deleteResult
} from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
              this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
              break;

        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <hr />

                <button onClick={() => this.props.onStoreResult(this.props.ctr)}> Store Result </button>
                <ul>
                  {this.props.storedRes.map(res => {
                    return <li key={res.id} onClick={() => this.props.onDelResult(res.id)}>{res.value}</li>
                  })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter.counter,
        storedRes: state.result.result
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(increament()),
        onDecrementCounter: () => dispatch(decreament()),
        onAddCounter: () => dispatch(add(10)),
        onSubtractCounter: () => dispatch(subtract(15)),
        onStoreResult: (result) => dispatch(storeResult(result)),
        onDelResult: (id) => dispatch(deleteResult(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
