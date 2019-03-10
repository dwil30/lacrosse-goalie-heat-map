import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import Dot from '@material-ui/icons/FiberManualRecord';


const styles = theme => ({
    saveDot:{
        color: '#e82121',
        '&:hover': {
        color: '#b21c1c',
        }
    },
    goalDot:{
        color: '#70c60b',
        '&:hover': {
        color: '#54910b',
        }
    }
})

class Shot extends Component {

    removeShot = (e, index) => {
        e.stopPropagation();
        if (this.props.active !== false) {
            this.props.removeShot(index);
        }
    }

    render() {
        const { classes } = this.props;
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
                marginTop:'-12px',
                marginLeft:'-12px',
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
                    //Goal Dot - Green
                        <Dot
                            onClick={ (e) => this.removeShot(e, index)}
                            className={classes.goalDot}
                            id={index}
                            style={styles.button}
                        />

                    )

                    : (
                    //Save Dot - Red
                        <Dot
                            onClick={ (e) => this.removeShot(e, index)}
                            className={classes.saveDot}
                            id={index}
                            style={styles.button}
                        />
                    )
                }
            </div>
        )
  }
}

export default withRouter(withStyles(styles)(Shot));
