import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Placeholder from '../../Placeholder';
import { selectShowPlayerPickModal } from '../../../redux/selectors/modal.selectors';
import PlayerPickModal from '../../modals/playerPickModal/PlayerPickModal';

class PlayerPage extends React.Component {

  renderPlayerPickModal = () => {
    if (this.props.shouldShowPlayerPickModal) {
      return <PlayerPickModal />;
    }
  };

  render() {
    return (
      <div>
        { this.renderPlayerPickModal() }
        <Placeholder />
      </div>
    );
  }
}

PlayerPage.propTypes = {
  shouldShowPlayerPickModal: PropTypes.bool,
};

const mapStateToProps = state => ({
  shouldShowPlayerPickModal: selectShowPlayerPickModal(state),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
