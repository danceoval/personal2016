'use strict';

// Declare app level module which depends on views, and components
var App = angular.module('myApp', [
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'home/home.html',
      controller : 'homeController'
    })
    .state('resume', {
      url: "/resume",
      templateUrl: 'resume/resume.html',
      controller : 'resumeController'
    });
    
})


;
