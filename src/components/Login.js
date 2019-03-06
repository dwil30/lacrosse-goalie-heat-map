import React, { Component } from 'react';
import { app, facebookProvider } from '../base';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
   textField: {
    width:'90%',
    marginTop: '5px',
    marginBottom: '8px'
  },
    loginButton:{
        marginTop:'20px',
        float:'right'
    }, 
    signinButton:{
        marginTop:'20px',
        width:'90%',
        fontSize:'18px'
    }, 
    resetLink:{
        marginTop:'20px',
        cursor:'pointer'
    }, 
});

class Login extends Component {
    
  state = {  
    email: '',
    password:'',
    messageOpen: false, 
    errorMessage: '',
    resetPassword: false, 
    redirect: false
  }

  componentDidMount() {
      this.setState({ resetPassword: false });
  }

handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

 handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ messageOpen: false });
  };

 passwordReset = () => {
    this.setState({ resetPassword: !this.state.resetPassword });
  };
    
 authWithEmailPassword(event) {
    event.preventDefault()
    
    const email = this.state.email
    const password = this.state.password

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
          this.props.setCurrentUser(user);
          this.setState({redirect: true});
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({messageOpen:true, errorMessage: error.message});
      })
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
    
  render() {
    const { classes } = this.props;
    //const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.state.redirect === true) {
      return <Redirect to='/dashboard' />
    }
      
    return (
         <div className="login-wrapper">
            <div className="login-nav">
                <div className="login-nav-container w-container">
                    <Link to="/">
                        <img src={require("../images/SportMapLogo_1.png")} alt="Logo" className="logo" />
                    </Link>    
                    
                    <Button component={Link} to="/signup" color='primary' variant="outlined" className={classes.loginButton}>Sign Up For New Account</Button>
                </div>
                <div className="modalcontainer reigstercontainer">
                    <h2 className="contacth2">{this.state.resetPassword ? "Reset Password" : "Log In"}</h2>
                    <h4 className="registerh4">{this.state.resetPassword ? "Enter your email address below to receive a password reset email." : "A world of heat maps awaits you inside"}</h4>
                    
                    <form onSubmit={event => this.authWithEmailPassword(event)}>
                   
                        <TextField
                          id="outlined-email-input"
                          label="Email"
                          className={classes.textField}
                          type="email"
                          name="email"
                          autoComplete="email"
                          margin="normal"
                          variant="outlined"
                          onChange={this.handleChange('email')}  
                        />
                 
                        
                        {!this.state.resetPassword &&
                   
                            <TextField
                              id="outlined-password-input"
                              label="Password"
                              className={classes.textField}
                              type="password"
                              autoComplete="current-password"
                              margin="normal"
                              variant="outlined"
                              onChange={this.handleChange('password')}  
                            />
                             
                        }

                        {!this.state.resetPassword ? 
                        <Button type="submit" color='primary' variant="contained" className={classes.signinButton}>Log In</Button> :
                        <Button type="submit" color='primary' variant="contained" className={classes.signinButton}>Send Password Reset Email</Button>
                        }
                             
                        {!this.state.resetPassword ?
                        <div className={classes.resetLink} onClick={this.passwordReset}>Forgot Password?</div> :
                        <div className={classes.resetLink} onClick={this.passwordReset}>Return to Login</div>
                        }
                        {/*
                        <img src={require("../images/Screenshot-2017-09-20-19.36.45.png")} alt="Line Separator" className="orimage"/>
                        
                        <img src={require("../images/SignUpWithFacebook.png")} alt="Facebook Login" className="facebook-login-image"/>
                        */}
                   
                    </form>
                </div>
             </div>
                
            <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={this.state.messageOpen}
            autoHideDuration={3000}
            onClose={this.handleSnackbarClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.errorMessage}</span>}
        />
        </div>
    )
  }
}

export default withRouter(withStyles(styles)(Login));