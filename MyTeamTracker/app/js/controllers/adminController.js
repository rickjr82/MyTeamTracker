define(['controllers/controllers', 'uibootstrap', 'controllers/teamListController', 'controllers/playerListController', 'controllers/teamDetailController'],
    function (controllers) {
        controllers.controller('adminController', ['$scope','$rootScope', '$modal', 'teamDetail',
            function ($scope, $rootScope, $modal, teamDetail) {
                $scope.teams = [];
                $scope.teamId = 0;
                teamDetail.getTeams().then(function (result) {
                    $scope.teams = result;
                });
                $scope.$watch('teamId', function () { $rootScope.teamId = $scope.teamId; });
                $scope.modifyTeams = function () {
                    var opts = { backdrop: true, keyboard: true, backdropClick: false, templateUrl: '/app/html/partials/teamList.html', controller: 'teamListController' };
                    var modalInstance = $modal.open(opts);
                    modalInstance.result.then(function (result) {
                        $scope.teamId = 0;
                        $scope.teams = result;
                    });
                };
                $scope.modifyPlayers = function () {
                    var opts = { backdrop: true, keyboard: true, backdropClick: true, templateUrl: '/app/html/partials/playerList.html', controller: 'playerListController' };
                    $modal.open(opts);
                };
                $scope.manageTeam = function () {
                    var opts = {
                        backdrop: true, keyboard: true, backdropClick: true, templateUrl: '/app/html/partials/teamDetail.html', controller: 'teamDetailController'
                    };
                    $modal.open(opts);
                };
            }]);
    });