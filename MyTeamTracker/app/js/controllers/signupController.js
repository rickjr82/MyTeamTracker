define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('signupController', ['$scope', '$rootScope', '$modal', 'teamDetail',
            function ($scope, $rootScope, $modal, teamDetail) {
                $scope.teams = [];
                $scope.teamId = 0;
                $scope.teamTasks = [{ name: 'task1' }, { name: 'task2' }];
                $scope.teamGames = [{ date: '1/1/2013', opponent: 'opp1', location: 'field1' }, { date: '1/7/2013', opponent: 'opp2', location: 'field2'  }];
                $scope.
                teamDetail.getTeams().then(function (result) {
                    $scope.teams = result;
                });
                $scope.$watch('teamId', function () { $rootScope.teamId = $scope.teamId; });            
            }]);
    });