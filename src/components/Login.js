import React, { Component } from 'react';
import { app } from '../base';
// import Menu from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import NavBar from './NavBar'
import {Link, Redirect} from 'react-router-dom';
import Paper from 'material-ui/Paper';
//import TextField from 'material-ui/TextField';

// const style = {
//     paper: {
//         width: 'auto',
//         margin: 20,
//         padding: 20,
//         textAlign: 'center',
//         display: 'inline-block',
//     },
//     menu: {
//         maxWidth: 300,
//     },
//     button:{
//         margin:'auto'
//     }
// };

class Login extends Component {
    
  constructor(props) {
    super(props)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = {  
      messageOpen: false, 
      errorMessage: '',
    }
  }
    
 authWithEmailPassword(event) {
    event.preventDefault()
    
    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          // create user
          return app.auth().createUserWithEmailAndPassword(email, password)
        } else if (providers.indexOf("password") === -1) {
          // they used facebook
          //this.loginForm.reset()
          this.setState({messageOpen:true, errorMessage: 'Email already in use with a social service.'}) 
        } else {
          // sign user in
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        if (user && user.email) {
          //this.loginForm.reset()
          this.setState({redirect: true});
          this.props.setCurrentUser(user);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({messageOpen:true, errorMessage: error.message});
      })
  }
    
  render() {
      
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.state.redirect === true) {
      return <Redirect to={from} />
    }
      
    return (
        <div> 
            <NavBar />
        
            <div className="login-wrapper">
                <Paper className="login-container">
                    <h3 className="loginh3">Login</h3>
                <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        className='w-input'
                        placeholder="Email"
                        name='email'
                        type='email'
                        ref={(input) => { this.emailInput = input }}
                     />
                    <label htmlFor="password">Password:</label>
                    <input
                        className='w-input'
                        placeholder="Password"
                        name='password'
                        type='password'
                        ref={(input) => { this.passwordInput = input }}
                     />
                     <RaisedButton label="Login" primary={true} type='submit' /><br/>
                   
                </form>
                <Link style={{float:'right'}} to='/'>Back</Link>    
            </Paper>
            
                
            <Snackbar
            open={this.state.messageOpen}
            message={this.state.errorMessage}
            autoHideDuration={3000}
            onRequestClose={this.handleRequestClose}
            style={{backgroundColor:'red', color:'white'}}/>
        </div>
            </div>
    )
  }
}

export default Login
