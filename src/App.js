import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { app, base} from './base';

//Components
import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
//import List from './components/List';
import Home from './components/Home';
import sampleData from './sample-shots';
import ScrollToTop from './components/ScrollTop'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Create from './components/Create'

//CSS
import './css/webflow.css';
import './css/stylesheet.css';
import './css/sportmap.webflow.css';
import './css/App.css';


const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#c40001"
    },
    primary: {
      main: "#02243d"
    }
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Circular',
      'sans-serif'
    ].join(',')
  }
});

class App extends React.Component {

    state = {
        authenticated: false,
        currentUser: null,
        uid: 'default',
        data: [],
        activeData: 0,
        goalie:true
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
        }).then((data) => {
            console.log( data );
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

    saveName = (value) => {
        // const updated = Date.now();
        let newData = [...this.state.data];
        newData[this.state.activeData].name = value;
        // newData[this.state.activeData].updated = updated;

        this.setState({
            data: newData
        })
    }

    addShot = (e, shotValue, shotFilter) => {
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
        var goalieValue = this.state.data[this.state.activeData].goalie
        const timestamp = Date.now();

        const shotClick = {
            xCoor: offsetX,
            yCoor: offsetY,
            shotResult: shotValue,
            shotFilter: shotFilter,
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
        let newData = this.state.data.length ? [...this.state.data] : [];
        newData.push({
            updated,
            id: '',
            name: 'new map',
            shots: {},
            filter: {},
            goalie: true,
            heatmapGrid: 3,
        })
        this.setState({
            data: newData,
            activeData: (newData.length - 1)
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

    deleteActiveMap = () => {
        let newData = [...this.state.data];
        if (newData.length === 1) {
            // console.log('last array');
            newData[this.state.activeData] = {
                "id": "",
                "name": 'new empty map',
                "shots": {},
                "filter": {},
                "updated": "0",
                goalie: true,
                heatmapGrid: 3,
            }

        } else {
            newData.splice([this.state.activeData], 1)
        }
        this.setState({
            data: newData,
            activeData: 0
        })
    }

    render() {
        return (
         <div>
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <ScrollToTop>
                        <Switch>
                            <Route exact path="/" render={ (props) => <Home
                                authenticated={this.state.authenticated}                
                                appState={this.state}
                                {...props}
                            />}/>
                            <Route exact path="/login" component={props => <Login authenticated={this.state.authenticated} setCurrentUser={this.setCurrentUser} {...props} />} />
                            <Route exact path="/signup" component={props => <Signup authenticated={this.state.authenticated} setCurrentUser={this.setCurrentUser} {...props} />} />

                            <Route exact path="/main/:id" render={ (props) => <Main
                                appState={this.state}
                                addShot={this.addShot}
                                loadSampleShots={this.loadSampleShots}
                                clearShots={this.clearShots}
                                removeShot={this.removeShot}
                                addNewMap={this.addNewMap}
                                saveName={this.saveName}
                                switchGoalie={this.switchGoalie}
                                changeHeatmapGrid={this.changeHeatmapGrid}
                                deleteActiveMap={this.deleteActiveMap}
                                changeActiveData={this.changeActiveData}
                                {...props}
                            />}/>
                            <Route exact path="/dashboard" component={props => <Dashboard data={this.state.data} authenticated={this.state.authenticated} setCurrentUser={this.setCurrentUser} {...props} />} />
                            {/*
                            <Route exact path='/dashboard' component={ (props) => <List
                                appState={this.state}
                                authenticated={this.state.authenticated}
                                changeActiveData={this.changeActiveData}
                                addNewMap={this.addNewMap}
                                {...props}
                            />} />
                            */}
                            <Route exact path="/logout" component={props => <Logout authenticated={this.state.authenticated} setCurrentUser={this.setCurrentUser} {...props} />} />
                            <Route exact path="/profile" component={props => <Profile authenticated={this.state.authenticated} setCurrentUser={this.setCurrentUser} {...props} />} />
                            <Route exact path="/create" component={props => <Create
                              authenticated={this.state.authenticated}
                              setCurrentUser={this.setCurrentUser}
                              addNewMap={this.addNewMap}
                              appState={this.state}
                              {...props}
                            />} />
                        </Switch>
                    </ScrollToTop>
                </BrowserRouter>
            </MuiThemeProvider>
        </div>
        )
    }
}

export default App;
