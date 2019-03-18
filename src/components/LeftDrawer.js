import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    display:'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    textAlign: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    width:'100%'
  },
  toolbar: theme.mixins.toolbar,
 iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
iOSSwitchBaseGoalie: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#d3d3d3',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },    
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: '#eb2e2e',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSBarGoalie: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: '#585858',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
  formControl: {
    margin: 0
  },
  group: {
    margin: 0
  },
  radio: {
      padding:3
  },
h1: {
    fontSize: 25,
},
h2: {
    fontSize: 25,
},
textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
signinButton:{
    marginLeft:8,
},
    greyList:{
        backgroundColor:'whitesmoke'
    }
});




class LeftDrawer extends Component {

    state = {
        optional: false,
        open: false,
    }

    clickRadio = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        this.props.clickOnFilterRadio(name, value)
    }

    showOptional = () => {
        this.setState({
            optional:!this.state.optional
        })
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };


    render() {
        const { classes } = this.props;
        // console.log(this.props.filter);
        return (
            <div>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                        <div className="data-points-header">
                            <h1 className="datah1">Data Points</h1>
                        </div>
                        <div className="data-points-container">
                            <div className="data-point-item">
                                <h4 className="data-point-heading-h4">Shot Result</h4>
                                <div className={this.props.shotResult ? "label-text" : "label-text save-text"}>Goal</div>
                                <Switch
                                  checked={this.props.shotResult}
                                  onChange={this.props.handleChange('shotResult')}
                                  value="shotResult"
                                  classes={{
                                    switchBase: classes.iOSSwitchBase,
                                    bar: classes.iOSBar,
                                    icon: classes.iOSIcon,
                                    iconChecked: classes.iOSIconChecked,
                                    checked: classes.iOSChecked,
                                  }}  
                                />
                                <div className={!this.props.shotResult ? "label-text" : "label-text goal-text"}>Save</div>
                            </div>
                            <div className="data-point-item">
                                <h4 className="data-point-heading-h4">Goalie</h4>
                                <div className="label-text">Leftie</div>
                                <Switch
                                  checked={this.props.goalie}
                                  onChange={this.props.switchGoalie}
                                  value="goalie"
                                  classes={{
                                    switchBase: classes.iOSSwitchBaseGoalie,
                                    bar: classes.iOSBarGoalie,
                                    icon: classes.iOSIcon,
                                    iconChecked: classes.iOSIconChecked,
                                    checked: classes.iOSChecked,
                                  }}  
                                />
                                <div className="label-text">Rightie</div>
                            </div>
                        </div>

                       <List>
                        <ListItem className={classes.greyList} button onClick={this.handleClick}>
                            <ListItemText primary="Optional Data" />
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <div className="data-points-container text-align-left">
                    <div className="data-point-item optional-item">
                        <h4 className="data-point-heading-h4">Shot Distance</h4>
                        <FormControl component="fieldset" className={classes.formControl}>

                              <RadioGroup
                                aria-label="Shot Distance"
                                name="shotDistance"
                                className={classes.group}
                                value={this.state.value}
                                onChange={this.handleRadioChange}
                              >
                                <FormControlLabel value="3to5" control={<Radio onClick={this.clickRadio} className={classes.radio} color="primary" />} label="3-5 yards" />
                                <FormControlLabel value="5to10" control={<Radio onClick={this.clickRadio} className={classes.radio}  color="primary" />} label="5-10 yards" />
                                <FormControlLabel value="10to15" control={<Radio onClick={this.clickRadio} className={classes.radio}  color="primary" />} label="10-15 yards" />
                                <FormControlLabel value="over15" control={<Radio onClick={this.clickRadio} className={classes.radio}  color="primary" />} label=">15 yards" />
                            </RadioGroup>
                        </FormControl>
                          <h4 className="data-point-heading-h4">Shot Type</h4>
                          <FormControl component="fieldset" className={classes.formControl}>

                              <RadioGroup
                                aria-label="Shot Type"
                                name="shotType"
                                className={classes.group}
                                value={this.state.value}
                                onChange={this.handleRadioChange}
                              >
                                <FormControlLabel value="overhand" control={<Radio onClick={this.clickRadio} className={classes.radio} color="primary" />} label="Overhand" />
                                <FormControlLabel value="sidearm" control={<Radio onClick={this.clickRadio} className={classes.radio}  color="primary" />} label="Sidearm" />
                                <FormControlLabel value="underhand" control={<Radio onClick={this.clickRadio} className={classes.radio}  color="primary" />} label="Underhand" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                      <div className="data-point-item optional-item">
                        <h4 className="data-point-heading-h4">Shot Distance</h4>
                        <FormControl component="fieldset" className={classes.formControl}>

                              <RadioGroup
                                aria-label="Bounce Shot"
                                name="bounceShot"
                                className={classes.group}
                                value={this.state.value}
                                onChange={this.handleRadioChange}
                              >
                                <FormControlLabel value="Yes" control={<Radio onClick={this.clickRadio} className={classes.radio} color="primary" />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio onClick={this.clickRadio} className={classes.radio}  color="primary" />} label="No" />
                            </RadioGroup>
                        </FormControl>

                         <h4 className="data-point-heading-h4">Shooter Hand</h4>
                          <FormControl component="fieldset" className={classes.formControl}>

                              <RadioGroup
                                aria-label="Shooter Hand"
                                name="shooterHand"
                                className={classes.group}
                                value={this.props.filter.shotDistance}
                                onChange={this.handleRadioChange}
                              >
                                <FormControlLabel value="left" control={<Radio onClick={this.clickRadio} className={classes.radio}  color="primary" />} label="Left" />
                                <FormControlLabel value="right" control={<Radio onClick={this.clickRadio} className={classes.radio} color="primary" />} label="Right" />

                            </RadioGroup>
                        </FormControl>

                          <h4 className="data-point-heading-h4">Game Situation</h4>
                          <FormControl component="fieldset" className={classes.formControl}>

                              <RadioGroup
                                aria-label="Shooter Hand"
                                name="shooterHand"
                                className={classes.group}
                                value={this.state.value}
                                onChange={this.handleRadioChange}
                              >
                                <FormControlLabel value="even" control={<Radio onClick={this.clickRadio} className={classes.radio} color="primary" />} label="Even" />
                                <FormControlLabel value="mandown" control={<Radio onClick={this.clickRadio} className={classes.radio}  color="primary" />} label="Man Down" />
                                <FormControlLabel value="fastbreak" control={<Radio onClick={this.clickRadio} className={classes.radio}  color="primary" />} label="Fast Break" />
                            </RadioGroup>
                        </FormControl>

                    </div>
                </div>
                        </Collapse>
                    </List>





                 {/*

                        <div className="optional-data-container">
                            <div className="shot-item-container">
                                <h6 className="itemheader">Shot Distansdce</h6>
                                <RadioButtonGroup name="shotDistance" valueSelected={this.props.filter.shotDistance}>
                                    <RadioButton onClick={this.clickRadio} value="0" label="3-5 yards" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton onClick={this.clickRadio} value="1" label="5-10 yards" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton onClick={this.clickRadio} value="2" label="10-15 yards" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton onClick={this.clickRadio} value="3" label=">15 yards" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                </RadioButtonGroup>
                            </div>


                            <div className="shot-item-container">
                                <h6 className="itemheader">Bounce Shot</h6>
                                <RadioButtonGroup name="bounceShot" valueSelected={this.props.filter.bounceShot}>
                                    <RadioButton onClick={this.clickRadio} value="Yes" label="Yes" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton onClick={this.clickRadio} value="No" label="No" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                </RadioButtonGroup>

                                <h6 className="itemheader">Shooter Hand</h6>
                                <RadioButtonGroup name="shooterHand" valueSelected={this.props.filter.shooterHand}>
                                    <RadioButton onClick={this.clickRadio} value="Right" label="Right" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton onClick={this.clickRadio} value="Left" label="Left" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                </RadioButtonGroup>
                            </div>

                            <div className="shot-item-container">
                                <h6 className="itemheader">Shot Type</h6>
                                <RadioButtonGroup name="shotType" valueSelected={this.props.filter.shotType}>
                                    <RadioButton onClick={this.clickRadio} value="Overhand" label="Overhand" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton onClick={this.clickRadio} value="Sidearm" label="Sidearm" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton onClick={this.clickRadio} value="Underhand" label="Underhand" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                </RadioButtonGroup>
                            </div>

                            <div className="shot-item-container">
                                <h6 className="itemheader">Game Situation</h6>
                                <RadioButtonGroup name="gameSituation" valueSelected={this.props.filter.gameSituation}>
                                    <RadioButton onClick={this.clickRadio} value="Even" label="Even" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton onClick={this.clickRadio} value="ManDown" label="Man Down" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton onClick={this.clickRadio} value="FastBreak" label="Fast Break" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                </RadioButtonGroup>
                            </div>

                        </div>


                        } */}

                </Drawer>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(LeftDrawer));
