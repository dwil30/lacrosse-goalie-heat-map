import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main';
import Typekit from 'react-typekit';
import { app } from './base';

const muiTheme = getMuiTheme({
    fontFamily: 'proxima-nova',
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
                            <Route exact path="/" component={props => <Main logOut={this.logOut} authenticated={this.state.authenticated} setCurrentUser={this.setCurrentUser} {...props} />} />
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            
                {/*** FONTS ***/}
                <Typekit kitId="uir2vqw" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                {/*** ENDFONTS ***/}
            
            </div>
        )
    }
}

export default App;
