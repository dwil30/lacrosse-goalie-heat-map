import React, { Component } from 'react';
import NavBar from './NavBar'
import FontIcon from 'material-ui/FontIcon'
import {Link} from 'react-router-dom'

export default class List extends Component {

    
  render() {
      
    return (
        <div> 
            <NavBar 
                    authenticated={this.props.authenticated}
            />
            
            <div className="main-wrapper no-padding">
                <div className="heatmapitem">
                    <img alt='heat map' src={require('../images/map.png')} className="heatimage"/>
                    <h2 className="heatmaph2">Heat Map Nam Here</h2>
                    <div className="updatedtext">Last Updated: 9/11/2017</div>
                </div>
                <div className="heatmapitem">
                    <img alt='heat map' src={require('../images/map.png')} className="heatimage"/>
                    <h2 className="heatmaph2">Heat Map Nam Here</h2>
                    <div className="updatedtext">Last Updated: 9/11/2017</div>
                </div>
                <div className="heatmapitem">
                    <Link to={{ 
    pathname: '/', 
    state: { heatMap: false} 
  }}>
                   
                        <div className="addnewdiv">
                            <FontIcon className='material-icons'>add_circle</FontIcon>
                        </div>
                    </Link>
                    <h2 className="heatmaph2">Add New Heat Map</h2>
                </div>
            </div>
        </div>
        
    )
  }
}
