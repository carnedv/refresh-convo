'use strict';


// Declare app level module which depends on filters, and services
angular.module('convoTrack', ['convoTrack.filters', 'convoTrack.services', 'convoTrack.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/index.html', controller: IndexController});
    $routeProvider.when('/publish-links', {templateUrl: 'partials/publish-links.html', controller: PublishLinksController});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: AboutController});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
