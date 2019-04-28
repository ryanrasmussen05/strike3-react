import React from 'react';
import './App.scss';
import configureStore from './redux/store/store';
import { Provider } from 'react-redux';
import Header from './components/header/Header';

const reduxStore = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={ reduxStore }>
        <div>
          <Header />
        </div>
      </Provider>
    );
  }
}

export default App;
