import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Header from './containers/Header'
import {Layout} from 'antd';

class App extends Component {
  state = {
    loggedIn: false
  }

  render(){
    return(
      <Layout>
        <Header loggedIn={this.state.loggedIn}/>
      </Layout>
    )
  }
}

export default App;
