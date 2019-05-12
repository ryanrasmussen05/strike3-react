import React from 'react';
import './LoadingIndicator.scss';
import { Spin } from 'antd';

class LoadingIndicator extends React.Component {

  render() {
    return (
      <div className="loading-indicator">
        <Spin size="large" />
      </div>
    );
  }
}

export default LoadingIndicator;
