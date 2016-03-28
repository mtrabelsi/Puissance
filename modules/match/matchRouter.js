angular
    .module('game.match')
    .config(function($stateProvider, $urlRouterProvider) {
      
        //$urlRouterProvider.otherwise('/start');

        $stateProvider
            .state('match', {
                url: '/match',
                templateUrl: 'modules/match/views/match.html',
                controller: 'MatchController'
            })
    });
