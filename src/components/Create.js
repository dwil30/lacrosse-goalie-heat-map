import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import NavBar from './NavBar';
import Footer from './Footer';  

const styles = theme => ({
   leftIcon: {
    marginRight: theme.spacing.unit,
    color:'#fff'
  },
   newButton:{
       float:'right'
   }    
});

class Create extends Component {

  state = {
  };


  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <NavBar />
        <div className="main">
            <div className="finalsection">
                <div className="page-header">
                    <div className="sub-header-container w-container">
                        <h1 className="title">Create New Heat Map</h1>
                        <Button component={Link} to="/dashboard" className={classes.newButton} variant="outlined" color="primary">
                            Dashboard
                        </Button>
                    </div>
                </div>
                <div className="dashboard-container">
                    <div className="w-container">
                        
                        <h2 className="newmaph2">Select one of the following heat maps:</h2>
                        
                        <div className="magic-grid new-map-grid">
                            
                            {/* REPEAT FOR EACH TYPE OF HEAT MAP */}
                            <div className="grid-heat-map-item">
                                <div className="heat-map-preview-container">
                                    <img src={require('../images/GoalieHeatMap.jpg')} alt="Heat Map Preview" />
                                    <Link to="/main" className="hoverpreview w-inline-block">
                                        <div class="previewtext">Create Heat Map</div>
                                        <img src={require('../images/ArrowRightWhite.png')}  alt="right arrow" class="arroweffect"/>
                                    </Link>
                                </div>
                                <div className="preview-title-container">
                                    <h4 className="titleh4">Lacrosse Goalie Heat Map</h4>
                                    <h5 className="titleh5">Track how a lacrosse goalie performs against different types of shots</h5>
                                </div>
                            </div>
                            {/* END-REPEAT */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />    
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Create));