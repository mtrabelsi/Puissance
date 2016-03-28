angular
    .module('game.result')
    .config(function($stateProvider, $urlRouterProvider) {
      
        //$urlRouterProvider.otherwise('/start');

        $stateProvider
            .state('result', {
                url: '/result',
                templateUrl: 'modules/result/views/result.html',
                controller: 'ResultController'
            })
    });
