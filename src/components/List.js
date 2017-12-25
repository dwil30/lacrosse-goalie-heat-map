import React from 'react';
import NavBar from './NavBar'
import FontIcon from 'material-ui/FontIcon'
import { Link } from 'react-router-dom'

export default class List extends React.PureComponent {

    getUpdated = (date) => {
        if(typeof(date) === 'object') {
            return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        } else {
            return 'no data'
        }
    }

    getLinksOnHeatmaps = (data) => {
        return data.map( (item, i) => {
            let activeStyle={};
            if (i===this.props.appState.activeData) {
                activeStyle = {
                    outline: '2px solid red'
                }
            }
            return (
                <div className="heatmapitem" key={item.name + i} style={activeStyle}>
                    <Link to='/' onClick={() => this.props.changeActiveData(i) }>
                        <img alt='heat map' src={require('../images/map.png')} className="heatimage" />
                        <h2 className="heatmaph2">{item.name}</h2>
                        <div className="updatedtext">Last Updated: { this.getUpdated(item.updated) } </div>
                    </Link>
                </div>
            )
        })
    }


    render() {
        return (
            <div> 
                <NavBar
                    authenticated={this.props.authenticated}
                    addNewMap={this.props.addNewMap}
                />
                
                <div className="main-wrapper no-padding">
                    {this.getLinksOnHeatmaps(this.props.appState.data)}

                    <div className="heatmapitem">
                        <Link to='/' onClick={this.props.addNewMap}>
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
