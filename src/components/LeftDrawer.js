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
        this.showOptional = this.showOptional.bind(this);
        this.state = {
            optional: false
        }
    }
    
    showOptional(){
        this.setState({
            optional:!this.state.optional
        })
    }
    
    
    render() {
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
                                onClick={this.props.switchResult}
                                thumbStyle={styles.thumbOff}
                                thumbSwitchedStyle={styles.thumbSwitched}
                                trackSwitchedStyle={styles.trackSwitched}
                                style={styles.general} />
                                <p>Goal</p>
                            </div>
                        </div>
                        <div className="shot-item-container">
                            <h6 className="itemheader">Goalie</h6>
                            <div className="control-container">
                                <p>Rightie</p>
                                <Toggle
                                name={"goalie"}
                                onClick={this.props.switchGoalie}
                                style={styles.general}
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
                        
                        <div class="optional-data-container">
                            <div class="shot-item-container">
                                <h6 class="itemheader">Shot Distance</h6>
                                <RadioButtonGroup name="shotDistance">
                                    <RadioButton value="3-5" label="3-5 yards" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton value="5-10" label="5-10 yards" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton value="10-15" label="10-15 yards" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton value="15+" label=">15 yards" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                </RadioButtonGroup>
                            </div>
      
                            
                            <div class="shot-item-container">
                                <h6 class="itemheader">Bounce Shot</h6>
                                <RadioButtonGroup name="shooterHand">
                                    <RadioButton value="Yes" label="Yes" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton value="No" label="No" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                </RadioButtonGroup>
                                
                                <h6 class="itemheader">Shooter Hand</h6>
                                <RadioButtonGroup name="shooterHand">
                                    <RadioButton value="Right" label="Right" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton value="Left" label="Left" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                </RadioButtonGroup>
                            </div>
                            
                            <div class="shot-item-container">
                                <h6 class="itemheader">Shot Type</h6>
                                <RadioButtonGroup name="shooterHand">
                                    <RadioButton value="Overhand" label="Overhand" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton value="Sidearm" label="Sidearm" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton value="Underhand" label="Underhand" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                </RadioButtonGroup>
                            </div>
                            
                             <div class="shot-item-container">
                                <h6 class="itemheader">Game Situation</h6>
                                <RadioButtonGroup name="shooterHand">
                                    <RadioButton value="Even" label="Even" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton value="ManDown" label="Man Down" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                    <RadioButton value="FastBreak" label="Fast Break" labelStyle={styles.labelStyle} style={styles.radioButton}/>
                                </RadioButtonGroup>
                            </div>
                            
                        </div>
                        }
                  
                </Drawer>
            </div>
        )
    }
}