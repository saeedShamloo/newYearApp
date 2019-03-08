import * as React from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent : React.ComponentType) {
    const Auth = new AuthService();
    return class AuthWrapped extends React.Component < any,
    any > {
        constructor(props : any) {
            super(props);
            this.state = {
                user: null
            }
        }

        UNSAFE_componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/signin')
            } else {
                this.setState({
                    user: {
                        name: 'saeed',
                        lastName: 'shamloo'
                    }
                })
                // TODO: uncomment this section in real app     try {         const profile =
                // Auth.getProfile()         this.setState({             user: profile
                // })     }     catch(err){         Auth.logout()
                // this.props.history.replace('/login')     }
            }
        }

        render() {
            if (this.state.user) {
                return (<AuthComponent history={this.props.history} user={this.state.user}/>)
            } else {
                return null
            }
        }
    }
}