import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styles = {
    appBar: {
        backgroundColor:'#6b8797'
    }, 
    appBarOpen: {
        backgroundColor:'#6b8797',
        paddingLeft: 275
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
                        <MenuItem primaryText="View Saved Heat Maps" />
                        <MenuItem primaryText="About" />
                        <Divider />    
                        <MenuItem onClick={this.props.logOut} primaryText="Sign out" />
                    </IconMenu>) : <FlatButton label="Login" />
                           }
        />
      </div>
    )
  }
}

export default NavBar;