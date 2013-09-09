define(['controllers/controllers', 'uibootstrap', 'controllers/teamListController', 'controllers/playerListController', 'controllers/teamDetailController'],
    function (controllers) {
        controllers.controller('adminController', ['$scope','$rootScope', '$dialog', 'teamDetail',
            function ($scope, $rootScope,$dialog, teamDetail) {
                $scope.teams = [];
                $scope.teamId = 0;
                teamDetail.getTeams().then(function (result) {
                    $scope.teams = result;
                });
                $scope.$watch('teamId', function () { $rootScope.teamId = $scope.teamId; });
                $scope.modifyTeams = function () {
                    var opts = { backdrop: true, keyboard: true, backdropClick: false, templateUrl: '/app/html/partials/teamList.html', controller: 'teamListController' };
                    var d = $dialog.dialog(opts);
                    d.open().then(function (result) {
                        $scope.teamId = 0;
                        $scope.teams = result;
                    });
                };
                $scope.modifyPlayers = function () {
                    var opts = { backdrop: true, keyboard: true, backdropClick: true, templateUrl: '/app/html/partials/playerList.html', controller: 'playerListController' };
                    var d = $dialog.dialog(opts);
                    d.open();
                };
                $scope.manageTeam = function () {
                    var opts = {
                        backdrop: true, keyboard: true, backdropClick: true, templateUrl: '/app/html/partials/teamDetail.html', controller: 'teamDetailController'
                    };
                    var d = $dialog.dialog(opts);
                    d.open();
                };
            }]);
    });