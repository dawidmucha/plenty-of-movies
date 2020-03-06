import React from 'react';
import { firebase } from './firebase/firebase'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Main from './routes/Main'
import Movies from './routes/Movies'
import Navbar from './components/Navbar'
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
        <Navbar />

        <Switch>
          <Route path='/' exact>
            <Main />
          </Route>
          <Route path='/movies/:type' children={<Movies />}>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
