import {grey} from '@material-ui/core/colors';
import image from '../../../assets/images/bg7.jpg';

export const styles = {
    container: {
        minHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundColor:'#888',
        padding: 10,
        boxSizing: 'border-box'
    },
    formWrapper: {
        padding: 20,
        marginTop: 80,
        paddingTop: 50,
        // minHeight:250,
        position: 'relative',
        maxWidth:380,
    },
    title: {
        color: '#fff'
    },
}

export const messageStyles = {
    wrapper: {
        position: 'absolute',
        left: '10%',
        right: '10%',
        height: 80,
        top: -40,
        background: 'linear-gradient(60deg, #ab47bc, #8e24aa)',
        boxShadow: '0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), ' +
                '0 7px 8px -5px rgba(156, 39, 176, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        color: grey[50]
    }
}