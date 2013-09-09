define(['controllers/controllers', 'services/teamDetail'],
    function (controllers) {
        controllers.controller('teamListController', ['$scope', 'teamDetail', 'dialog',
            function ($scope, teamDetail, dialog) {
                $scope.teams = [];
                teamDetail.getTeams().then(function (result) {
                    $scope.teams = result;
                });

                $scope.addTeam = function () {
                    $scope.teams.unshift({ name: '', id:0});
                };
                $scope.deleteTeam = function (team) {
                    if (team.id !== 0) {
                        teamDetail.deleteTeam(team.id).then(function () {
                            var index = $scope.teams.indexOf(team);
                            $scope.teams.splice(index, 1);
                        });
                    }
                    else {
                        var index = $scope.teams.indexOf(team);
                        $scope.teams.splice(index, 1);
                    }
                };

                $scope.saveTeam = function (team) {
                    var existing = _.findWhere($scope.teams, { name: team.name});
                    if (typeof (existing) !== 'undefined') {
                        if (existing.id !== team.id) {
                            alert('Existing Name')
                            team.name = '';                           
                        }
                        else {
                            teamDetail.saveTeam(team).then(function (result) {
                                team.id = result.id;
                            });
                        }
                    }
                };
                $scope.close = function () {
                    dialog.close($scope.teams);
                };
            }]);
    });