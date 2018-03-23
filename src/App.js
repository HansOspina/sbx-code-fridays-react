import React, {Component} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import axios from 'axios';
import './App.css';

axios.defaults.baseURL = 'http://ibuyflowersdev.sbx.cloud';
axios.defaults.headers.post['App-Key'] = 'lapolito';

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    )
  }

}

export default App;
