import React from 'react';
import { firebase } from './firebase/firebase'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Main from './routes/Main'
import Movies from './routes/Movies'
import Navbar from './components/Navbar'
import Settings from './components/Settings'
import './css.css'
require('firebase/auth')



class App extends React.Component {  
  constructor(props) {
   super(props)
  
    this.state = {
      user: ''
    }

   this.handleSettingsTurnOn = this.handleSettingsTurnOn.bind(this)

   this.settingsRef = React.createRef()
  }

  handleSettingsTurnOn() {
    this.settingsRef.current.handleSettingsTurnOn()
  }

  render() {
    const isLoggedIn = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if(!this.state.user) this.setState({ user })
        return true 
      } else return false
    })
    
    return (
      <div className='app'>
        <Router>
          <Navbar handleSettingsTurnOn={this.handleSettingsTurnOn} />
          <Settings ref={this.settingsRef} />

          <Switch>
            <Route path='/' exact>
              <Main />
            </Route>
            <Route path='/movies/:type' children={<Movies />}>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
