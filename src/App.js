import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main';
import { app } from './base';
import Login from './components/Login'
import List from './components/List'

const muiTheme = getMuiTheme({
    fontFamily: 'roboto',
    palette: {
        primary1Color:'#093978'
    }
})

class App extends React.Component {
    
    constructor() {
        super();
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {
            authenticated: false,
            currentUser: null,
        }
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
    
    logOut() {
        app.auth().signOut().then((user) => {
        this.setState({ authenticated:false, currentUser:null })
        })
    }
    
    render() {
        return (
            <div className="body">
                <MuiThemeProvider className="body" muiTheme={muiTheme}>
                    <BrowserRouter className="body">
                        <div className="body">
                            <Route exaxt path='/dashboard' component={props => <List authenticated={this.state.authenticated} {...props} />} />
                            <Route exact path="/" component={props => <Main authenticated={this.state.authenticated} setCurrentUser={this.setCurrentUser} {...props} />} />
                            <Route exact path="/login" component={props => <Login authenticated={this.state.authenticated} setCurrentUser={this.setCurrentUser} {...props} />} />
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
