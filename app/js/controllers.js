'use strict';

/* Controllers */

function IndexController($scope, $route) {
	$scope.navSelected = 'home';

	$scope.messages = [
		{ id: 1, username: 'Foo', name: 'Angular.js', url: 'http://angularjs.org/', description: 'A client-side, MVC Javascript framework.', createdOn: new Date() },
		{ id: 2, username: 'Bar', name: 'Socket.io', url: 'http://socket.io/', description: 'Real-time http transport mechanism written in Javascript.', createdOn: new Date() }
	];

	$scope.users = [];

	$scope.messages.forEach(function (msg)
	{
		if ($scope.users.indexOf(msg.username))
		{
			$scope.users.push(msg.username);
		}
	});

	var newMessage = {
		username: null,
		name: null,
		url: null,
		description: null,
		createdOn: null,
		newUsername: null
	};

	$scope.newMessage = angular.copy(newMessage);

	$scope.saveNewMessage = function()
	{
		$scope.newMessage.createdOn = new Date();

		if (!$scope.newMessage.username && $scope.newMessage.newUsername)
		{
			$scope.newMessage.username = $scope.newMessage.newUsername;
			$scope.users.push($scope.newMessage.username);
		}

		delete $scope.newMessage.newUsername;

		$scope.messages.unshift($scope.newMessage);
		$scope.newMessage = angular.copy(newMessage);
	};
}


function AboutController($scope, $route) {
	$scope.navSelected = 'about';
}
