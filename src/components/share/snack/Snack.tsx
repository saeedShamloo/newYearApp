import * as React from 'react';
import {Snackbar} from "@material-ui/core";
import {Slide} from "@material-ui/core/es";

const styles = {
    display: 'block',
    textAlign:'center',
    fontSize:14
};


export type SnackProps = {
    open: boolean,
    onClose: ()=> void,
    message: string,
    autoHideDuration?: number
}

function Snack(props: SnackProps) {
    const { open, onClose,message, autoHideDuration=3000 } = props;
    return (
        <Snackbar
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
            ContentProps={{
                'aria-describedby': 'message-id',
                'style': styles
            }}
            autoHideDuration={autoHideDuration}
            message={<span id="message-id">{message}</span>}
        />
    );
}

function TransitionUp(props:any) {
    return <Slide {...props} direction="up" />;
}

export default Snack;