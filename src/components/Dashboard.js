import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from './NavBar';
import Footer from './Footer';

const styles = theme => ({
   leftIcon: {
    marginRight: theme.spacing.unit,
    color:'#fff'
  },
   newButton:{
       float:'right'
   },
   loaderWrapper: {
     display: 'flex',
     height: '100vh',
     alignItems: 'center',
     justifyContent: 'center',
   }
});

class Dashboard extends Component {

  state = {
  };


  render() {
    const { classes, data, loading } = this.props;
    if (loading) { return <div className={classes.loaderWrapper}><CircularProgress /></div> }
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
                      { data.length ?
                        <div className="magic-grid">
                            { data.map((heatMap, i) =>
                              <div key={heatMap.id} className="grid-heat-map-item">
                                  <div className="heat-map-preview-container">
                                      <img src={require('../images/GoalieHeatMap.jpg')} alt="Heat Map Preview" />
                                      <Link to={`/main/${i}`} className="hoverpreview w-inline-block">
                                          <div class="previewtext">Edit Heat Map</div>
                                          <img src={require('../images/ArrowRightWhite.png')}  alt="right arrow" className="arroweffect"/>
                                      </Link>
                                  </div>
                                  <div className="preview-title-container">
                                      <h4 className="titleh4">{heatMap.name}</h4>
                                      <h5 className="titleh5">Lacrosse Goalie Heat Map</h5>
                                  </div>
                              </div>
                              )
                            }
                        </div>
                        :
                        <div className="no-maps-container">
                            <img src={require('../images/NoMaps.png')} alt="No Maps" className="no-maps-pic"/>
                            <div className="no-maps-text">&quot;Hmm... that blue button must be important...&quot;</div>
                        </div>
                      }
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
