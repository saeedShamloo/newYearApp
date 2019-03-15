import * as React from 'react';
import {Dialog,DialogTitle,DialogContentText,DialogContent,DialogActions,Button} from '@material-ui/core';
import MoodIcon from '@material-ui/icons/Mood';
import messages from '../../../constants/messages';

export type FunDialogProps = {
    open: boolean,
    onClose: ()=> void
}

const FunDialog = (props:FunDialogProps)=>{
    const {open, onClose} = props;
    return (
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="fun-dialog-title"
          aria-describedby="fun-dialog-description"
        >
          <DialogTitle id="fun-dialog-title">{""}</DialogTitle>
          <DialogContent>
            <DialogContentText id="fun-dialog-description">
              {messages.funDialogText}
               <span style={{display:'inline-block', verticalAlign:'middle'}}>
               <MoodIcon/><MoodIcon/>
               </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary" variant="outlined">
              {messages.close}
            </Button>
          </DialogActions>
        </Dialog>
    );
};

export default FunDialog;