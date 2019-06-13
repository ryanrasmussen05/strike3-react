import React from 'react';
import './TieBreaker.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import {
  selectShowAdminTieBreakerModal,
  selectShowAdminTieBreakerResultModal,
} from '../../redux/selectors/modal.selectors';
import AdminTieBreakerModal from '../modals/adminTieBreakerModal/AdminTieBreakerModal';
import {
  showAdminTieBreakerModalAction,
  showAdminTieBreakerResultModalAction,
} from '../../redux/actions/modal.actions';
import { selectAdminTieBreakers } from '../../redux/selectors/admin.selectors';
import { createColumns } from './table.columns';
import AdminTieBreakerResultModal from '../modals/adminTieBreakerResultModal/AdminTieBreakerResultModal';
import { adminSetSelectedTieBreakerAction } from '../../redux/actions/admin.actions';

class TieBreaker extends React.Component {

  handleUpdateTieBreakerClick = tieBreaker => {
    this.props.setSelectedTieBreaker(tieBreaker);
    this.props.showTieBreakerResultModal();
  };

  render() {
    return (
      <div className="tie-breaker">
        { this.renderAdminTieBreakerModal() }
        { this.renderAdminTieBreakerResultModal() }

        <Button type="primary" onClick={ this.props.showTieBreakerModal }>
          Create Tie Breaker
        </Button>

        { this.renderTieBreakerTable() }
      </div>
    );
  }

  renderAdminTieBreakerModal = () => {
    if (this.props.shouldShowAdminTieBreakerModal) {
      return <AdminTieBreakerModal />;
    }
  };

  renderAdminTieBreakerResultModal = () => {
    if (this.props.shouldShowAdminTieBreakerResultModal) {
      return <AdminTieBreakerResultModal />;
    }
  };

  renderTieBreakerTable = () => {
    if (this.props.tieBreakers.length === 0) {
      return <span className="no-tiebreakers">No Tiebreakers Created</span>;
    }

    return (
      <div className="tie-breaker-table">
        <Table
          dataSource={ this.props.tieBreakers }
          columns={ createColumns(this.handleUpdateTieBreakerClick) }
          pagination={ false }
          rowKey="week"
          className="table"
        />
      </div>
    );
  };
}

TieBreaker.propTypes = {
  tieBreakers: PropTypes.array,
  shouldShowAdminTieBreakerModal: PropTypes.bool,
  shouldShowAdminTieBreakerResultModal: PropTypes.bool,
  showTieBreakerModal: PropTypes.func,
  showTieBreakerResultModal: PropTypes.func,
  setSelectedTieBreaker: PropTypes.func,
};

const mapStateToProps = state => ({
  tieBreakers: selectAdminTieBreakers(state),
  shouldShowAdminTieBreakerModal: selectShowAdminTieBreakerModal(state),
  shouldShowAdminTieBreakerResultModal: selectShowAdminTieBreakerResultModal(state),
});

const mapDispatchToProps = dispatch => ({
  showTieBreakerModal: () => dispatch(showAdminTieBreakerModalAction(true)),
  showTieBreakerResultModal: () => dispatch(showAdminTieBreakerResultModalAction(true)),
  setSelectedTieBreaker: tieBreaker => dispatch(adminSetSelectedTieBreakerAction(tieBreaker)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TieBreaker);
