import React from 'react';

export default class Heatmap extends React.Component {
    render() {
        
        const styles = {
            opacity: this.props.slider
        }
        
        return (
            <div>
            {this.props.heatMap &&
                <div className="heat-map-container" style={styles}>
                    <div className="heat-map-box third"></div>
                    <div className="heat-map-box fourth"></div>
                    <div className="heat-map-box fifth"></div>
                    <div className="heat-map-box nuetral"></div>
                    <div className="heat-map-box first"></div>
                    <div className="heat-map-box second"></div>
                    <div className="heat-map-box first"></div>
                    <div className="heat-map-box fifth"></div>
                    <div className="heat-map-box third"></div>
                </div>
                }
            </div>            
        )  
    }
}

