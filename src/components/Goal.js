import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';

import Shot from './Shot';
import Modal from './Modal';
import Heatmap from './Heatmap';

const drawerWidth = 350;

const styles = theme => ({
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
         padding: '22px 0px',
    },
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
    width:'100%',
  },
  toolbar: theme.mixins.toolbar,
  colorSwitchBase: {
    color: '#74c847',
    '&$colorChecked': {
      color: '#f22126',
      '& + $colorBar': {
        backgroundColor: '#ff9d9e',
      },
    },
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  signinButton:{
    width:197,
    marginTop:3
  },
  greyList:{
    backgroundColor:'whitesmoke'
  },
    legend:{
        fontWeight:600
    }
})

const theme = styles(createMuiTheme())

class Goal extends Component {

    state = {
        modalOpen: false,
        modalAction: '',
        mapName: undefined,
        heatMap: true,
    }

    changeGridNumber = (e) => {
        this.props.heatMapBoxNumber(e);
    }

    getShots = (shots) => {
        const { classes } = this.props;
        if (!shots || shots.length===0) {
            return null
        }
        return Object.keys(shots).map( (item, key) => (
            < Shot
                key={item}
                index={item}
                details={shots[item]}
                removeShot={this.props.removeShot}
                paperWidth={theme.paper.width}
                paperHeight={theme.paper.height}
            />
        ))
    }

    changeNameInput = (e) => {
        this.setState({
            nameInputValue: e.target.value
        })
    }


    saveMapName = () => {
        // console.log('saveMapName');
        this.state.mapName && this.props.saveName(this.state.mapName);
        this.props.handleCreateMap()
    }

    changeMapName = (e) => {
        this.setState({
            mapName: e.target.value
        })
    }

    getSaveNameField = () => {
        // console.log(this.props.appState.data[this.props.appState.activeData].name);
        // console.log(this.state.mapName);
        const savedName = this.props.appState.data[this.props.appState.activeData].name;
        const newName = this.state.mapName;
        let name;
        let buttonVizible = false;

        if (newName === undefined) {
            // console.log(1);
            name = savedName;
        } else if (newName !== savedName) {
            // console.log(2);
            name = newName;
            buttonVizible = true;
        } else if (newName === savedName) {
            // console.log(3);
            name = savedName;
            buttonVizible = false;
        }

        return (
            <div className='legend-container'>
                <TextField
                    id="text-field-controlled"
                    hintText="Heat Map Name"
                    onChange={this.changeMapName}
                    value={name}
                />
                <br />
                {buttonVizible ? <Button className="options-button w-button" onClick={this.saveMapName}>Save Heat Map</Button> : null}
            </div>
        )
    }

    filterShots = (shots) => {

        const heatMap = this.props.heatMap;
        const filter = this.props.filter;

        if (!heatMap) { //SHOTS WITHOUT FILTER
            return shots;
        } else if (heatMap && (Object.keys(filter).length === 0)) {//SHOTS WITHOUT FILTER
            return shots;
        } else {
            const newShots = {};
            let filtersCount = Object.keys(filter).length;

            for (let key in shots) {
                const shotFilters = shots[key].shotFilter;
                let equalCount = 0;
                for (let shotFilter in shotFilters) {
                    if (filter.hasOwnProperty(shotFilter)) {
                        if (filter[shotFilter] === shotFilters[shotFilter]) {
                            equalCount = equalCount + 1;
                        }
                    }
                }

                if (equalCount === filtersCount && equalCount !== 0  ) {
                    newShots[key] = shots[key];
                }
            }
            return newShots;
        }
    }

    madeModalState = (visible, action) => {
        if (visible === 'OPEN') {
            this.setState({
                modalOpen : true,
                modalAction: action
            })
        } else if (visible === 'CLOSE') {
            this.setState({
                modalOpen: false,
            })
        }

    }

