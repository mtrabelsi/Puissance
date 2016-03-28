angular
    .module('game.startup')
    .config(function($stateProvider, $urlRouterProvider) {
      
       // $urlRouterProvider.otherwise('/startup');

        $stateProvider
            .state('startup', {
                url: '/startup',
                templateUrl: 'modules/startup/views/startup.html',
                controller: 'StartupController'
            })
    });
