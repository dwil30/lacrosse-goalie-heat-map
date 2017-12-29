import React from 'react';
import Drawer from 'material-ui/Drawer';
import Toggle from 'material-ui/Toggle';
import FontIcon from 'material-ui/FontIcon';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  block: {
    maxWidth: 250,
  },
  general: {
    marginTop: -10,
    width: 55
  },
  thumbOff: {
    backgroundColor: '#70c60b',
  },
  thumbSwitched: {
    backgroundColor: '#e82121',
  },
    trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  radioButton: {
    marginBottom: 5,
  },
    caretOpen: {
        transform: 'rotate(-90deg)'
    },
    caretClosed: {
        transform: 'rotate(0deg)'
    },
    labelStyle: {
        fontWeight:300, 
        fontSize:11
    }
};

export default class DrawerSimpleExample extends React.Component {
    
    constructor(){
        super();
        this.state = {
            optional: false,
        }
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
    

    render() {
        // console.log(this.props.filter);
        return (
            <div>
                <Drawer width={285} open={this.props.drawer}>
                    <div className="panel-top">
                        <img alt="Logo Text" src={require("../images/HeatMapsLogo.png")} className="logopic"/>
                    </div>
                     <div className="panel-blue">
                        <h2 className="datah2">Add Data Point</h2>
                     </div>
                     <div className="panel-main">
                        <div className="shot-item-container">
                            <h6 className="itemheader">Shot Result</h6>
                            <div className="control-container">
                                <p>Save</p>
                                <Toggle
                                    onToggle={this.props.switchShotResult}
                                    thumbStyle={styles.thumbOff}
                                    thumbSwitchedStyle={styles.thumbSwitched}
                                    trackSwitchedStyle={styles.trackSwitched}
                                    style={styles.general}
                                    toggled={!this.props.shotResult}
                                />
                                <p>Goal</p>
                            </div>
                        </div>
                        <div className="shot-item-container">
                            <h6 className="itemheader">Goalie</h6>
                            <div className="control-container">
                                <p>Rightie</p>
                                <Toggle
                                    name={"goalie"}
                                    onToggle={this.props.switchGoalie}
                                    style={styles.general}
                                    toggled={!this.props.goalieResult}
                                />
                                <p>Leftie</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="optional-block" onClick={this.showOptional}>
                        <div className="subheader">Optional Data</div>
                        <FontIcon 
                             style={!this.state.optional ? styles.caretOpen : styles.caretClosed}
                             className='material-icons caret'>keyboard_arrow_down</FontIcon>
                    </div>
                    
                        {this.state.optional &&
                        
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
                        }
                  
                </Drawer>
            </div>
        )
    }
}
