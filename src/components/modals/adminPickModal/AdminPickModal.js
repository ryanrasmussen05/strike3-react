// import React from 'react';
// import './AdminPickModal.scss';
// import { Alert, Button, Form, Modal, Select } from 'antd';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import {
//   selectGameError,
//   selectIsSubmitting,
//   selectPickForSelectedWeek,
//   selectSelectedWeek,
// } from '../../../redux/selectors/game.selectors';
// import { showPlayerPickModalAction } from '../../../redux/actions/modal.actions';
// import { gameErrorAction, submitPickPlayerAction } from '../../../redux/actions/game.actions';
// import { GAME_ERROR_TYPES } from '../../../redux/reducers/game.reducer';
// import { AllTeams } from '../../../util/teams.util';
//
// class AdminPickModal extends React.Component {
//
//   componentWillUnmount() {
//     this.props.clearErrors();
//   }
//
//   closeModal = () => {
//     this.props.closeModal();
//   };
//
//   hasErrors = fieldsError => {
//     return Object.keys(fieldsError).some(field => fieldsError[field]);
//   };
//
//   handleSubmit = event => {
//     event.preventDefault();
//
//     this.props.form.validateFields((errors, values) => {
//       if (!errors) {
//         this.props.submitPick(values.team);
//       }
//     });
//   };
//
//   render() {
//     return (
//       <Modal
//         className="admin-pick-modal"
//         title={ `Week ${this.props.selectedWeek} Pick` }
//         visible={ true }
//         maskClosable={ false }
//         onCancel={ this.closeModal }
//         footer={ null }
//       >
//         { this.renderErrorMessage() }
//         { this.renderAdminPickForm() }
//       </Modal>
//     );
//   }
//
//   renderErrorMessage = () => {
//     if (this.props.error === GAME_ERROR_TYPES.SUBMIT) {
//       return (
//         <div className="error-message">
//           <Alert
//             message="An Error Occurred"
//             description="An error occurred while submitting the pick, please try again"
//             type="error"
//           />
//         </div>
//       );
//     }
//
//     if (this.props.error === GAME_ERROR_TYPES.DUPLICATE_PICK) {
//       return (
//         <div className="error-message">
//           <Alert
//             message="Repeat Pick"
//             description="The player has already picked this team in another week"
//             type="error"
//           />
//         </div>
//       );
//     }
//   };
//
//   renderAdminPickForm = () => {
//     const { getFieldDecorator, getFieldsError } = this.props.form;
//     const existingPick = this.props.existingPick.team || undefined;
//
//     return (
//       <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>
//
//         <Form.Item label="Team">
//           { getFieldDecorator('team', { rules: [{ required: true, message: 'Team is required' }], initialValue: existingPick })(
//             <Select
//               showSearch
//               placeholder="Select Team"
//               filterOption={ (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
//             >
//               { AllTeams.map(team => (
//                 <Select.Option key={ team.name } value={ team.abbreviation }>{ team.name }</Select.Option>
//               )) }
//             </Select>
//           ) }
//         </Form.Item>
//
//         <div className="note">
//           *You can change your pick until the game starts
//         </div>
//
//         <Button className="submit-button" type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block loading={ this.props.loading }>Submit Pick</Button>
//       </Form>
//     );
//   };
// }
//
// AdminPickModal.propTypes = {
//   form: PropTypes.object,
//   selectedWeek: PropTypes.number,
//   existingPick: PropTypes.object,
//   loading: PropTypes.bool,
//   error: PropTypes.string,
//   closeModal: PropTypes.func,
//   submitPick: PropTypes.func,
//   clearErrors: PropTypes.func,
// };
//
// const mapStateToProps = state => ({
//   // get week and pick from AdminSelectedPick
//   selectedWeek: selectSelectedWeek(state),
//   existingPick: selectPickForSelectedWeek(state),
//   loading: selectIsSubmitting(state),
//   error: selectGameError(state),
// });
//
// const mapDispatchToProps = dispatch => ({
//   closeModal: () => dispatch(showPlayerPickModalAction(false)),
//   submitPick: team => dispatch(submitPickPlayerAction(team)),
//   clearErrors: () => dispatch(gameErrorAction(null)),
// });
//
// const ConnectedAdminPickModal = connect(mapStateToProps, mapDispatchToProps)(AdminPickModal);
//
// export default Form.create({ name: 'adminPickForm' })(ConnectedAdminPickModal);
