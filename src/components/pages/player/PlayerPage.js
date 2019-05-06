import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PlayerPage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        This is the player page
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
