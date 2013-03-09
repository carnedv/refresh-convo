/* Controllers */

function AppController($scope, $routeParams, $window)
{
	$scope.isAdmin = false;
	$scope.adminPin = 1001;

	$scope.userPin = null;

	$scope.doLogin = function()
	{
		if ($scope.userPin == $scope.adminPin)
		{
			$scope.isAdmin = true;
		} else {
			$scope.isAdmin = false;
		}
	};

	$scope.doLogout = function()
	{
		$scope.userPin = null;
		$scope.isAdmin = false;
	};
}

function IndexController($scope, socket)
{
	$scope.messages = [];
	$scope.users = [];

	var messageModel = {
		id: null,
		newUsername: null,
		username: null,
		topic_name: null,
		url: null,
		description: null,
		createdOn: null
	};

	$scope.formMode = 'add';

	$scope.formTopic = angular.copy(messageModel);

	$scope.saveNewTopic = function()
	{
		$scope.formTopic.createdOn = new Date();

		if (!$scope.formTopic.username && $scope.formTopic.newUsername)
		{
			$scope.formTopic.username = $scope.formTopic.newUsername;
			$scope.users.push($scope.formTopic.username);
		}

		delete $scope.formTopic.newUsername;

		socket.emit('add:topic', { newTopic: $scope.formTopic });

		$scope.messages.unshift($scope.formTopic);
		$scope.formTopic = angular.copy(messageModel);
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
		if (msg.isFavorite === undefined)
		{
			msg.isFavorite = true;
		} else {
			msg.isFavorite = !msg.isFavorite;
		}
	};

	$scope.editTopic = function(topic)
	{
		$scope.formTopic = topic;
		$scope.formTopic.id = topic._id;
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
		$scope.formTopic = angular.copy(messageModel);
	});

	$scope.$watch('messages', $scope.sortMesssages);
	$scope.$watch('users', $scope.sortUsers);

	socket.emit('init');

	$scope.$watch('userPin', function() { $scope.$parent.userPin = $scope.userPin; }, true);
	$scope.$watch('$parent.userPin', function() { $scope.userPin = $scope.$parent.userPin; }, true);
}

function PublishLinksController($scope, socket)
{
	$scope.messages = [];

	socket.on('init', function (data)
	{
		$scope.messages = data;
	});

	socket.emit('init');
}

function AboutController($scope)
{
}

function AdminSettingsController($scope)
{
}