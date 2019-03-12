export enum request{
    get='get',
    post='post'
}

export enum urls {
    base= '/auth',
    login= urls.base + '/login',
    gameDef = urls.base + '/gamedef',
    addGame = urls.gameDef + '/add',
    gameList= urls.gameDef + '/list',
    startGame= urls.base+ '/game/start',
    setWinner = urls.gameDef + '/winner',
    myGame= urls.base + '/game/mine'
}