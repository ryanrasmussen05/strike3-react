import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sampleAction, sampleSagaAction } from '../redux/actions/sample.actions';
import { selectSampleText } from '../redux/selectors/sample.selectors';

class SampleComponent extends React.Component {
  handleClick = () => {
    let nextValue;

    if (this.props.value) {
      nextValue = `${this.props.value}a`;
    } else {
      nextValue = 'a';
    }

    this.props.updateSample(nextValue);
  };

  render() {
    return (
      <div>
        <div>
          <button type="button" onClick={ this.handleClick }>Click Me For Reducer Only Action</button>
          <span>{ this.props.value }</span>
        </div>
        <div>
          <button type="button" onClick={ this.props.sagaAction }>Click Me For Saga Action</button>
        </div>
      </div>
    );
  }
}

SampleComponent.propTypes = {
  value: PropTypes.string,
  updateSample: PropTypes.func,
  sagaAction: PropTypes.func,
};

const mapStateToProps = state => ({
  value: selectSampleText(state),
});

const mapDispatchToProps = dispatch => ({
  updateSample: text => dispatch(sampleAction(text)),
  sagaAction: () => dispatch(sampleSagaAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SampleComponent);
