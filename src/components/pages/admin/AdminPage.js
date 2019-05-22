import React from 'react';
import './AdminPage.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GAME_ERROR_TYPES } from '../../../redux/reducers/game.reducer';
import { Alert } from 'antd';
import { selectGameData, selectGameError } from '../../../redux/selectors/game.selectors';
import { getGameDataAdminAction } from '../../../redux/actions/game.actions';
import { selectIsAdmin } from '../../../redux/selectors/admin.selectors';
import { selectGlobalLoading } from '../../../redux/selectors/global.selectors';
import GameTable from '../../gameTable/GameTable';

class AdminPage extends React.Component {

  componentDidMount() {
    this.props.getGameDataAdmin();
  }

  render() {
    const isError = !this.props.globalLoading && ((this.props.error && this.props.error === GAME_ERROR_TYPES.GAME_DATA) || !this.props.isAdmin);

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
        <div className="game-table-container">
          <GameTable />
        </div>
      </div>
    );
  };
}

AdminPage.propTypes = {
  isAdmin: PropTypes.bool,
  gameData: PropTypes.object,
  globalLoading: PropTypes.bool,
  error: PropTypes.any,
  getGameDataAdmin: PropTypes.func,
};

const mapStateToProps = state => ({
  isAdmin: selectIsAdmin(state),
  gameData: selectGameData(state),
  globalLoading: selectGlobalLoading(state),
  error: selectGameError(state),
});

const mapDispatchToProps = dispatch => ({
  getGameDataAdmin: () => dispatch(getGameDataAdminAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
