import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WeekSelectorAdmin from '../../weekSelector/WeekSelectorAdmin';

class AdminPage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <WeekSelectorAdmin />
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
