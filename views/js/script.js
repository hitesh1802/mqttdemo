var app = angular.module('myApp', []);

app.controller('loginForm',["$scope", "$http", function ($scope, $http) {
	$scope.cartErrors = [];
	$scope.loggedIn = 0;
	$scope.msgs = [];
	
	$scope.validate = function(){
		$http.post("validate", { username : $scope.username, password : $scope.password}).then(function(resp){ 
				if(resp.data.error == 1)
					$scope.cartErrors.push(resp.data.msg)
				else
				{
					//creating socket connection
					$scope.socket = io('http://localhost:3000');
					$scope.loggedIn = 1;
					$scope.socket.on("responseMessage", function(data){ 
						$scope.msgs.push(($scope.msgs.length + 1)+" >> "+JSON.stringify(data));
					});
				}		
		});
	};
	
	$scope.publish = function(){
		$scope.socket.emit('clientMessage', { hello : "World"})	;
	}
	
	$scope.clearError = function(){
		$scope.cartErrors = [];
	}
 }]);
 
 
 