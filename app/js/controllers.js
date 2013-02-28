'use strict';

/* Controllers */


function IndexController($scope, $route) {
	$scope.navSelected = 'home';
	$scope.conversationMessages = [
		{ id: 1, username: 'Foo', name: 'Angular.js', url: 'http://angular.js/', description: 'A client-side, MVC Javascript framework.', createdOn: '2/28/2012 18:40'},
		{ id: 2, username: 'Bar', name: 'Socket.io', url: 'http://socket.io/', description: 'Real-time http transport mechanism written in Javascript.', createdOn: '2/28/2012 18:40'}
	];
}
//MyCtrl1.$inject = [];


function AboutController($scope, $route) {
	$scope.navSelected = 'about';
}
//MyCtrl2.$inject = [];
