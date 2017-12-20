import React, {Component} from 'react';
import NavBar from './NavBar';
import LeftDrawer from './LeftDrawer';
import Goal from './Goal';
import sampleShots from '../sample-shots'

export default class Main extends Component {
    
    componentWillMount() {
        // check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`shots`);
        if(localStorageRef) {
            // update our App component's shots state
            this.setState({
            shots: JSON.parse(localStorageRef), 
            })
        }
        const mapSet = localStorage.getItem(`heatMap`);
    
        if(mapSet){
            this.setState({
            heatMap: JSON.parse(mapSet), 
            })
        }
    }
    
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`shots`, JSON.stringify(nextState.shots));
        //localStorage.setItem('heatMap', JSON.stringify(nextState.heatMap));
    }
    
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.switchResult = this.switchResult.bind(this);
        this.switchGoalie = this.switchGoalie.bind(this);
        this.addShot = this.addShot.bind(this);
        this.removeShot = this.removeShot.bind(this)
        this.clearShots = this.clearShots.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleCreateMap = this.handleCreateMap.bind(this);
        this.loadSampleShots = this.loadSampleShots.bind(this);
        this.handleFirstSlider = this.handleFirstSlider.bind(this);
        this.closeHeatmap = this.closeHeatmap.bind(this);
    
        this.state = {
            slider:0.9,
            heatMap: false,
            open: false,
            drawer: true, 
            shotResultToggle: true, //true = Save, false = Goal
            goalie: true,
            shots: {}, //xcoord, ycoord, shotResult, goalie
            heatMapLength: 3, 
            editMode:false
        }
    }

    handleToggle(){
        this.setState({drawer: !this.state.drawer});
    }
    
    switchResult(){
        this.setState({shotResultToggle: !this.state.shotResultToggle});
    }
    
    switchGoalie(){
       this.setState({goalie: !this.state.goalie});
    }
    
    addShot(e){
        //get relative x, y coordinates of click
        var container = document.getElementById("goal");
        var target = e.target || e.srcElement,
        style = container.currentStyle || window.getComputedStyle(target, null),
        borderLeftWidth = parseInt(style['borderLeftWidth'], 10),
        borderTopWidth = parseInt(style['borderTopWidth'], 10),
        rect = container.getBoundingClientRect(),
        offsetX = e.clientX - borderLeftWidth - rect.left,
        offsetY = e.clientY - borderTopWidth - rect.top;
        
        // add in our new shot
        var shotResultToggle = this.state.shotResultToggle;
        var goalie = this.state.goalie;
        const timestamp = Date.now();
        
        const shotClick = {
            xCoor: offsetX, 
            yCoor: offsetY, 
            shotResult: shotResultToggle, 
            goalie:goalie
        }
        const shots = {...this.state.shots};
        shots[`shot-${timestamp}`] = shotClick
        // set state
        this.setState({ shots });
    }
    
    removeShot(key){
        const shots = {...this.state.shots};
        delete shots[key];
        this.setState({shots})
    }
    
    clearShots(){
        this.setState({ shots: {}, open:false });
    }
    
    handleDialogOpen(){
        this.setState({open: true});
    }

    handleDialogClose(){
        this.setState({open: false});
    }
    
    handleCreateMap(){
        this.setState({heatMap: true});  
    }
    
    loadSampleShots(){
        this.setState({
            shots: sampleShots
        })
    }
    
    handleFirstSlider(event, value){
        this.setState({slider: value})
    }
    
    closeHeatmap(){
         this.setState({heatMap: false});  
    }

    heatMapBoxNumber = (e) => {
        let value = e.target.value;
        if ( value < 16 && value > 1 ) {
            this.setState({ heatMapLength: value});
        }

    }
    
    render() {
        return (
            <div className='body'>
                <NavBar 
                    authenticated={this.props.authenticated}
                    handleToggle={this.handleToggle} 
                    drawer={this.state.drawer}
                    />
                <LeftDrawer 
                    handleChange={this.handleChange} 
                    switchResult={this.switchResult}
                    switchGoalie={this.switchGoalie} 
                    drawer={this.state.drawer} />
                <Goal
                    addShot={this.addShot}
                    authenticated={this.props.authenticated}
                    clearShots={this.clearShots}
                    drawer={this.state.drawer}
                    goalie={this.state.goalie}
                    handleCreateMap={this.handleCreateMap}
                    handleDialogOpen={this.handleDialogOpen}
                    handleDialogClose={this.handleDialogClose}
                    handleFirstSlider={this.handleFirstSlider}
                    heatMap={this.state.heatMap}
                    loadSampleShots={this.loadSampleShots}
                    open={this.state.open}
                    removeShot={this.removeShot}
                    setCurrentUser={this.props.setCurrentUser}
                    shots={this.state.shots}
                    shotResultToggle={this.state.shotResultToggle}
                    slider={this.state.slider}
                    inputRef={input => this.inputElement = input}
                    heatMapBoxNumber={this.heatMapBoxNumber}
                    heatMapLength={this.state.heatMapLength}
                    closeHeatmap={this.closeHeatmap}
                    />
            </div>
        )
    }
}
