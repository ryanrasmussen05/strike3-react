import React from 'react';
import './App.css';
import configureStore from './redux/store/store';
import { Provider } from 'react-redux';
import SampleComponent from './components/SampleComponent';

const reduxStore = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={ reduxStore }>
        <div className="App">
          <SampleComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
