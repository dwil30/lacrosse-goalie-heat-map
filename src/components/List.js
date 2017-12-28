import React from 'react';
import NavBar from './NavBar';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper'; 
// import Heatmap from './Heatmap';
import Shot from './Shot';


const style = {
    button: {
        margin: 5
    },
    paper: {
        padding: 0,
        position: 'relative',
        width: 220,
        height: 240,
        float: 'left',
        cursor: 'crosshair',
        display: 'inline-block'
    },
    paperSubmit: {
        padding: 20,
        width: 300,
        position: 'relative',
        float: 'left',
        display: 'inline-block'
    },
    main: {
        marginLeft: 280
    },
    mainNoPadding: {
        marginLeft: 0
    },
    slider: {
        marginTop: -15,
        marginBottom: 0
    }
}

export default class List extends React.PureComponent {

    getUpdated = (ms) => {
        const date = new Date(ms)
        if ( ms === '0') {
            return 'no data'
        } else {
            return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        }
    }

    // getLinksOnHeatmaps = (data) => {
    //     if (!data) {
    //         return <div>Map not found</div>
    //     }

    //     return data.map( (item, i) => {
    //         let activeStyle={};
    //         if (i===this.props.appState.activeData) {
    //             activeStyle = {
    //                 outline: '2px solid red'
    //             }
    //         }
    //         return (
    //             <div className="heatmapitem" key={item.name + i} style={activeStyle}>
    //                 <Link to='/' onClick={() => this.props.changeActiveData(i) }>
    //                     <img alt='heat map' src={require('../images/map.png')} className="heatimage" />
    //                     <h2 className="heatmaph2">{item.name}</h2>
    //                     <div className="updatedtext">Last Updated: { this.getUpdated(item.updated) } </div>
    //                 </Link>
    //             </div>
    //         )
    //     })
    // }

    getShots = (shots) => {
        if (!shots || shots.length === 0) {
            return null
        }
        return Object.keys(shots).map((item, key) => (
            < Shot key={item} index={item} details={shots[item]} removeShot={this.props.removeShot} paperWidth={style.paper.width} paperHeight={style.paper.height} active={false}/>
        ))
    }

    getLinksOnHeatmaps = (appState) => {
        const data = appState.data;
        if (!data) {
            return <div>Map not found</div>
        }

        return data.map( (item, i) => {
            // console.log(item, i);

            let activeStyle={};
            if (i===this.props.appState.activeData) {
                activeStyle = {
                    outline: '2px solid red'
                }
            }
            return (
                <div className="heatmapitem" key={item.name + i} style={activeStyle}>
                    <Link to='/' onClick={() => this.props.changeActiveData(i) }>
                        <Paper style={style.paper}>
                            <div className="goal-container">
                                {item.goalie ?
                                    <img alt="Goalie Rightie" src={require('../images/GoalieRight.png')} className="goalie-rightie" /> :
                                    <img alt="Goalie Leftie" src={require('../images/GoalieLeft.png')} className="goalie-leftie" />
                                }
                                <img alt="GoalImage" src={require('../images/LacrosseGoalFinal.jpg')} className="goal-image" id="goal" />

                                {this.getShots(item.shots)}

                            </div>
                        </Paper>
                    </Link>
                    <h2 className="heatmaph2">{item.name}</h2>
                    <div className="updatedtext">Last Updated: {this.getUpdated(item.updated)} </div>
                </div>
            )
        })
    }


    render() {
        const appState = this.props.appState;

        return (
            <div> 
                <NavBar
                    authenticated={this.props.authenticated}
                    addNewMap={this.props.addNewMap}
                />
                
                <div className="main-wrapper no-padding heatmapitem__wrap">
                    {this.getLinksOnHeatmaps(appState)}
                    <div className="heatmapitem">
                        <Link to='/' onClick={this.props.addNewMap}>
                            <div className="addnewdiv">
                                <FontIcon className='material-icons'>add_circle</FontIcon>
                            </div>
                        </Link>
                        <h2 className="heatmaph2">Add New Heat Map</h2>
                    </div>
                </div>
            </div>
            
        )
  }
}
