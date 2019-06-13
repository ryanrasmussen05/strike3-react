import React from 'react';
import './TieBreaker.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import { selectShowAdminTieBreakerModal } from '../../redux/selectors/modal.selectors';
import AdminTieBreakerModal from '../modals/adminTieBreakerModal/AdminTieBreakerModal';
import { showAdminTieBreakerModalAction } from '../../redux/actions/modal.actions';
import { selectAdminTieBreakers } from '../../redux/selectors/admin.selectors';
import { columns } from './table.columns';

class TieBreaker extends React.Component {

  render() {
    return (
      <div className="tie-breaker">
        { this.renderAdminTieBreakerModal() }

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

  renderTieBreakerTable = () => {
    if (this.props.tieBreakers.length === 0) {
      return <span className="no-tiebreakers">No Tiebreakers Created</span>;
    }

    return (
      <div className="tie-breaker-table">
        <Table
          dataSource={ this.props.tieBreakers }
          columns={ columns }
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
  showTieBreakerModal: PropTypes.func,
};

const mapStateToProps = state => ({
  tieBreakers: selectAdminTieBreakers(state),
  shouldShowAdminTieBreakerModal: selectShowAdminTieBreakerModal(state),
});

const mapDispatchToProps = dispatch => ({
  showTieBreakerModal: () => dispatch(showAdminTieBreakerModalAction(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TieBreaker);
