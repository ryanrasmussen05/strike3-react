import React from 'react';
import './AdminPage.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ADMIN_ERROR_TYPES } from '../../../redux/reducers/admin.reducer';
import { Alert, Radio } from 'antd';
import {
  selectAdminError,
  selectAdminGameData,
  selectIsAdmin,
  selectIsSuperuser,
} from '../../../redux/selectors/admin.selectors';
import { selectGlobalLoading } from '../../../redux/selectors/global.selectors';
import GameTable from '../../gameTable/GameTable';
import { getGameDataAdminAction } from '../../../redux/actions/admin.actions';
import { selectShowAdminPickModal } from '../../../redux/selectors/modal.selectors';
import AdminPickModal from '../../modals/adminPickModal/AdminPickModal';
import RosterTable from '../../rosterTable/RosterTable';
import Schedule from '../../schedule/Schedule';

class AdminPage extends React.Component {

  state = {
    view: 'spreadsheet',
  };

  componentDidMount() {
    this.props.getGameDataAdmin();
  }

  onViewChange = event => {
    this.setState({
      view: event.target.value,
    });
  };

  render() {
    const isError = !this.props.globalLoading && ((this.props.error && this.props.error === ADMIN_ERROR_TYPES.GAME_DATA) || !this.props.isAdmin);

    if (isError) {
      return this.renderErrorMessage();
    }

    if (!!this.props.gameData) {
      return this.renderPage();
    }

    return null;
  }

  renderErrorMessage = () => {
    const errorMessage = this.props.isAdmin ? 'Server Error' : 'Access Denied';
    const errorDesc = this.props.isAdmin ? 'An error occurred while loading the page, please try again later' : 'You must be logged in as an admin to view this page';

    return (
      <div className="admin-page-error">
        <Alert
          message={ errorMessage }
          description={ errorDesc }
          type="error"
        />
      </div>
    );
  };

  renderPage = () => {
    return (
      <div className="admin-page">
        { this.renderAdminPickModal() }

        <div className="view-selector-container">
          <Radio.Group buttonStyle="solid" defaultValue="spreadsheet" onChange={ this.onViewChange }>
            <Radio.Button value="spreadsheet">Spreadsheet</Radio.Button>
            <Radio.Button value="tiebreakers">Tie Breakers</Radio.Button>
            <Radio.Button value="roster">Roster</Radio.Button>
            <Radio.Button value="email">Email</Radio.Button>
            { this.props.isSuperuser &&
            <Radio.Button value="schedule">Schedule</Radio.Button>
            }
          </Radio.Group>
        </div>

        { this.state.view === 'spreadsheet' &&
        <div className="game-table-container">
          <GameTable admin={ true } />
        </div>
        }

        { this.state.view === 'roster' &&
          <RosterTable />
        }

        { this.state.view === 'schedule' &&
          <Schedule />
        }
      </div>
    );
  };

  renderAdminPickModal = () => {
    if (this.props.shouldShowAdminPickModal) {
      return <AdminPickModal />;
    }
  }
}

AdminPage.propTypes = {
  isAdmin: PropTypes.bool,
  isSuperuser: PropTypes.bool,
  gameData: PropTypes.object,
  shouldShowAdminPickModal: PropTypes.bool,
  globalLoading: PropTypes.bool,
  error: PropTypes.any,
  getGameDataAdmin: PropTypes.func,
};

const mapStateToProps = state => ({
  isAdmin: selectIsAdmin(state),
  isSuperuser: selectIsSuperuser(state),
  gameData: selectAdminGameData(state),
  shouldShowAdminPickModal: selectShowAdminPickModal(state),
  globalLoading: selectGlobalLoading(state),
  error: selectAdminError(state),
});

const mapDispatchToProps = dispatch => ({
  getGameDataAdmin: () => dispatch(getGameDataAdminAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
