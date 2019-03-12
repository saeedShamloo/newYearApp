import * as React from 'react';
import {Snackbar} from "@material-ui/core";
import {Slide} from "@material-ui/core/es";

export type SnackProps = {
    open: boolean,
    onClose: ()=> void,
    message: string
}

function Snack(props: SnackProps) {
    const { open, onClose,message } = props;
    return (
        <Snackbar
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
        />
    );
}

function TransitionUp(props:any) {
    return <Slide {...props} direction="up" />;
}

export default Snack;