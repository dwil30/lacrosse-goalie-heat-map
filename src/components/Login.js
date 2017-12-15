import React, { Component } from 'react';
import { app, facebookProvider, twitterProvider, googleProvider } from '../base';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
//import RaisedButton from 'material-ui/RaisedButton';
//import TextField from 'material-ui/TextField';

const style = {
    paper: {
        width: 'auto',
        margin: 20,
        padding: 20,
        textAlign: 'center',
        display: 'inline-block',
    },
    menu: {
        maxWidth: 300,
    }
};

class Login extends Component {
    
  constructor(props) {
    super(props)
    this.authWithFacebook = this.authWithFacebook.bind(this)
    this.authWithTwitter = this.authWithTwitter.bind(this)
    this.authWithGoogle = this.authWithGoogle.bind(this)   
    this.state = {  
      messageOpen: false, 
      errorMessage: '',
    }
  }

  authWithFacebook() {
    app.auth().signInWithPopup(facebookProvider)
      .then((user, error) => {
        if (error) {
          this.setState({messageOpen:true, errorMessage: 'Unable to sign in with Facebook'})  
        } else {
            this.props.setCurrentUser(user)
        }
      })
  }
    
  authWithTwitter() {
    app.auth().signInWithPopup(twitterProvider)
      .then((user, error) => {
        if (error) {
          this.setState({messageOpen:true, errorMessage: 'Unable to sign in with Twitter'})  
        } else {
            this.props.setCurrentUser(user)
        }
      })
  }
    
  authWithGoogle() {
    app.auth().signInWithPopup(googleProvider)
      .then((user, error) => {
        if (error) {
          this.setState({messageOpen:true, errorMessage: 'Unable to sign in with Google'})  
        } else {
            this.props.setCurrentUser(user)
        }
      })
  }    

  render() {
      
    return (
        <div>
            <h4>Login/Create Account to Create and Save Heat Maps</h4>
            <p>Connect via these social networks</p>  
            <Menu style={style.menu}>
                <div>
                    <MenuItem style={{width:'90%',backgroundColor:'#3b5998',color:'white'}} primaryText="Facebook" onClick={() => { this.authWithFacebook() }} />
                    <MenuItem style={{width:'90%',backgroundColor:'#0084b4',color:'white'}} primaryText="Twitter" onClick={() => { this.authWithTwitter() }} />
                    <MenuItem style={{width:'90%',backgroundColor:'#DB4C3F',color:'white'}} primaryText="Google" onClick={() => { this.authWithGoogle() }}/>
                </div>  
            </Menu>
      
                
            <Snackbar
            open={this.state.messageOpen}
            message={this.state.errorMessage}
            autoHideDuration={3000}
            onRequestClose={this.handleRequestClose}
            style={{backgroundColor:'red', color:'white'}}/>
        </div>
    )
  }
}

export default Login
