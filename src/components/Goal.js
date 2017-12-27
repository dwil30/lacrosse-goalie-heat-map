import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Shot from './Shot';
// import Login from './Login';
import Modal from './Modal';
import Heatmap from './Heatmap';
import Slider from 'material-ui/Slider';
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton'


const style = {
    button:{
        margin: 5
    },
    paper: {
        padding: 0, 
        position:'relative',
        width:420, 
        height:440,
        float:'left', 
        marginRight:20,
        cursor: 'crosshair',
        display:'inline-block'
    },
    paperSubmit: {
        padding:20, 
        width:300,
        position:'relative',
        float:'left',
        display:'inline-block'
    }, 
    main:{
        marginLeft:280
    },
     mainNoPadding:{
        marginLeft:0
    },
    slider: {
        marginTop:-15,
        marginBottom:0
    }
}

export default class Goal extends React.Component {

    changeGridNumber = (e) => {
        this.props.heatMapBoxNumber(e);
    }

    getShots = (shots) => {
        if (!shots || shots.length===0) {
            return null
        }
        return Object.keys(shots).map( (item, key) => (
            < Shot key={item} index={item} details={shots[item]} removeShot={this.props.removeShot} /> 
        ))
    }

    changeNameInput = (e) => {
        this.setState({
            nameInputValue: e.target.value
        })
    }

    getSaveNameField = () => {
        const saved = this.props.appState.data[this.props.appState.activeData].name;

        return (
            <div className='legend-container'>
                <TextField
                    id="text-field-controlled"
                    hintText="Heat Map Name"
                    style={{ marginRight: 10 }}
                    onChange={this.props.saveName}
                    value={saved}
                />
                <br />
                {/* <RaisedButton label="Save Heat Map" className="options-button w-button" style={buttonStyle} onClick={() => this.props.saveName(value)}/> */}
            </div>
        )
    }



    render() {
        const appState = this.props.appState;
        const activeData = appState.activeData;
        let shots = []
        if (appState.data[activeData]) {
            shots = appState.data[activeData].shots;
        }

        return (
            <div className="main-body" style={this.props.drawer ? style.main : style.mainNoPadding}>
                <Paper onClick={this.props.addShot} style={style.paper}>
                    
                    {this.props.heatMap &&
                    <Heatmap
                        shots={shots}
                        slider={this.props.slider}
                        heatMap={this.props.heatMap}
                        heatMapLength={this.props.heatMapLength}
                        paperWidth={style.paper.width}
                        paperHeight={style.paper.height}
                    />}
                    
                    <div className="goal-container">
                        {this.props.goalie ?
                        <img alt="Goalie Rightie" src={require('../images/GoalieRight.png')} className="goalie-rightie" /> :
                        <img alt="Goalie Leftie" src={require('../images/GoalieLeft.png')} className="goalie-leftie" />}
                        <img alt="GoalImage" src={require('../images/LacrosseGoalFinal.jpg')} className="goal-image" id="goal" />
                        
                        {this.getShots(shots)}
                        
                    </div>
                </Paper>
                <div className="right-container">
                {this.props.heatMap ?
                 <div> 
                    {!this.props.appState.authenticated ?
                        <Link to='/login'><FlatButton label='login to save your heatmap'/></Link> :
                        this.getSaveNameField()
                    }        
                    <div className="legend-container">
                        <div className="legend-text">Save Percentage</div>
                        <div className="legend-block first">0-20%</div>
                        <div className="legend-block second">20-40%</div>
                        <div className="legend-block third">40-60%</div>
                        <div className="legend-block fourth">60-80%</div>
                        <div className="legend-block fifth">80-100%</div>
                        <div className="legend-text w-clearfix">
                            <div className="legend-block grey">No Data</div>
                        </div>
                    </div>
                    
                    <div className="slider-container">
                        <div className="legend-text">Heat Map Opacity: {this.props.slider}</div>
                        <Slider className='slider' style={style.slider} value={this.props.slider} onChange={this.props.handleFirstSlider} />
                    </div>
                            
                    
        
                    <div className="legend-container">
                        <div className="legend-text">Grid Length (2x2 up to 15x15)</div>
                        <input
                            style={{width:200,margin:'auto'}} 
                            id='quads'
                            onChange={this.changeGridNumber}
                            className='w-input' 
                            min="2" max="15" 
                            name="quads"
                            type="number"
                            value={this.props.heatMapLength}
                            ref={(input) => { this.gridInput = input }} 
                            placeholder="Grid Length" 
                        />
                    </div>
                        {/*
                     <div className="legend-container">
                          <div className="legend-text">Share:</div>
                             <div className="share-container">
                                 <div className='Facebook'>Facebook</div>
                                 <div className='Twitter'>Twitter</div>
                                 <div className='Google'>Google+</div>
                                 <div className='Pinterest'>Pinterest</div>
                            </div>
                    </div>  */}
                    <div className="legend-container">
                             <RaisedButton backgroundColor={'#ff00004d'} onClick={this.props.handleDialogOpen} label="Remove All Shots" className="options-button w-button" style={{position:'absolute',bottom:0,right:20}} />
                             <RaisedButton onClick={this.props.closeHeatmap} label="Edit Heatmap" className="options-button w-button" style={{margin:'auto'}} />
                    </div>        
                </div> : <div>
                        
                    <RaisedButton onClick={this.props.handleCreateMap} label="Show Heat Map" primary={true}  className="options-button w-button" /><br/>
                        
                    <RaisedButton onClick={this.props.handleDialogOpen} label="Remove All Shots" className="options-button w-button" /> <br/>
                
                    <RaisedButton onClick={this.props.loadSampleShots} label="Load Samples" className="options-button w-button" />    
                    
                </div>
                }
                    <Modal 
                    handleDialogClose={this.props.handleDialogClose} 
                    open={this.props.open}
                    clearShots={this.props.clearShots} />  
                </div>
                
            </div>
        )
    }
}
