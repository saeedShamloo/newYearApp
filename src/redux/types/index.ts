/*============== action =============*/
export interface BaseAtion {
    type: string;
}
export interface ActionType extends BaseAtion {
    [key: string] : any
}

/*========== athenticate object type ==========*/ 
export type Authenticate = {
    username: string,
    error: string
};

/*============== App ==============*/
export interface IAppState {
    loading: boolean
    authenticate: Authenticate
}