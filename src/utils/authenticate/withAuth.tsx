import * as React from 'react';
import AuthService from './AuthService';
import history from '../history/history';

export default function withAuth(AuthComponent : React.ComponentType) {
    const Auth = new AuthService();
    return class AuthWrapped extends React.Component < any,any > {
        constructor(props : any) {
            super(props);
            this.state = {
                user: null,
                username: ''
            }
        }

        UNSAFE_componentWillMount() {
            if (!Auth.loggedIn()) {
                history.replace('/signin')
            } else {
                try {
                    const profile = Auth.getProfile();
                    const username = Auth.getUsername();
                    // detect user is admin or no
                    this.setState({
                        user: profile.sub,
                        username
                    })
                } catch (err) {
                    Auth.logout();
                }
            }
        }

        render() {
            if (this.state.user) {
                return (<AuthComponent history={history} user={this.state.user} username={this.state.username}/>)
            } else {
                return null
            }
        }
    }
}