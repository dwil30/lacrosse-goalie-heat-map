import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Link} from 'react-router-dom'

const styles = {
    appBar: {
        backgroundColor:'#6b8797'
    }, 
    appBarOpen: {
        backgroundColor:'#6b8797',
        paddingLeft: 305
    }
}

class NavBar extends React.Component {

    render() {
        return (
            <div>
                <AppBar
                title="Lacrosse Goalie Heat Map"
                style={this.props.drawer ? styles.appBarOpen : styles.appBar}
                iconElementLeft={<IconButton onClick={this.props.handleToggle}><FontIcon className='material-icons'>reorder</FontIcon></IconButton>}
                iconElementRight={this.props.authenticated ? (
                    <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    >
                        <Link to='/'><MenuItem primaryText="Create New Heat Map" /></Link>
                        <Link to='/dashboard'><MenuItem primaryText="View Saved Heat Maps" /></Link>
                        <Link to='/about'><MenuItem primaryText="About" /></Link>
                        <Divider />    
                        <Link to='/logout'><MenuItem primaryText="Sign out" /></Link>
                    </IconMenu>) : 
                    <Link to="/login"><FlatButton style={{marginTop:'4px'}} labelStyle={{color:'white'}} label="Login" /></Link>
        }
        />
      </div>
    )
  }
}

export default NavBar;