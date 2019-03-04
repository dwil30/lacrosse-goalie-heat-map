import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';

const styles = theme => ({

});

class Footer extends Component {

  render() {
   // const { classes } = this.props;
    return (
        <div className="footer">
            <div className="footer-flex">
                <div className="footer-flex-container logo-container">
                    <Link to="/" className="w-inline-block">
                        <img src={require("../images/SportMapLogo.png")} alt="Footer Logo" className="footer-image"/>
                    </Link>
                </div>
               
                <div className="footer-flex-container larger-container">
                    <h4 className="footerh4">Sport Heat Maps</h4>
                    <ul className="w-list-unstyled">
                        <li><Link to="/" className="footerlink">Lacrosse Goalie Heat Map</Link></li>
                        <li><Link to="/" className="footerlink">Lacrosse Shooter Heat Map</Link></li>
                        <li><Link to="/" className="footerlink">Baseball Pitcher Heat Map</Link></li>
                        <li><Link to="/" className="footerlink">Baseball Batter Heat Map</Link></li>
                        <li><Link to="/" className="footerlink">Basketball Shooter Heat Map</Link></li>
                    </ul>
                </div>
                <div className="footer-flex-container">
                    <h4 variant="h4" className="footerh4">Company</h4>
                    <ul className="w-list-unstyled">
                        <li><Link to="/" className="footerlink">About Us</Link></li>
                        <li><Link to="/" className="footerlink">Privacy</Link></li>
                        <li><Link to="/" className="footerlink">Terms of Service</Link></li>
                    </ul>
                </div>
                <div className="footer-flex-container">
                    <h4 variant="h4" className="footerh4">Contact Us</h4>
                        <ul className="w-list-unstyled">
                            <li><Link to="/" className="footerlink">hello@sportmap.co</Link></li>
                        </ul>
                </div>
            </div>
            <div className="separator-line"></div>
            <div>
                <div className="footertext">© Copyright 2019. All Rights Reserved.</div>
                <a href="https://damondwilson.com" rel="noopener noreferrer" target="_blank" className="footer-link">Web Design.
                </a>
            </div>    
        </div>
    )
  }
}

export default withRouter(withStyles(styles)(Footer));