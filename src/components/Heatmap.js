import React from 'react';

export default class Heatmap extends React.PureComponent {

    getBoxes = () => {

        if(!this.props.heatMap) {
            return null;
        }

        const boxLength = this.props.heatMapLength;
        const boxCount = boxLength * boxLength;
        const boxWidth = this.props.paperWidth / boxLength;
        const boxHeight = this.props.paperHeight / boxLength;
        
        const boxList = [];
        for (let i = 0; i < boxCount; i++) {
            boxList.push({
                goal: 0,
                save: 0,
            });
        }

        const shots = this.props.shots;
        for (let key in shots) {
            const columnNumber = Math.ceil(shots[key].xCoor / boxWidth);
            const rowNumber = Math.ceil(shots[key].yCoor / boxHeight);
            const iInBoxList = ((rowNumber - 1) * boxLength) + columnNumber - 1;

            if ( !shots[key].shotResult ) {
                boxList[iInBoxList].goal = boxList[iInBoxList].goal + 1;
            } else if (shots[key].shotResult) {
                boxList[iInBoxList].save = boxList[iInBoxList].save + 1;
            }
        };   

        return boxList.map((item, i) => {
            let percent = 0;
            const sum = item.goal + item.save;

            if (item.save === 0 && item.goal > 0) {
                percent = 0;
            } else if (item.goal === 0 && item.save > 0) {
                percent = 100;
            } else if (sum === 0) {
                percent = 0;
            } else {
                percent = 100/sum * item.save;
            }

            let boxClass;
            if (item.goal===0 && item.save===0) {
                boxClass = 'heat-map-box nuetral';
            } else if (percent >= 0 && percent < 20) {
                boxClass = 'heat-map-box first';
            } else if (percent >= 20 && percent < 40) {
                boxClass = 'heat-map-box second';
            } else if (percent >= 40 && percent < 60) {
                boxClass = 'heat-map-box third';
            } else if (percent >= 60 && percent < 80) {
                boxClass = 'heat-map-box fourth';
            } else if (percent >= 80) {
                boxClass = 'heat-map-box fifth';
            }

            return (
                <div 
                    className={boxClass} 
                    style={{ 
                        width: boxWidth, 
                        height: boxHeight 
                    }}
                    key={i}
                    title={`Goal ${item.goal} - Save ${item.save} - ${percent}%`}
                >
                </div>
            )
        })
    } 

    render() {
        const styles = {
            opacity: this.props.slider
        }
        
        return (
            <div>
                <div className="heat-map-container" style={styles}>
                    {this.getBoxes()}
                </div>
            </div>            
        )  
    }
}

