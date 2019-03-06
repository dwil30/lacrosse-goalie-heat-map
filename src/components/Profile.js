import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NavBar from './NavBar';
import Footer from './Footer';  
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


const styles = theme => ({ 
    tabs:{
        backgroundColor:'grey'
    },
    tabsBody:{
        backgroundColor:'white',
    }, 
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
  },
    button:{
        marginTop:15
    }
});

class Profile extends Component {

  state = {
       value: 0,
  };


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };



  render() {
  
    const { classes } = this.props;
    return (
      <React.Fragment>
        <NavBar />
        <div className="main">
            <div className="finalsection">
                <div className="page-header">
                    <div className="sub-header-container w-container">
                        <h1 className="title">Profile</h1>
                    </div>
                </div>
                <div className="dashboard-container">
                    <div className="w-container">
                        <div className="profile-wrapper">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                className={classes.tabs}
                                >
                                <Tab label="Account" />
                                <Tab label="Billing" />
                               
                              </Tabs>
                             <SwipeableViews
                              axis={'x'}
                              index={this.state.value}
                              onChangeIndex={this.handleChangeIndex}
                              className={classes.tabsBody}     
                              >
                             <TabContainer
                                  className={classes.tabsContainer} 
                                 >
                                   <TextField
                                      id="outlined-email-input"
                                      label="Email"
                                      className={classes.textField}
                                      type="email"
                                      name="email"
                                      autoComplete="email"
                                      margin="normal"
                                      variant="outlined"
                                    />
                                  <TextField
                                      id="outlined-email-input"
                                      label="Password"
                                      className={classes.textField}
                                      type="password"
                                      name="email"
                                      margin="normal"
                                      variant="outlined"
                                    />
                             
                                <Button disabled variant="contained" color="primary" className={classes.button}>
                                Save Changes
                                </Button>
                                 
                             </TabContainer>
                             <TabContainer>
                                 <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Membership Plan</TableCell>
                                        <TableCell>Renewal</TableCell>
                                        <TableCell>Payment Method</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>Pro Member</TableCell>
                                        <TableCell>$4.99 on 1/28/2019</TableCell>  
                                        <TableCell>Visa</TableCell>
                                     </TableRow>
                                    <TableRow style={{backgroundColor:'whitesmoke'}}>   
                                        <TableCell colSpan={3}><Check style={{paddingTop:10,color:'#046c04'}}/>Auto-renew is <Typography style={{ color: '#046c04',display:'inline-block' }}>on</Typography>. You can disable auto-renew here.</TableCell>
                                    </TableRow>
                                     <TableRow style={{backgroundColor:'whitesmoke'}}>   
                                       <TableCell colSpan={3}><Close style={{paddingTop:10,color:'#b10000'}}/>Auto-renew is <Typography style={{ color: '#b10000',display:'inline-block' }}>off</Typography>. You can enable auto-renew here.</TableCell>
                                    </TableRow>    
                                    </TableBody>
                                </Table>
                            </TabContainer>
                            </SwipeableViews>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />    
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Profile));