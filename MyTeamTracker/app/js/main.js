require.config({
    paths: {
        angular: '/Scripts/angular',
        jQuery: '/Scripts/jquery-1.9.1.min',
        underscore: '/Scripts/underscore.min',
        uibootstrap: 'Scripts/ui-bootstrap-tpls-0.6.0',
        smarttable: '/app/js/lib/Smart-Table.min',
    },
    baseUrl: '/app/js',
    shim: {
        'angular': { exports: 'angular', deps: ['jQuery'] },
        'jQuery': { exports: '$' },
        'underscore': { exports: '_' },
        'uibootstrap': { deps: ['angular'] },
        'smarttable': {deps:['angular']}
    }
});
require(['angular','app', 'controllers/controllers', 'services/services', 'underscore', 'uibootstrap', 'smarttable', 'controllers/adminController'], function (angular, app) {
    'use strict';
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function () {
        $html.addClass('ng-app');
        angular.bootstrap($html, [app['name'], 'ui.bootstrap','smartTable.table']);
    });
});