import React from 'react';
import './LoadingIndicator.scss';
import { Icon } from 'antd';

class LoadingIndicator extends React.Component {

  render() {
    return (
      <div className="loading-indicator">
        <Icon type="loading" />
      </div>
    );
  }
}

export default LoadingIndicator;
