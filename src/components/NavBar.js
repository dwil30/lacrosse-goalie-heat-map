import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appNavBar:{
    borderBottom: '1px solid #000',
    backgroundColor: '#535353',
    zIndex: theme.zIndex.drawer + 1  
  }, 
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    fontWeight:'bold'  
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
    color:'#c2c2c2'
  },
  settingsButton:{
    color:'#c2c2c2',
    fontWeight:700
  },
 settings:{
     textDecoration:'none', 
     color:'black',
 }
})

class NavBar extends Component {
    
state = {
    value: 0,
    menuDrawer: false, 
    anchorEl: null,  
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  mobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose = (event) => {
    this.setState({ menuDrawer: false });
  }
  
  handleSettingsClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleSettingsClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  current = () => {
    if(this.props.location.pathname === '/') {
      return 0
    }
    else if(this.props.location.pathname === '/login') {
      return 1
    }
    else if(this.props.location.pathname === '/signup') {
      return 2
    }
    else if(this.props.location.pathname === '/dashboard') {
      return 3
    }
    else if(this.props.location.pathname === '/create') {
      return 4
    }
    else if(this.props.location.pathname === '/heatmap') {
      return 5
    }
    else return 6
  }
  
  
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
        <div className={classes.root}>
            <AppBar position={this.current() > 4 ? "fixed" : "static"} color='inherit' className={this.current() >= 3 ? classes.appNavBar : ''}>
                <Toolbar>
                    {this.current() < 3 ?
                    <Link to="/">
                        <img alt="logo" className="logo" src={require('../images/SportMapLogo_1.png')} />
                    </Link> :
                    <img src={require('../images/SportMapWhite.png')} alt="Logo" className="appimage" />
                    }
                
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        
                    </Typography>
                    {this.current() === 0 &&
                  
                    <React.Fragment>              
                    <Button component={Link} to="/login" color='primary' variant="outlined" className={classes.actionButtom}>Login</Button>
                    
                    <Button component={Link} to="/signup" color='primary' variant="contained" className={classes.actionButtom}>Get Started</Button>
                    </React.Fragment>             
                    }
                    
                    {this.current() === 1 &&
                    <Button variant="outlined" className="cta-button login w-button">Don&#x27;t have an account?</Button>
                    }
                    
                    {this.current() >= 3 &&
                    <React.Fragment>
                        <Button
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleSettingsClick}
                        className={classes.settingsButton}    
                        >
                            <SettingsIcon className={classes.leftIcon} />
                            Settings
                        </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleSettingsClose}
                    >
                      <MenuItem><Link className={classes.settings} to="/profile" onClick={this.handleSettingsClose}>Profile</Link></MenuItem>
                      <MenuItem><Link className={classes.settings} to="/dashboard" onClick={this.handleSettingsClose}>Dashboard</Link></MenuItem>
                      <MenuItem><Link className={classes.settings} to="/logout" onClick={this.handleSettingsClose}>Logout</Link></MenuItem>
                    </Menu>
                        </React.Fragment> 
                    }
                    
                </Toolbar>
            </AppBar>
        </div>
    )
  }
}


            
            /*
            <div>
                <AppBar
                title="Lacrosse Goalie Heat Map"
                style={this.props.drawer ? styles.appBarOpen : styles.appBar}
                iconElementLeft={<IconButton onClick={this.props.handleToggle}><FontIcon className='material-icons'>reorder</FontIcon></IconButton>}
                iconElementRight={this.props.authenticated ? (
                    <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    >
                        <Link to='/' onClick={this.props.addNewMap}><MenuItem primaryText="Create New Heat Map" /></Link>
                        <Link to='/dashboard'><MenuItem primaryText="View Saved Heat Maps" /></Link>
                        <Link to='/about'><MenuItem primaryText="About" /></Link>
                        <Divider />    
                        <Link to='/logout'><MenuItem primaryText="Sign out" /></Link>
                    </IconMenu>) : 
                    <Link to="/login"><FlatButton style={{marginTop:'4px'}} labelStyle={{color:'white'}} label="Login" /></Link>
        }
        />
      </div> */
export default withRouter(withStyles(styles)(NavBar))