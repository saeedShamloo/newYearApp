export enum request{
    get='get',
    post='post'
}

export enum urls {
    base= '/api',
    login=  '/auth/login',
    game= urls.base + '/game',
    gameDef = urls.base + '/gamedef',
    addGame = urls.gameDef + '/admin/add',
    gameList= urls.gameDef + '/admin/list',
    runningGameList= urls.game + '/admin/list',
    startGame= urls.game+ '/admin/start',
    myGame= urls.game + '/mine',
    vote= urls.game + '/vote',
    finishVoting = urls.game + '/admin/finish-voting',
    finishGame = urls.gameDef + '/admin/finish',
    scoreBoard= urls.game + '/scoreboard',
    scores = urls.game + '/scores',
    survey = urls.base + '/survey',
    startSurvey= urls.survey + '/admin/start',
    mineSurvey = urls.survey + '/mine',
    surveyVote = urls.survey + '/vote',
    surveyResult = urls.survey + '/result',
    finishSurvey = urls.survey + '/admin/finish',
    unResign = urls.base + '/user/un-resign',
    resign = urls.base + '/user/resign'
}