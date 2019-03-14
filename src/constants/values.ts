export enum request{
    get='get',
    post='post'
}

export enum urls {
    base= '/auth',
    login= urls.base + '/login',
    game= urls.base + '/game',
    gameDef = urls.base + '/gamedef',
    addGame = urls.gameDef + '/admin/add',
    gameList= urls.gameDef + '/admin/list',
    startGame= urls.game+ '/admin/start',
    myGame= urls.game + '/mine',
    vote= urls.game + '/vote',
    finishVoting = urls.game + '/admin/finish-voting',
    finishGame = urls.gameDef + '/admin/finish',
    scoreBoard= urls.game + '/scoreboard',
    scores = urls.game + '/scores',
    startPredict = ''
}