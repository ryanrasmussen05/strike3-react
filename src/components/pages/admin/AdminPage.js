import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AdminPage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        This is the admin page
      </div>
    );
  }
}

AdminPage.propTypes = {
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
