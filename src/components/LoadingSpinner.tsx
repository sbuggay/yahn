import React, { Component } from 'react';

class LoadingSpinner extends Component<any, any> {
    render() {
        return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    }
}

export default LoadingSpinner;
