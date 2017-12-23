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

class App extends React.PureComponent {
    
    constructor() {
        super();
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {
            authenticated: false,
            currentUser: null,
            data: [
                {
                    id: 'fgfg',
                    shots: {},
                    filter: {}
                }
            ],
            activeData: 0,
        }
    }

    logOut() {
        app.auth().signOut().then((user) => {
            this.setState({ authenticated: false, currentUser: null })
        })
    }

    setCurrentUser(user) {
        if (user) {
            this.setState({
                currentUser: user,
                authenticated: true
            })
        } else {
            this.setState({
                currentUser: null,
                authenticated: false
            })
        }
    }


    componentWillMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user,
                    loading: false,
                })
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

    addShot = (e, shotResultToggle, goalie) => {
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
        var goalieValue = goalie;
        const timestamp = Date.now();

        const shotClick = {
            xCoor: offsetX,
            yCoor: offsetY,
            shotResult: shotValue,
            goalie: goalieValue
        }
        let newData = [ ...this.state.data ];
        newData[this.state.activeData].shots[`shot-${timestamp}`] = shotClick

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
        newData[this.state.activeData].shots = {};
        this.setState({
            data: newData
        })
    }

    removeShot = (index) => {
        let newData = [...this.state.data];
        delete newData[this.state.activeData].shots[index]
        this.setState({
            data: newData
        })
    }


    render() {
        return (
            <div className="body">
                <MuiThemeProvider className="body" muiTheme={muiTheme}>
                    <BrowserRouter className="body">
                        <div className="body">
                            <Route exact path='/dashboard' component={props => <List authenticated={this.state.authenticated} {...props} />} />
                            <Route exact path="/" render={ (props) => <Main
                                appState={this.state}
                                addShot={this.addShot}
                                loadSampleShots={this.loadSampleShots}
                                clearShots={this.clearShots}
                                removeShot={this.removeShot}
                                {...props}
                            />}/>
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


