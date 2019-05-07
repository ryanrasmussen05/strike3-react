import React from 'react';
import { connect } from 'react-redux';
import WeekSelector from './weekSelector/WeekSelector';

class Placeholder extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <WeekSelector />
      </div>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Placeholder);
