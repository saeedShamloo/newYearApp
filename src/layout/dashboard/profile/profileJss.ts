import {blue} from '@material-ui/core/colors';
export const styles = {
    logOutIcon: {
        transform: 'rotateY(180deg)',
        margin:'0 5px',
    },
    card: {
        minWidth: 200
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[800],
        width:60,
        height:60,
        boxShadow: '0 0 3px #ddd'
    },
    actionsWrapper: {
        direction: 'ltr'
    },
};