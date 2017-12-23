import React  from 'react';
import NavBar from './NavBar';
import LeftDrawer from './LeftDrawer';
import Goal from './Goal';

export default class Main extends React.PureComponent {
    
    // componentWillMount() {
    //     // check if there is any order in localStorage
    //     const localStorageRef = localStorage.getItem(`shots`);
    //     if(localStorageRef) {
    //         // update our App component's shots state
    //         this.setState({
    //             shots: JSON.parse(localStorageRef), 
    //         })
    //     }
    //     const mapSet = localStorage.getItem(`heatMap`);
    
    //     if(mapSet){
    //         this.setState({
    //         heatMap: JSON.parse(mapSet), 
    //         })
    //     }
    // }
    
    // componentWillUpdate(nextProps, nextState) {
    //     localStorage.setItem(`shots`, JSON.stringify(nextState.shots));
    //     //localStorage.setItem('heatMap', JSON.stringify(nextState.heatMap));
    // }
    
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.switchGoalie = this.switchGoalie.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleCreateMap = this.handleCreateMap.bind(this);
        this.handleFirstSlider = this.handleFirstSlider.bind(this);
        this.closeHeatmap = this.closeHeatmap.bind(this);
    
        this.state = {
            slider:0.9,
            heatMap: false,
            open: false,
            drawer: true,
            shotResult: true, //true = Save, false = Goal
            goalie: true,
            heatMapLength: 3, 
            editMode:false
        }
    }

    handleToggle(){
        this.setState({drawer: !this.state.drawer});
    }
    
    switchShotResult = () => {
        this.setState({ shotResult: !!!(this.state.shotResult)});
    }
    
    switchGoalie(){
       this.setState({goalie: !this.state.goalie});
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

    addShot = (e) => {
        const shotResult = this.state.shotResult
        const goalie = this.state.goalie
        this.props.addShot(e, shotResult, goalie )
    }

    render() {
        return (
            <div className='body'>
                <NavBar 
                    authenticated={this.props.appState.authenticated}
                    handleToggle={this.handleToggle} 
                    drawer={this.state.drawer}
                />
                <LeftDrawer 
                    switchShotResult={this.switchShotResult}
                    switchGoalie={this.switchGoalie}
                    drawer={this.state.drawer} 
                    shotResult={this.state.shotResult}
                />
                <Goal
                    // STATE:
                    appState={this.props.appState}
                    // ACTIONS:
                    addShot={this.addShot}
                    loadSampleShots={this.props.loadSampleShots}
                    clearShots={this.props.clearShots}
                    removeShot={this.props.removeShot}
                    // OLD

                    drawer={this.state.drawer}
                    goalie={this.state.goalie}
                    handleCreateMap={this.handleCreateMap}
                    handleDialogOpen={this.handleDialogOpen}
                    handleDialogClose={this.handleDialogClose}
                    handleFirstSlider={this.handleFirstSlider}
                    heatMap={this.state.heatMap}
                    open={this.state.open}
                    // shotResultToggle={this.state.shotResultToggle}
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
