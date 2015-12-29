'use strict';

// Declare app level module which depends on views, and components
var App = angular.module('myApp', [
  'ui.router'
  
 
])
//var App = angular.module('angularstrapApp', ['ui.router', 'angularstrapControllers', 'angularstrapServices'])
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'home/home.html',
      controller : 'homeController'
    })
    
});
