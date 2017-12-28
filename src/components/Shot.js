import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

export default class Shot extends React.Component {


    removeShot = (e, index) => {
        e.stopPropagation();
        if (this.props.active !== false) {
            this.props.removeShot(index);
        }
    }

    render() {
        const { details, index } = this.props;
        const isGoal = details.shotResult;
        const paperWidth = this.props.paperWidth;
        const paperHeight = this.props.paperHeight;

        const yCoor = (details.xCoor) * (paperWidth / 420)
        const xCoor = (details.yCoor) * (paperHeight / 440)
        const styles ={
            button:{
                cursor:'pointer',
                zIndex:50,
                marginTop:'-25px',
                marginLeft:'-25px',
                width:25, 
                height:25, 
                position:'absolute',
                top:xCoor,
                left:yCoor
            }
        }
        return (

            <div>
                {isGoal ? (
                    <IconButton className="save" style={styles.button}>
                        <FontIcon 
                            id={index} 
                            color={'#70c60b'}
                            hoverColor={'#5da20d'}
                            className="material-icons"
                            onClick={ (e) => this.removeShot(e, index)} 
                            >
                            fiber_manual_record
                        </FontIcon>
                    </IconButton>
                    )
                    
                    : (  
                        <IconButton className="goal" style={styles.button}>
                        <FontIcon 
                            id={index} 
                            color={'#e82121'} 
                            hoverColor={'#c11414'} 
                            className="material-icons" 
                            onClick={ (e) => this.removeShot(e, index)} 
                        >
                            fiber_manual_record
                        </FontIcon>
                    </IconButton>
                    )
                }
            </div>
        )
  }
}
