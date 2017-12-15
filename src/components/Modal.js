import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
//import RaisedButton from 'material-ui/RaisedButton';

export default class Modal extends React.Component {

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleDialogClose}
      />,
      <FlatButton
        label="Remove Data Points"
        onClick={this.props.clearShots}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Are you sure?"
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          Removing all data points cannot be undone. 
        </Dialog>
      </div>
    );
  }
}