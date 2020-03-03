import React from 'react';
import { firebase } from './firebase/firebase'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
require('firebase/auth')


class App extends React.Component {  
  constructor(props) {
   super(props)
  
    this.state = {
      user: ''
    }

   this.handleLogOut = this.handleLogOut.bind(this)
  }

  handleLogOut() {
    firebase.auth().signOut().then(() => {
      console.log('user logged out')
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const isLoggedIn = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if(!this.state.user) this.setState({ user })
        return true 
      } else return false
    })
    
    return (
      <Router>
        <Link to='/user'><button>kurikku</button></Link>
        <Link to='/signup'><button>sign up</button></Link> 
        <Link to ='/login'><button>log in</button></Link> 
        <button onClick={this.handleLogOut}>log out</button>

        logged in as {isLoggedIn ? `${this.state.user.email}` : 'nobody'}
        
        <br /> <br />

        <Switch>
          <Route path='/user'>
            pee pee poo poo
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <LogIn />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
