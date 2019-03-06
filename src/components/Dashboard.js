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

class Dashboard extends Component {

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
                        <h1 className="title">Dashboard</h1>
                        <Button component={Link} to="/create" className={classes.newButton} variant='contained' color="primary">
                            <Add className={classes.leftIcon} />Create New Heat Map
                        </Button>
                    </div>
                </div>
                <div className="dashboard-container">
                    <div className="w-container">
                        
                        <div className="magic-grid">
                            
                            {/* REPEAT FOR EACH HEAT MAP */}
                            <div className="grid-heat-map-item">
                                <div className="heat-map-preview-container">
                                    <img src={require('../images/GoalieHeatMap.jpg')} alt="Heat Map Preview" />
                                    <Link to="/main" className="hoverpreview w-inline-block">
                                        <div class="previewtext">Edit Heat Map</div>
                                        <img src={require('../images/ArrowRightWhite.png')}  alt="right arrow" class="arroweffect"/>
                                    </Link>
                                </div>
                                <div className="preview-title-container">
                                    <h4 className="titleh4">Syracuse Goalie - Evan Malloy</h4>
                                    <h5 className="titleh5">Lacrosse Goalie Heat Map</h5>
                                </div>
                            </div>
                            {/* END-REPEAT */}
                            
                             <div className="grid-heat-map-item">
                                <div data-ix="hoverpreview" className="heat-map-preview-container">
                                    <img src={require('../images/GoalieHeatMap.jpg')} alt="Heat Map Preview" />
                                     <Link to="/main" className="hoverpreview w-inline-block">
                                        <div class="previewtext">Edit Heat Map</div>
                                        <img src={require('../images/ArrowRightWhite.png')}  alt="right arrow" class="arroweffect"/>
                                    </Link>
                                </div>
                                <div className="preview-title-container">
                                    <h4 className="titleh4">Syracuse Goalie - Evan Malloy</h4>
                                    <h5 className="titleh5">Lacrosse Goalie Heat Map</h5>
                                </div>
                            </div>
                        </div>
                        
                        <div className="no-maps-container">
                            <img src={require('../images/NoMaps.png')} alt="No Maps" className="no-maps-pic"/>
                            <div className="no-maps-text">&quot;Hmm... that blue button must be important...&quot;</div>
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

export default withRouter(withStyles(styles)(Dashboard));