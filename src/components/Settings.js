import React from 'react'
import { firebase } from '../firebase/firebase'
import Modal from 'react-modal'
import LogIn from './LogIn'
import SignUp from './SignUp'

Modal.setAppElement('#root')

class App extends React.Component {  
  constructor(props) {
   super(props)
  
    this.state = {
			settingsClass: 'settingsHidden',
			logInModalIsOpen: '',
			signUpModalIsOpen: '',
			user: ''
		}
		
		this.handleSettingsTurnOff = this.handleSettingsTurnOff.bind(this)
		this.handleSettingsTurnOn = this.handleSettingsTurnOn.bind(this)
		this.openLogInModal = this.openLogInModal.bind(this)
		this.closeLogInModal = this.closeLogInModal.bind(this)
		this.openSignUpModal = this.openSignUpModal.bind(this)
		this.closeSignUpModal = this.closeSignUpModal.bind(this)
		this.handleLogOut = this.handleLogOut.bind(this)
	}

	handleLogOut() {
    firebase.auth().signOut().then(() => {
			this.setState({ user: '' })
			console.log('user logged out')
    }).catch(err => {
      console.log(err)
    })
  }

	handleSettingsTurnOff() {
		this.setState({ settingsClass: 'settingsHidden' })
	}
	handleSettingsTurnOn() {
		this.setState({ settingsClass: '' })
	}

	openLogInModal() {
		this.setState({ logInModalIsOpen: true })
	}
	closeLogInModal() {
		console.log('john mulaney')
		this.setState({ logInModalIsOpen: false })
	}
	openSignUpModal() {
		this.setState({ signUpModalIsOpen: true })
	}
	closeSignUpModal() {
		this.setState({ signUpModalIsOpen: false })
	}
	
  render() {    
		firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if(!this.state.user) this.setState({ user: user.email })
        return true 
      } else return false
    })
		
		return (
			<div id='settings' className={this.state.settingsClass}>
				<div className='settingsBackground' onClick={this.handleSettingsTurnOff}></div>
				<div className='settings'>
					settings <button onClick={this.handleSettingsTurnOff}>=</button>
					
					{ this.state.user ? 
						<div>
							<button onClick={this.handleLogOut}>log out</button>
							<div>logged in as {this.state.user}</div>
						</div> 
					: 
						<div>
							<button onClick={this.openLogInModal}>log in</button>
							<button onClick={this.openSignUpModal}>sign up</button>
						</div> 
					} 

					<Modal isOpen={this.state.logInModalIsOpen}>
						<LogIn closeModal={this.closeLogInModal} />
						<button onClick={this.closeLogInModal}>X</button>
					</Modal>
					<Modal isOpen={this.state.signUpModalIsOpen}>
						<SignUp />
						<button onClick={this.closeSignUpModal}>X</button>
					</Modal>
				</div>
			</div>
    )
  }
}

export default App;
