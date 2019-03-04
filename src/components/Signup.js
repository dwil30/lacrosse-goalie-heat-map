import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

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
    }
});

class Signup extends Component {

  state = {
    email: '',
    password:'',
  };

  componentDidMount() {}
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
        <div className="login-wrapper signup">
            <div className="login-nav">
                <div className="login-nav-container w-container">
                    <Link to="/">
                        <img src={require("../images/SportMapLogo_1.png")} alt="Logo" className="logo" />
                    </Link>    
                    
                    <Button component={Link} to="/login" color='primary' variant="outlined" className={classes.loginButton}>Log In</Button>
                </div>
                <div className="modalcontainer reigstercontainer">
                    <h2 className="contacth2">Get Started Free</h2>
                    <h4 className="registerh4">Easy to set up, no credit card required</h4>
                    <form className={classes.container} noValidate autoComplete="off">
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
                        
                        <Button color='primary' variant="contained" className={classes.signinButton}>Sign Up</Button>
                        
                        <img src={require("../images/Screenshot-2017-09-20-19.36.45.png")} alt="Line Separator" className="orimage"/>
                        
                        <img src={require("../images/SignUpWithFacebook.png")} alt="Facebook Login" className="facebook-login-image"/>
                        
                    </form>
                </div>
                <div className="registrationtext black">By signing up, you accept our <Link to="/" className="reglink">Terms of Service</Link> and <Link to="/" className="reglink">Privacy Policy</Link>.
                <br/>
                Already have an account? <Link to="/login" className="reglink">Login</Link></div>
            </div>
        </div>
    )
  }
}

export default withRouter(withStyles(styles)(Signup));