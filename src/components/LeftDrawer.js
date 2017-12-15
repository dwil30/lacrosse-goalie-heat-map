import React from 'react';
import Drawer from 'material-ui/Drawer';
import Toggle from 'material-ui/Toggle';

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
};

export default class DrawerSimpleExample extends React.Component {
    
    render() {
        return (
            <div>
                <Drawer open={this.props.drawer}>
                    <div className="panel-top">
                        <img alt="Logo Text" src={require("../images/logo-text.png")} className="logopic"/>
                    </div>
                    <div className="panel-blue">
                        <img alt="Mascot" src={require("../images/Mascot.png")} className="logo-image"/>
                        <h2 className="datah2">Data Points</h2>
                    </div>
                    <div className="panel-main">
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
                </Drawer>
            </div>
        )
    }
}