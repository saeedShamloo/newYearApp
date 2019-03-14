import {blue} from "@material-ui/core/colors";

export const styles = theme => ({
    text: {
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    subHeader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    refresh: {
        maxWidth:40,
        minWidth:40,
        position: 'absolute',
        right: 10,
        top:10
    },
    wrapper: {
        position : 'relative',
    },
});

export const scoreItemStyles = ()=>({
    avatar: {
        backgroundColor: blue[100],
            color: blue[800],
    }
});