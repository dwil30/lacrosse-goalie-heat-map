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
        this.handleCreateMap = this.handleCreateMap.bind(this);
        this.handleFirstSlider = this.handleFirstSlider.bind(this);
        this.closeHeatmap = this.closeHeatmap.bind(this);
    
        this.state = {
            slider:0.9,
            heatMap: false,
            drawer: true,
            shotResult: true, //true = Save, false = Goal
            editMode:false,
            filter: {}
        }
    }

    handleToggle(){
        this.setState({drawer: !this.state.drawer});
    }
    
    switchShotResult = () => {
        this.setState({ shotResult: !!!(this.state.shotResult)});
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
        if (this.state.heatMap === false) {
            const shotResult = this.state.shotResult
            const shotFilter = this.state.filter
            this.props.addShot(e, shotResult, shotFilter)
        }
    }

    clickOnFilterRadio = (name, value) => {
        let newFilter = { ...this.state.filter };
        if (value === this.state.filter[name]) {
            delete newFilter[name]
        } else {
            newFilter[name] = value;
        }

        this.setState({
            filter: newFilter
        })
    }

    render() {
        // console.log(this.state.heatMap);
        return (
            <div className='body'>
                <NavBar 
                    authenticated={this.props.appState.authenticated}
                    handleToggle={this.handleToggle}
                    drawer={this.state.drawer}
                    addNewMap={this.props.addNewMap}
                />
                <LeftDrawer 
                    switchShotResult={this.switchShotResult}
                    switchGoalie={this.props.switchGoalie}
                    drawer={this.state.drawer}
                    goalieResult={this.props.appState.data[this.props.appState.activeData].goalie}
                    shotResult={this.state.shotResult}
                    clickOnFilterRadio={this.clickOnFilterRadio}
                    filter={this.state.filter}
                />
                <Goal
                    // STATE:
                    appState={this.props.appState}
                    filter={this.state.filter}
                    // ACTIONS:
                    addShot={this.addShot}
                    loadSampleShots={this.props.loadSampleShots}
                    clearShots={this.props.clearShots}
                    removeShot={this.props.removeShot}
                    saveName={this.props.saveName}
                    changeHeatmapGrid={this.props.changeHeatmapGrid}
                    deleteActiveMap={this.props.deleteActiveMap}
                    // OLD
                    drawer={this.state.drawer}
                    // goalieResult={this.props.appState.data[this.props.appState.activeData].goalie}
                    handleCreateMap={this.handleCreateMap}
                    handleFirstSlider={this.handleFirstSlider}
                    heatMap={this.state.heatMap}
                    slider={this.state.slider}
                    // inputRef={input => this.inputElement = input}
                    heatMapBoxNumber={this.heatMapBoxNumber}
                    heatMapLength={this.state.heatMapLength}
                    closeHeatmap={this.closeHeatmap}
                    />
            </div>
        )
    }
}
