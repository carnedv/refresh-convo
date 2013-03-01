/* Controllers */

function IndexController($scope, socket)
{
	$scope.messages = [];
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

	$scope.sortMesssages = function()
	{
		if ($scope.messages.length > 0)
		{
			$scope.messages.sort(function(a, b)
			{
				if (a.createdOn < b.createdOn)
				{
					return 1;
				}
			});
		}
	};

	$scope.sortUsers = function()
	{
		if ($scope.users.length > 0)
		{
			$scope.messages.sort(function(a, b)
			{
				if (a > b)
				{
					return 1;
				}
			});
		}
	};

	$scope.makeFavorite = function(msg)
	{
		if (msg.isFavorite == undefined)
		{
			msg.isFavorite = true;
		} else {
			msg.isFavorite = !msg.isFavorite;
		}
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

	$scope.$watch('messages', $scope.sortMesssages);
	$scope.$watch('users', $scope.sortUsers);

	socket.emit('init');
}

function AboutController($scope)
{
}
