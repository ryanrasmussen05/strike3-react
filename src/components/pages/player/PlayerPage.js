import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Placeholder from '../../Placeholder';

class PlayerPage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Placeholder />
      </div>
    );
  }
}

PlayerPage.propTypes = {
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
