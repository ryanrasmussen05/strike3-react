import React from 'react';
import './TieBreaker.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { selectShowAdminTieBreakerModal } from '../../redux/selectors/modal.selectors';
import AdminTieBreakerModal from '../modals/adminTieBreakerModal/AdminTieBreakerModal';
import { showAdminTieBreakerModalAction } from '../../redux/actions/modal.actions';

class TieBreaker extends React.Component {

  render() {
    return (
      <div className="tie-breaker">
        { this.renderAdminTieBreakerModal() }

        <Button type="primary" onClick={ this.props.showTieBreakerModal }>
          Create Tie Breaker
        </Button>
      </div>
    );
  }

  renderAdminTieBreakerModal = () => {
    if (this.props.shouldShowAdminTieBreakerModal) {
      return <AdminTieBreakerModal />;
    }
  }
}

TieBreaker.propTypes = {
  shouldShowAdminTieBreakerModal: PropTypes.bool,
  showTieBreakerModal: PropTypes.func,
};

const mapStateToProps = state => ({
  shouldShowAdminTieBreakerModal: selectShowAdminTieBreakerModal(state),
});

const mapDispatchToProps = dispatch => ({
  showTieBreakerModal: () => dispatch(showAdminTieBreakerModalAction(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TieBreaker);
