/*============== action =============*/
export interface BaseAtion {
    type: string;
}
export interface ActionType extends BaseAtion {
    [key: string] : any
}

/*========== athenticate object type ==========*/ 
export type Authenticate = {
    authenticated: boolean,
    user: User,
    error: string
};

export type User = {
    firstName: string,
    lastName: string,
    userName: string,
    rolse: string[]
};

/*============== App ==============*/
export interface IAppState {
    loading: boolean
    authenticate: Authenticate

}