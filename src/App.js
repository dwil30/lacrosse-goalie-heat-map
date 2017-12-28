import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main';
import { app, base} from './base';
import Login from './components/Login'
import Logout from './components/Logout'
import List from './components/List'
import sampleData from './sample-shots'


const muiTheme = getMuiTheme({
    fontFamily: 'roboto',
    palette: {
        primary1Color:'#093978'
    }
})

class App extends React.Component {
    
    constructor() {
        super();
        this.state = {
            authenticated: false,
            currentUser: null,
            uid: 'default',
            data: [
                {
                    id: 'sdgdsfg',
                    name: 'Demo map',
                    shots: {},
                    filter: {},
                    updated: '0',
                    goalie: true,
                    heatmapGrid: 3,
                },
            ],
            activeData: 0,
        }
    }


    //Start React lifecycles methods

    componentWillMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user,
                    loading: false,
                })

                const uid = this.state.currentUser.uid;
                this.getUsersData(uid);
                // this.listen(uid);
            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false,
                })
            }
        })
    }

    componentWillUnmount() {
        this.removeAuthListener();
    }

    //finish React lifecycles methods
    
        
    //Start work with login and firebase
    listen = (uid) => {
        base.syncState('usersData/' + uid + '/data', {
            context: this,
            state: 'data',
        })
    }

    getUsersData = (uid) => {
        base.fetch(`usersData/${uid}`, {
            context: this
        }).then( (data) => {
            // console.log( data );
            if ( data.hasOwnProperty('data') ) {
                // console.log('You old user. We switch on state<>database listener');
                this.listen(uid);
            } else {
                // console.log('New user. We will add your folder in a database');
                this.addNewUsersFolder(uid);
            }
        }).catch(error => {
            // console.log('Error in getUsersData - ', error);
        })
    }


    // When user is new, we create in database his folder, on load local user data
    addNewUsersFolder = (uid) => {
        base.post(`usersData/${uid}`, {
            data: { data: this.state.data, user: this.state.currentUser.email}
        }).then(() => {
            this.listen(uid);
        }).catch(err => {
            // handle error
        });
    }

    logOut = () => {
        app.auth().signOut().then((user) => {
            this.setState({ authenticated: false, currentUser: null, data: {}})
        });
        this.setState({
            data: [
                {
                    id: 'sdgdsfg',
                    name: 'Demo map',
                    shots: {},
                    filter: {},
                    updated: 'No data',
                },
            ], });
        base.reset();
    }

    setCurrentUser = (user) => {
        if (user) {
            this.setState({
                currentUser: user,
                authenticated: true
            })
        } else {
            this.setState({
                currentUser: null,
                authenticated: false,
            })
        }
    }
    //finish work with login and user

    switchGoalie = () => {
        const updated = Date.now();
        let newData = [...this.state.data];
        newData[this.state.activeData].goalie = !newData[this.state.activeData].goalie;
        newData[this.state.activeData].updated = updated;

        this.setState({
            data: newData
        })
    }

    changeActiveData = (to) => {
        this.setState({ activeData: to})
    }

    saveName = (e) => {
        const value = e.target.value;
        const updated = Date.now();
        let newData = [...this.state.data];
        newData[this.state.activeData].name = value;
        newData[this.state.activeData].updated = updated;

        this.setState({
            data: newData
        })
    }

    addShot = (e, shotResultToggle) => {
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
        var shotValue = shotResultToggle;
        var goalieValue = this.state.data[this.state.activeData].goalie
        const timestamp = Date.now();

        const shotClick = {
            xCoor: offsetX,
            yCoor: offsetY,
            shotResult: shotValue,
            goalie: goalieValue
        }

        const date = Date.now();
        
        let newData = [ ...this.state.data ];
        if (!newData[this.state.activeData].shots) {
            newData[this.state.activeData].shots = {}
        }
        newData[this.state.activeData].shots[`shot-${timestamp}`] = shotClick
        newData[this.state.activeData].updated = date;

        this.setState({
            data: newData
        })
    }

    loadSampleShots = () => {
        let newData = [...this.state.data];
        newData[this.state.activeData] = sampleData;

        this.setState({
            data: newData
        })
    }

    clearShots = () => {
        let newData = [...this.state.data];
        const updated = Date.now();
        newData[this.state.activeData].shots = {};
        newData[this.state.activeData].updated = updated;
        this.setState({
            data: newData
        })
    }

    removeShot = (index) => {
        const updated = Date.now();
        let newData = [...this.state.data];
        newData[this.state.activeData].updated = updated;
        delete newData[this.state.activeData].shots[index]
        this.setState({
            data: newData
        })
    }

    addNewMap = () => {
        const updated = Date.now();
        let newData = [...this.state.data];
        newData.push({
            id: '',
            name: 'new map',
            shots: {},
            filter: {},
            updated: '',
            goalie: true,
            heatmapGrid: 3,
        })
        newData[this.state.activeData].updated = updated;
        
        this.setState({
            data: newData,
            activeData: (newData.length - 1)
        })
    }

    checkData = () => {
        this.setState({
            data: [
                {
                    "id": "",
                    "name": 'new map',
                    "shots": {},
                    "filter": {},
                    "updated": "0",
                    goalie: true,
                    heatmapGrid: 3,
                }
            ]
        })
    }
    
    changeHeatmapGrid = (e) => {
        let newData = [...this.state.data];
        const updated = Date.now();

        newData[this.state.activeData].heatmapGrid = e.target.value;

        newData[this.state.activeData].updated = updated;
        this.setState({
            data: newData
        })
    }

    render() {
        // console.log(this.state);

        return (
            <div className="body">
                <MuiThemeProvider className="body" muiTheme={muiTheme}>
                    <BrowserRouter className="body">
                        <div className="body">
                            <Route exact path="/" render={ (props) => <Main
                                appState={this.state}
                                addShot={this.addShot}
                                loadSampleShots={this.loadSampleShots}
                                clearShots={this.clearShots}
                                removeShot={this.removeShot}
                                addNewMap={this.addNewMap}
                                saveName={this.saveName}
                                switchGoalie={this.switchGoalie}
                                changeHeatmapGrid={this.changeHeatmapGrid}
                                {...props}
                            />}/>
                            <Route exact path='/dashboard' component={ (props) => <List 
                                appState={this.state}
                                authenticated={this.state.authenticated}
                                changeActiveData={this.changeActiveData}
                                addNewMap={this.addNewMap}
                                {...props}
                            />} />
                            <Route exact path="/login" component={props => <Login authenticated={this.state.authenticated} setCurrentUser={this.setCurrentUser} {...props} />} />
                            <Route exact path="/logout" component={props => <Logout authenticated={this.state.authenticated} setCurrentUser={this.setCurrentUser} {...props} />} />
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            
                {/*** FONTS ***/}
                <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                {/*** ENDFONTS ***/}
            
            </div>
        )
    }
}

export default App;


