require.config({
    paths: {
        angular: '/Scripts/angular',
        jQuery: '/Scripts/jquery-1.8.2.min',
        underscore: '/Scripts/underscore.min',
        uibootstrap: 'https://raw.github.com/angular-ui/bootstrap/gh-pages/ui-bootstrap-tpls-0.5.0',
        smarttable: 'https://raw.github.com/lorenzofox3/Smart-Table/master/Smart-Table.min'
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