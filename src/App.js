import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Header from './containers/Header'
import {Layout} from 'antd';

const API_URL = "http://localhost:3000"
const AUTH_URL = API_URL + "/auth"

class App extends Component {
  state = {
    loggedIn: false,
    user: null
  }

  userSignUp = (values) => {
    fetch(AUTH_URL, {
      method: 'POST', 
      headers: {'Content-Type':'application/json',
                Accept: 'application/json'
      },
      body: JSON.stringify(values)
      })
      .then((res) => res.json())
      .then((data)=> {
        console.log(data)
    });
  }

  userLogin = (values) => {
    console.log(values)
    let userData
    fetch(AUTH_URL + "/sign_in", {
      method: 'POST', 
      headers: {'Content-Type':'application/json',
                Accept: 'application/json'
      },
      body: JSON.stringify(values)
      })
      .then((res) => {
        if(res.status == 200) {
          const accessToken = res.headers.get('access-token');
          const client = res.headers.get('client');
          const uid = res.headers.get('uid');
          const expiry = res.headers.get('expiry');
          userData = { accessToken, client, expiry, uid };
        }
        return res.json()})
      .then((data)=> {
        userData = {...userData, user: data.data}
        localStorage.setItem('userData', JSON.stringify(userData))
        this.setState({
          loggedIn: true,
          user: userData
        })
    });
  }

  userLogOut = () => {
    fetch(AUTH_URL + "/sign_out", {
      method: 'DELETE',
      headers: {...this.tokenHeaders(),
        'Content-Type':'application/json',
                Accept: 'application/json'
      }})
      .then((res) => res.json())
      .then((data)=> {
        if(data.success){
          localStorage.removeItem('userData')
          this.setState({
            loggedIn: false,
            user: null
          })
        }
    });
  }

  tokenHeaders = () => {
    let user = this.state.user
    return{
      ['access-token']: user.accessToken,
      ['token-type']: 'Bearer',
      client: user.client,
      expiry: user.expiry,
      uid: user.uid
    }
  }

  componentWillMount(){
    // localStorage.removeItem('userData')
    let userData = JSON.parse(localStorage.getItem('userData'))
    if(userData){
      this.setState({loggedIn: true, user: userData})
    }
  }

  render(){
    return(
      <Layout>
        <Header loggedIn={this.state.loggedIn} userSignUp={this.userSignUp} userLogin={this.userLogin} userLogOut={this.userLogOut}/>
      </Layout>
    )
  }
}

export default App;
