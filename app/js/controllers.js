/* Controllers */

function IndexController($scope, socket)
{
	$scope.messages = null;
	$scope.users = [];

	var newMessage = {
		username: null,
		topic_name: null,
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

		socket.emit('add:topic', { newTopic: $scope.newMessage });

		$scope.messages.unshift($scope.newMessage);
		$scope.newMessage = angular.copy(newMessage);
	};

	socket.on('init', function (data)
	{
		$scope.messages = data;

		var tmpUsers = {};

		$scope.messages.forEach(function(msg)
		{
			tmpUsers[msg.username] = null;
		});

		$scope.users = Object.keys(tmpUsers);
	});

	socket.on('added:topic', function(msg)
	{
		$scope.messages.unshift(msg.topic);
		$scope.newMessage = angular.copy(newMessage);
	});

	socket.emit('init');
}


function AboutController($scope)
{
}