    render() {
        const { classes, appState } = this.props;
        const { activeData } = appState;

        let shots = {}
        const mapData = appState.data[activeData]
        if (mapData && mapData.shots) {
            shots = mapData.shots;
        }
        const filteredShots = this.filterShots(shots);

        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className="results-top-title-container">
                    <div className="left-side">
                        <h1 className="datah1">{mapData.name}</h1>
                        <h2 className="datah2">Lacrosse Goalie Heat Map</h2>
                    </div>
                    <div className="right-side">
                        <h2 className="shotsh2"><span id="shots">{Object.keys(shots).length}</span> shots</h2>
                    </div>
                </div>

                <div className="heat-row">
                    <div className="heat-item">
                    <div onClick={this.props.addShot}>

                    {this.props.heatMap &&
                    <Heatmap
                        shots={filteredShots}
                        slider={this.props.slider}
                        heatMap={this.props.heatMap}
                        heatMapLength={mapData.heatmapGrid}
                        paperWidth={theme.paper.width}
                        paperHeight={theme.paper.height}
                    />}


                    {/*{this.props.appState.data[this.props.appState.activeData].goalie ? */}
                    <div id="goalmap" className="goal-div-container">
                        {mapData.goalie ?

                        <img alt="Goalie Rightie" src={require('../images/GoalieRight.png')} className="right-goalie" /> :
                        <img alt="Goalie Leftie" src={require('../images/GoalieLeft.png')} className="leftie-goalie" />}
                        <img alt="GoalImage" src={require('../images/LacrosseGoalFinal.jpg')} className="goal-image" id="goal" />

                        {this.getShots(filteredShots)}
                    </div>
                </div>

                </div>
                {!this.props.heatMap ?
                <div className="heat-item rightside">
                    <div className="naming-option-container">
                        <TextField
                        id="outlined-email-input"
                        label="Heat Map Name"
                        className={classes.textField}
                        name="heatMapName"
                        margin="normal"
                        variant="outlined"
                        onChange={this.changeMapName}
                        />
                        <br/>
                        <Button color='primary' variant="contained" className={classes.signinButton} onClick={this.saveMapName}>Save & View Heat Map</Button>
                    </div>
                </div> :
                <div className="heat-item rightside">
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
                        <Typography className={classes.legend} id="label">Heat Map Opacity: {Math.round(this.props.slider * 100) / 100}</Typography>
                        <Slider
                            className={classes.slider}
                            value={this.props.slider}
                            onChange={this.props.handleSlider}
                            min={0}
                            max={1}
                            step={.1}
                            aria-labelledby="label"
                        />
                    </div>

                    <div className="legend-container">
                        <div className="legend-text">Grid Length (2x2 up to 15x15)</div>
                        <input
                            style={{width:100,margin:'auto'}}
                            id='quads'
                            onChange={this.props.changeHeatmapGrid}
                            className='w-input'
                            min="2" max="15"
                            name="quads"
                            type="number"
                            value={appState.data[appState.activeData].heatmapGrid}
                            ref={(input) => { this.gridInput = input }}
                            placeholder="Grid Length"
                        />
                    </div>

                    <div className="legend-container">
                        <Button variant="outlined" onClick={this.props.closeHeatmap} className="options-button w-button" style={{margin:'auto'}}>Edit Heatmap</Button>

                        <Button variant="outlined" onClick={() => this.madeModalState('OPEN', 'DELETE_HEATMAP')} color="secondary">Delete Heat Map</Button>
                    </div>
                </div>
                }
             <Modal
                        madeModalClose={() => this.madeModalState('CLOSE')}
                        modalOpen={this.state.modalOpen}
                        modalAction={this.state.modalAction}
                        clearShots={this.props.clearShots}
                        deleteActiveMap={this.props.deleteActiveMap}
                    />
            </div>
        </main>

                        /*
                        <div className="right-container">
                {this.props.heatMap ?
                 <div>
                    {!this.props.appState.authenticated ?
                    <Link to='/login'><Button>Login to save</Button></Link> :
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
                        <Slider className={classes.slider} value={this.props.slider} onChange={this.props.handleFirstSlider} />
                    </div>



                    <div className="legend-container">
                        <div className="legend-text">Grid Length (2x2 up to 15x15)</div>
                        <input
                            style={{width:200,margin:'auto'}}
                            id='quads'
                            onChange={this.props.changeHeatmapGrid}
                            className='w-input'
                            min="2" max="15"
                            name="quads"
                            type="number"
                            value={appState.data[appState.activeData].heatmapGrid}
                            ref={(input) => { this.gridInput = input }}
                            placeholder="Grid Length"
                        />
                    </div>

                    <div className="legend-container">
                        <Button onClick={() => this.madeModalState('OPEN', 'DELETE_HEATMAP')} color="secondary">Delete Heat Map</Button>

                        <Button onClick={this.props.closeHeatmap} className="options-button w-button" style={{margin:'auto'}}>Edit Heatmap</Button>
                    </div>
                </div> : <div>

                        <Button onClick={this.props.handleCreateMap} className="options-button w-button">Show Heat Map</Button><br/>



                        <Button onClick={this.props.loadSampleShots} className="options-button w-button">Load Samples</Button>

                </div>
                }
                    <Modal
                        madeModalClose={() => this.madeModalState('CLOSE')}
                        modalOpen={this.state.modalOpen}
                        modalAction={this.state.modalAction}
                        clearShots={this.props.clearShots}
                        deleteActiveMap={this.props.deleteActiveMap}
                    />
                </div>
                    */
        )
    }
}

export default withRouter(withStyles(styles)(Goal));
