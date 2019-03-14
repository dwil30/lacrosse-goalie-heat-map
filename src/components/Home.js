import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import NavBar from './NavBar';
import Footer from './Footer';

const styles = theme => ({
 
});

class Home extends Component {

  render() {
    // const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar 
        authenticated={this.props.authenticated}/>

        <div className="hero">
            <div className="hero-flex">
                <div className="hero-left">
                    <div className="hero-text-container w-clearfix">
                        <h1 className="heroh1">Heat Maps for the Amatuer Athlete</h1>
                        <h2 className="heroh2">Great scouting tools shouldn&#x27;t be just for the pro&#x27;s</h2>
                        <div className="cta-button-wrapper">
                            <Button component={Link} to="/signup" color='secondary' variant="contained" className="cta-button left w-button">Get Started</Button>
                            <Button component={Link} to="#learn-more" color='default' variant="outlined" className="cta-button learnmore w-button">Learn More</Button>
                        </div>
                    </div>
                </div>
                <div className="hero-right">
                    <img src={require("../images/HomeHeatMap.jpg")} alt="Heat Map" className="hero-image" />
                </div>
            </div>
        </div>
        <div id="learn-more" className="section lastsection smoke">
            <div className="w-container">
                <div className="about-flex">
                    <div className="about-flex-item">
                        <div className="about-text-container">
                            <h2 className="home-h2">Sports Heat Maps Are Not Just For Entertainment</h2>
                            <p>You&#x27;ve probably seen sports heat maps on sites like ESPN and Grantland before. They take a lot of data and provide incredible information at a glance.</p>
                            <p>But these heat maps are just for entertainment purposes - unless your job is to actually stop Steph Curry!</p>
                            <p>What if you&#x27;re a youth, high school, college athlete or coach and you want to use heat maps to scout an upcoming team?</p>
                            <p><strong>Introducing Sport Map!</strong></p>
                        </div>
                    </div>
                    <div className="about-flex-item">
                        <div className="about-text-container center">
                            <img src={require("../images/ESPNLogo.png")} alt="ESPN" className="logosimage"/>
                            <img src={require("../images/Grantland_Logo.png")} alt="Grantland" className="logosimage"/>
                        </div>
                    </div>
                </div>
                <div className="about-flex">
                    <div className="about-flex-item">
                        <img src={require("../images/HitChart.jpg")} alt="HitChart" className="shotchart" />
                    </div>
                    <div className="about-flex-item">
                        <div className="about-text-container">
                            <h3 className="abouth3">Where would you pitch this batter?</h3>
                            <p>A quick look at the Baseball batter heat map shows you exactly which locations to avoid (down and in) and which to aim for (upper part of the strike zone).</p>
                            <p>So with a full count in the bottom of the 9th you know where to throw that heater. </p>
                        </div>
                    </div>
                </div>
                <div className="about-flex reverse">
                    <div className="about-flex-item">
                        <div className="about-text-container">
                            <h3 className="abouth3">Where would you shoot on this goalie?</h3>
                            <p>With a Sport Map you instantly view a heat map of every shot a lacrosse goalie has faced.</p>
                            <p>A quick look at the lacrosse goalie heat map shows this keeper is vulnerable to shots low and off-stick while he excels at saving stick-side and high shots.</p>
                        </div>
                    </div>
                    <div className="about-flex-item">
                        <img src={require("../images/GoalieHeatMap.jpg")} alt="Goalie Heat Map" className="shotchart" />
                    </div>
                </div>
                <div className="about-flex">
                    <div className="about-flex-item">
                        <img src={require("../images/CurryShotChart2.jpg")} alt="Curry Shot Chart" className="shotchart" />
                    </div>
                    <div className="about-flex-item">
                        <div className="about-text-container">
                            <h3 className="abouth3">Where would you make this player shoot?</h3>
                            <p>With the Basketball heat map your team can get an instant scouting report based on actual data. You can also create your own heat maps to see which type of shot needs work.</p>
                            <p>If I was this player (I&#x27;d be 201 million dollars richer and) I would work on finishing around the rim. </p>
                        </div>
                    </div>
                </div>
            </div>
             <Button color='primary' variant="contained" className="cta-button bottom">Get Started</Button>
        </div>

        <Footer />
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Home));