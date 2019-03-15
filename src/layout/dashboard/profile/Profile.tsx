import * as React from 'react';
import {Popover} from '@material-ui/core';
import ProfileContent from './ProfileContent';

export type ProfileProps = {
    userName: string,
    user: string,
    onLogout: ()=> void,
    classes?: any,
    open: boolean,
    anchorEl : HTMLElement,
    onClose: ()=> void
}

const Profile = (props : ProfileProps) => {
    const {user,userName, onLogout, open,anchorEl, onClose} = props;
    return (
        <Popover
            id="profile-popper"
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <ProfileContent user={user} userName={userName} onLogout={onLogout} />
    </Popover>
    );
}

export default Profile;