import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';

import NavBar from './NavBar';
import LeftDrawer from './LeftDrawer';
import Goal from './Goal';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    loaderWrapper: {
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    }
})

class Main extends Component {

    componentWillMount() {
      const { match: { params: { id } }, appState: { activeData }, changeActiveData } = this.props
      if (id !== activeData ) {
        changeActiveData(id)
      }
    }

    componentWillUpdate(nextProps, nextState) {
      const { appState: { activeData, data, dataLoading }, changeActiveData } = this.props
      const { match: { params: { id } } } = this.props
      const activeMap = data[activeData]
      if (id !== activeData ) {
        changeActiveData(id)
      } else if (activeMap && !activeMap.shots && this.state.heatMap) {
        this.setState({ heatMap: false })
      }
    }

    state = {
        slider:0.9,
        heatMap: true,
        drawer: true,
        shotResult: true, //true = Save, false = Goal
        editMode: false,
        filter: {},
        goalie: true,

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        console.log(this.state.goalie)
    };

    handleRadioChange = event => {
        this.setState({ value: event.target.value });
    };

    handleToggle(){
        this.setState({drawer: !this.state.drawer});
    }

    switchShotResult = () => {
        this.setState({ shotResult: !!!(this.state.shotResult)});
    }

    handleCreateMap = () => {
        this.setState({heatMap: true});
    }

    handleSlider = (event, value) => {
        this.setState({ slider: value });
    }

    closeHeatmap = () => {
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
        const { classes,
          appState: { data, activeData, authenticated, dataLoading },
          addNewMap,
          switchGoalie,
          loadSampleShots,
          clearShots,
          removeShot,
          saveName,
          changeHeatmapGrid,
          deleteActiveMap,
        } = this.props
        const activeMap = data[activeData]
        if (!activeMap || dataLoading) { return <div className={classes.loaderWrapper}><CircularProgress /></div> }

        return (
              <div className={classes.root}>
                <NavBar
                    authenticated={authenticated}
                    handleToggle={this.handleToggle}
                    drawer={this.state.drawer}
                    addNewMap={addNewMap}
                />
                <LeftDrawer
                    switchShotResult={this.switchShotResult}
                    switchGoalie={switchGoalie}
                    drawer={this.state.drawer}
                    goalie={activeMap.goalie}
                    shotResult={this.state.shotResult}
                    clickOnFilterRadio={this.clickOnFilterRadio}
                    filter={this.state.filter}
                    handleChange={this.handleChange}
                />
                <Goal
                    // STATE:
                    appState={this.props.appState}
                    filter={this.state.filter}
                    // ACTIONS:
                    addShot={this.addShot}
                    loadSampleShots={loadSampleShots}
                    clearShots={clearShots}
                    removeShot={removeShot}
                    saveName={saveName}
                    changeHeatmapGrid={changeHeatmapGrid}
                    deleteActiveMap={deleteActiveMap}
                    handleCreateMap={this.handleCreateMap}
                    handleSlider={this.handleSlider}
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

export default withRouter(withStyles(styles)(Main));
