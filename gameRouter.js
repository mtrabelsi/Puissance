angular
    .module('game')
    .config(function($stateProvider, $urlRouterProvider) {
    	//always seek the startup route first
        $urlRouterProvider.otherwise('/startup');
    });
