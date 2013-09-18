define(['controllers/controllers', 'uibootstrap', 'controllers/teamListController', 'controllers/signupController', 'controllers/playerListController', 'controllers/teamDetailController', 'services/logger', 'services/dataservice'],
    function (controllers) {
        controllers.controller('adminController', ['$scope', '$rootScope', '$modal', 'dataservice', 'logger',
            function ($scope, $rootScope, $modal, dataservice, logger) {
                $scope.teams = [];
                $scope.teamId = 0;
                logger.info("loading teams")
                dataservice.getTeams().then(function (result) {
                    logger.info("teams loaded")
                    $scope.teams = result;
                }).fail(function (error) { logger.error(error, "load failed"); });
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
                $scope.signupForTasks = function () {
                    var opts = {
                        backdrop: true, keyboard: true, backdropClick: true, templateUrl: '/app/html/partials/signup.html', controller: 'signupController'
                    };
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