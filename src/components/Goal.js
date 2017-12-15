import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Shot from './Shot';
import Login from './Login';
import Modal from './Modal';
import Heatmap from './Heatmap';
import Slider from 'material-ui/Slider';

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
        marginLeft:250
    },
     mainNoPadding:{
        marginLeft:0
    },
    slider: {
        marginTop:0,
        marginBottom:0
    }
}

export default class Goal extends React.Component {
     
    render() {
        return (
            <div className="main-body" style={this.props.drawer ? style.main : style.mainNoPadding}>
                <Paper onClick={this.props.addShot} style={style.paper}>
                    <Heatmap slider={this.props.slider} heatMap={this.props.heatMap} />
                    <div className="goal-container">
                        {this.props.goalie ? 
                        <img alt="Goalie Rightie" src={require('../images/GoalieRight.png')} className="goalie-rightie" /> :
                        <img alt="Goalie Leftie" src={require('../images/GoalieLeft.png')} className="goalie-leftie" />}
                        <img alt="GoalImage" src={require('../images/LacrosseGoalFinal.jpg')} className="goal-image" id="goal" />
                        
                        {
                        Object
                        .keys(this.props.shots)
                        .map(key => <Shot key={key} index={key} details={this.props.shots[key]} removeShot={this.props.removeShot}/>)
                        }
                        
                    </div>
                </Paper>
                <div className="right-column">
                {this.props.heatMap ?
                 <div>      
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
                            
                    {!this.props.authenticated ?
                    <Login setCurrentUser={this.props.setCurrentUser}/> : 
                    <div className='legend-container'>
                        <TextField
                        floatingLabelText="Heat Map Name"
                        type="text"
                        name="heatmapname"
                        style={{marginTop:0}}    />
                        <RaisedButton onClick={this.props.handleCreateMap} label="Save Heat Map" primary={true} style={style.button} />
                    </div>
                    }
                      
                    <div className="legend-container">
                        <div className="legend-text">Grid Length (2x2 up to 10x10)</div>
                        <input style={{width:200,margin:'auto'}} id='quads' className='w-input' min="2" max="10" name="quads" type="number" ref={(input) => { this.gridInput = input }} placeholder="Grid Length" />
                    </div>
                </div> :<div>
                    <RaisedButton onClick={this.props.handleCreateMap} label="Create Heat Map" primary={true} style={style.button} /><br/></div>
                }
                
               <RaisedButton onClick={this.props.handleDialogOpen} label="Remove All Shots" style={style.button} />
               <Modal 
                handleDialogClose={this.props.handleDialogClose} 
                open={this.props.open}
                clearShots={this.props.clearShots} />
                
                <RaisedButton onClick={this.props.loadSampleShots} label="Load Samples" style={style.button} />
                    
               
                
                    
                </div>
                
            </div>
        )
    }
}