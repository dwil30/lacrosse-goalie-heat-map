import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
})

class Modal extends Component {
    
    state = {
        redirect: false
    }

    deleteHeatMap = () => {
        this.props.madeModalClose();
        this.props.deleteActiveMap();
        this.setState({redirect: true})
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />
        }

        //let actions, message;

        return (
        <div>
            <Dialog
              open={this.props.modalOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
          <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             Deleting a heat map cannot be undone!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.madeModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteHeatMap} color="primary" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        </div>
        );
    }
}

export default withRouter(withStyles(styles)(Modal));
