import React, { Component } from 'react';

// --> STATELESS COMPONENT <-- //
// const repWithClass = (WrappedComponent, className) => {
//     return (props) => (
//         <div className={className}>
//             <WrappedComponent {...props} />
//         </div>
//     )
// }

// --> STATEFUL COMPONENT <-- //
const repWithClass = (WrappedComponent, className) => {
    const RepWithClass = class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent ref={this.props.forRef}
                        {...this.props} />
                </div>
            )
        }
    }

    return React.forwardRef((props, ref) => {
        return <RepWithClass {...props} forRef={ref} />
    })
}

export default repWithClass;