import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Redirect } from 'react-router-dom';

//import RaisedButton from 'material-ui/RaisedButton';

export default class Modal extends React.Component {

    constructor() {
        super();
        this.state = {
            redirect: false
        }
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

        let actions, message;

        if (this.props.modalAction === 'DELETE_HEATMAP') {
            actions = [
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onClick={this.props.madeModalClose}
                />,
                <FlatButton
                    label="Delete Heat Map"
                    onClick={this.deleteHeatMap}
                />,
            ];

            message = 'Deleting a heat map cannot be undone.'
        }

        return (
        <div>
            <Dialog
            title="Are you sure?"
            actions={actions}
            modal={true}
            open={this.props.modalOpen}
            >
            {message}  
            </Dialog>
        </div>
        );
    }
}
