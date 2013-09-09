define(['controllers/controllers', 'services/teamDetail'],
    function (controllers) {
        controllers.controller('teamDetailController', ['$scope', '$rootScope', 'teamDetail', 
            function ($scope, $rootScope, teamDetail, teamId) {
                $scope.init = function () {
                    $scope.currentPlayerId;
                   
                    $scope.players = [];
                    $scope.teamPlayers = [];
                    teamDetail.getPlayers().then(function (result) {
                        _.each(result, function (player) { player.formattedName=player.lastName+', '+player.firstName});
                        $scope.players = result;
                    });
                    teamDetail.getTeamPlayers($rootScope.teamId).then(function (result) {
                        $scope.teamPlayers = result;
                    });
                    $scope.teamPlayerColumns = [
                        { label: 'First', map: 'firstName' },
                        { label: 'Last', map: 'lastName' }
                    ];
                }
                $scope.init();
                $scope.addPlayerToTeam = function () {
                    teamDetail.addPlayerToTeam($scope.currentPlayerId, $rootScope.teamId).then(function () {
                        var player = _.findWhere($scope.players, { id: $scope.currentPlayerId });
                        $scope.teamPlayers.unshift(player);
                    });
                };
              
            }]);
    });