define(['services/services'],
    function (services) {
        app.factory('datacontext', ['$http', 'logger', function ($http, logger) {
            var log = logger.log;

            log("Creating datacontext");
            configureBreeze();

            var useLocalHost = false;
            var host = useLocalHost ? "http://localhost:63428" : "http://sampleservice.breezejs.com";
            var serviceName = host + "/api/todos";

            var manager = new breeze.EntityManager(serviceName);

            plunkerHelpers.isCorsCapable();
            var datacontext = {
                getAllTodos: getAllTodos,
                reset: reset
            };
            return datacontext;

            /***  supporting functions ***/

            function getAllTodos() {
                var query = breeze.EntityQuery.from("Todos");
                log("Getting Todos");
                return manager.executeQuery(query).then(success);

                function success(data) {
                    log("Retrieved " + data.results.length);
                    return data.results;
                }
            }

            function reset() {
                manager.clear();
                var deferred = Q.defer();
                $http.post(serviceName + '/reset')
                 .then(resetSuccess, resetFail);
                return deferred.promise;

                function resetSuccess() {
                    log("Database reset");
                    deferred.resolve();
                }
                function resetFail() {
                    log("Database reset failed");
                    deferred.reject(new Error("Database reset failed"));
                }
            }

            function configureBreeze() {
                // configure to use the model library for Angular
                breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);
                // configure to use camelCase
                breeze.NamingConvention.camelCase.setAsDefault();
            }
        }]);
    });